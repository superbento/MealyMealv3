
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { httpService } from '../services/httpRequest.service';
import { Router } from '@angular/router';
import  {logoutService} from '../services/logoutService.service';


@Component({
  selector: 'app-choose-module',
  templateUrl: './choose-module.component.html',
  styleUrls: ['./choose-module.component.scss']
})
export class ChooseModuleComponent implements OnInit {
	 user;
	 choosenModule:string;
	 page = 1;

   gain;
   loose;

	 specifications: FormGroup;

  constructor(private formBuilder: FormBuilder, private createmenuhttp: httpService, private router: Router, private logoutservice:logoutService) { }

  
  ngOnInit() {
  	this.user = JSON.parse(localStorage.getItem('currentUser'));  
    console.log(this.user); alert(this.user);
    this.page = 1;
    this.initForm();
  }


   initForm(){
  	
    this.specifications = this.formBuilder.group({
      ActivityFactor: ['', Validators.required],
      Activity: ['', Validators.required],
      hours: ['', Validators.required],
      objectif: ['', Validators.required],
      startdate: ['', Validators.required],
      enddate: ['', Validators.required]
    });

  }



  chooseGainWeight(){
    this.choosenModule = "GainWeight";
    this.gain = true;
    this.loose = false;
   // alert(this.choosenModule);
  }


  chooseLooseWeight(){
    this.choosenModule = "LooseWeight";
    this.loose = true;
    this.gain = false;
    //alert(this.choosenModule);
  }

   nextPage(){

   if(this.page === 1){
  	this.page=2;
     alert(this.choosenModule);
  	}else if(this.page===2){
  		this.page=3;
  	}

  }

  previousPage(){
  	this.page=1;
  }



  finishprogram(){
    const formValue = this.specifications.value;
      //alert(formValue['ActivityFactor']+" "+formValue['startdate']+" "+formValue['enddate']); 
      const params = new FormData();
      params.append('iduser', this.user.id);

      this.createmenuhttp.finishProgram(params).subscribe(data => {
             console.log(data);  alert('good');

              //this.router.navigate(['../menu']);
              this.user.module = null;

          }, (error) => {
              alert('Erreur ! : ' + error.message);
              
      });

  }



   onSubmitForm(){

  		const formValue = this.specifications.value;
  		//alert(formValue['ActivityFactor']+" "+formValue['startdate']+" "+formValue['enddate']); 
      const params = new FormData();
      let calories = String( this.caloriesNeeded(formValue['ActivityFactor']) );
      params.append('calories', calories);
      params.append('startdate', formValue['startdate'] );
      params.append('enddate', formValue['enddate'] );
      params.append('iduser', this.user.id );
      params.append('activityfactor', formValue['ActivityFactor']);
      params.append('activity', formValue['Activity']);
      params.append('objectif', formValue['objectif']);
      params.append('hours', formValue['hours']);
      params.append('choosenmodule', this.choosenModule );

      alert("activity "+formValue['Activity']);
      alert("objectif "+formValue['objectif']);
      alert("hours "+formValue['hours']);
      alert("ActivityFactor "+formValue['ActivityFactor']);
      alert("id "+ this.user.id);
       
     
        //alert("id "+params.get('iduser'));
      if(calories != '0'){

        this.createmenuhttp.CreateModule(params).subscribe(data => {
             console.log(data);  alert('good');

              this.router.navigate(['../menu']);

          }, (error) => {
              alert('Erreur ! : ' + error.message);
              this.router.navigate(['../menu']);
            });

           

      	}
      
      }



  	caloriesNeeded(activityFactor){

        if(this.choosenModule == 'GainWeight'){
      		let baseMetabolism:number;

      		if(this.user.gender==="Male"){

      			baseMetabolism = (9.99 * (this.user.weight)) + (6.25 * (this.user.size)) - (4.92 * (this.user.age)) + 5 ;


      		}else if(this.user.gender="Female"){

      			baseMetabolism = (9.99 * (this.user.weight)) + (6.25 * (this.user.size)) - (4.92 * (this.user.age)) - 161 ;

      		}

      		alert( baseMetabolism * activityFactor);
          
          return baseMetabolism * activityFactor;

      }else{

           const formValue = this.specifications.value;
            let Sportcalories  =  this.activityCaloriesLost(formValue['Activity']) * formValue['hours'] ;
          
         let TotalCaloriestoLoose  = formValue['objectif'] * 7700 ;
         let days = (new Date(formValue['enddate']).getTime() - new Date(formValue['startdate']).getTime())/(1000*60*60*24);

           //alert("dayss :"+ days);

          let CaloriesToLoose = (TotalCaloriestoLoose / days);

          let CaloriesToEat = (CaloriesToLoose -  Sportcalories) ;

         //   alert("total calories to loose "+ CaloriesToLoose+" sport calories "+Sportcalories);
             

        if (CaloriesToEat >=0){
         alert("you don't practice enough work or the period is too short" );
         return 0;
        }else if (Math.abs(CaloriesToEat) < 1200){

          alert("you don't practice enough work or the period is too short");
          return 0;
        }else{
         CaloriesToEat= Math.abs(CaloriesToEat);
        }

         alert("calories to eat "+ CaloriesToEat);
        return CaloriesToEat;

      }
  	}




  activityCaloriesLost($activity){
      
      let caloriesLost=0;

 if($activity === "Marche Lente" ){

    if(this.user.gender==="Male"){

      if(this.user.weight >55 && this.user.weight <= 65){
        caloriesLost = 182;
      }else if(this.user.weight >65 && this.user.weight <= 75){
        caloriesLost = 213;
      }else if(this.user.weight >75 && this.user.weight <= 85){
        caloriesLost = 243;
      }else if(this.user.weight >85 && this.user.weight <= 95){
        caloriesLost = 275;
      }

    } else if(this.user.gender==="Female"){

      if(this.user.weight >55 && this.user.weight <= 65){
        caloriesLost = 174;
      }else if(this.user.weight >65 && this.user.weight <= 75){
        caloriesLost = 203;
      }else if(this.user.weight >75 && this.user.weight <= 85){
        caloriesLost = 232;
      }else if(this.user.weight >85 && this.user.weight <= 95){
        caloriesLost = 262;
      }

    }
  }


 else if($activity === "Marche rapide" ){

    if(this.user.gender==="Male"){

      if(this.user.weight >55 && this.user.weight <= 65){
        caloriesLost = 293;
      }else if(this.user.weight >65 && this.user.weight <= 75){
        caloriesLost = 341;
      }else if(this.user.weight >75 && this.user.weight <= 85){
        caloriesLost = 390;
      }else if(this.user.weight >85 && this.user.weight <= 95){
        caloriesLost = 440;
      }

    } else if(this.user.gender==="Female"){

      if(this.user.weight >55 && this.user.weight <= 65){
        caloriesLost = 279;
      }else if(this.user.weight >65 && this.user.weight <= 75){
        caloriesLost = 325;
      }else if(this.user.weight >75 && this.user.weight <= 85){
        caloriesLost = 372;
      }else if(this.user.weight >85 && this.user.weight <= 95){
        caloriesLost = 419;
      }

    }
  }

  else if($activity === "Course à pied lente" ){

    if(this.user.gender==="Male"){

      if(this.user.weight >55 && this.user.weight <= 65){
        caloriesLost = 480;
      }else if(this.user.weight >65 && this.user.weight <= 75){
        caloriesLost = 560;
      }else if(this.user.weight >75 && this.user.weight <= 85){
        caloriesLost = 540;
      }else if(this.user.weight >85 && this.user.weight <= 95){
        caloriesLost = 720;
      }

    } else if(this.user.gender==="Female"){

      if(this.user.weight >55 && this.user.weight <= 65){
        caloriesLost = 457;
      }else if(this.user.weight >65 && this.user.weight <= 75){
        caloriesLost = 534;
      }else if(this.user.weight >75 && this.user.weight <= 85){
        caloriesLost = 610;
      }else if(this.user.weight >85 && this.user.weight <= 95){
        caloriesLost = 686;
      }

    }
  }



   else if($activity === "Course à pied rapide" ){

    if(this.user.gender==="Male"){

      if(this.user.weight >55 && this.user.weight <= 65){
        caloriesLost = 624;
      }else if(this.user.weight >65 && this.user.weight <= 75){
        caloriesLost = 728;
      }else if(this.user.weight >75 && this.user.weight <= 85){
        caloriesLost = 832;
      }else if(this.user.weight >85 && this.user.weight <= 95){
        caloriesLost = 935;
      }

    } else if(this.user.gender==="Female"){

      if(this.user.weight >55 && this.user.weight <= 65){
        caloriesLost = 595;
      }else if(this.user.weight >65 && this.user.weight <= 75){
        caloriesLost = 694;
      }else if(this.user.weight >75 && this.user.weight <= 85){
        caloriesLost = 793;
      }else if(this.user.weight >85 && this.user.weight <= 95){
        caloriesLost = 893;
      }

    }
  }




else if($activity === "Vélo" ){

    if(this.user.gender==="Male"){

      if(this.user.weight >55 && this.user.weight <= 65){
        caloriesLost = 317;
      }else if(this.user.weight >65 && this.user.weight <= 75){
        caloriesLost = 369;
      }else if(this.user.weight >75 && this.user.weight <= 85){
        caloriesLost = 422;
      }else if(this.user.weight >85 && this.user.weight <= 95){
        caloriesLost = 475;
      }

    } else if(this.user.gender==="Female"){

      if(this.user.weight >55 && this.user.weight <= 65){
        caloriesLost = 302;
      }else if(this.user.weight >65 && this.user.weight <= 75){
        caloriesLost = 352;
      }else if(this.user.weight >75 && this.user.weight <= 85){
        caloriesLost = 402;
      }else if(this.user.weight >85 && this.user.weight <= 95){
        caloriesLost = 452;
      }

    }
  }


   else if($activity === "Natation lente" ){

    if(this.user.gender==="Male"){

      if(this.user.weight >55 && this.user.weight <= 65){
        caloriesLost = 324;
      }else if(this.user.weight >65 && this.user.weight <= 75){
        caloriesLost = 378;
      }else if(this.user.weight >75 && this.user.weight <= 85){
        caloriesLost = 432;
      }else if(this.user.weight >85 && this.user.weight <= 95){
        caloriesLost = 486;
      }

    } else if(this.user.gender==="Female"){

      if(this.user.weight >55 && this.user.weight <= 65){
        caloriesLost = 308;
      }else if(this.user.weight >65 && this.user.weight <= 75){
        caloriesLost = 359;
      }else if(this.user.weight >75 && this.user.weight <= 85){
        caloriesLost = 410;
      }else if(this.user.weight >85 && this.user.weight <= 95){
        caloriesLost = 462;
      }

    }
  }


   else if($activity === "Natation rapide" ){

    if(this.user.gender==="Male"){

      if(this.user.weight >55 && this.user.weight <= 65){
        caloriesLost = 960;
      }else if(this.user.weight >65 && this.user.weight <= 75){
        caloriesLost = 1120;
      }else if(this.user.weight >75 && this.user.weight <= 85){
        caloriesLost = 1280;
      }else if(this.user.weight >85 && this.user.weight <= 95){
        caloriesLost = 1440;
      }

    } else if(this.user.gender==="Female"){

      if(this.user.weight >55 && this.user.weight <= 65){
        caloriesLost = 916;
      }else if(this.user.weight >65 && this.user.weight <= 75){
        caloriesLost = 1068;
      }else if(this.user.weight >75 && this.user.weight <= 85){
        caloriesLost = 1221;
      }else if(this.user.weight >85 && this.user.weight <= 95){
        caloriesLost = 1373;
      }

    }
  }



   else if($activity === "Fitness Cardio" ){

    if(this.user.gender==="Male"){

      if(this.user.weight >55 && this.user.weight <= 65){
        caloriesLost = 453;
      }else if(this.user.weight >65 && this.user.weight <= 75){
        caloriesLost = 529;
      }else if(this.user.weight >75 && this.user.weight <= 85){
        caloriesLost = 604;
      }else if(this.user.weight >85 && this.user.weight <= 95){
        caloriesLost = 680;
      }

    } else if(this.user.gender==="Female"){

      if(this.user.weight >55 && this.user.weight <= 65){
        caloriesLost = 432;
      }else if(this.user.weight >65 && this.user.weight <= 75){
        caloriesLost = 504;
      }else if(this.user.weight >75 && this.user.weight <= 85){
        caloriesLost = 576;
      }else if(this.user.weight >85 && this.user.weight <= 95){
        caloriesLost = 648;
      }

    }
  }


   else if($activity === "Musculation" ){

    if(this.user.gender==="Male"){

      if(this.user.weight >55 && this.user.weight <= 65){
        caloriesLost = 325;
      }else if(this.user.weight >65 && this.user.weight <= 75){
        caloriesLost = 380;
      }else if(this.user.weight >75 && this.user.weight <= 85){
        caloriesLost = 434;
      }else if(this.user.weight >85 && this.user.weight <= 95){
        caloriesLost = 488;
      }

    } else if(this.user.gender==="Female"){

      if(this.user.weight >55 && this.user.weight <= 65){
        caloriesLost = 238;
      }else if(this.user.weight >65 && this.user.weight <= 75){
        caloriesLost = 278;
      }else if(this.user.weight >75 && this.user.weight <= 85){
        caloriesLost = 317;
      }else if(this.user.weight >85 && this.user.weight <= 95){
        caloriesLost = 357;
      }

    }
  }

  else if($activity === "Gym aquatique" ){

    if(this.user.gender==="Male"){

      if(this.user.weight >55 && this.user.weight <= 65){
        caloriesLost = 247;
      }else if(this.user.weight >65 && this.user.weight <= 75){
        caloriesLost = 288;
      }else if(this.user.weight >75 && this.user.weight <= 85){
        caloriesLost = 330;
      }else if(this.user.weight >85 && this.user.weight <= 95){
        caloriesLost = 371;
      }

    } else if(this.user.gender==="Female"){

      if(this.user.weight >55 && this.user.weight <= 65){
        caloriesLost = 236;
      }else if(this.user.weight >65 && this.user.weight <= 75){
        caloriesLost = 275;
      }else if(this.user.weight >75 && this.user.weight <= 85){
        caloriesLost = 315;
      }else if(this.user.weight >85 && this.user.weight <= 95){
        caloriesLost = 354;
      }

    }
  }
 
    alert("calories lost"+caloriesLost);
    return caloriesLost;
  }





  logout(){
   this.logoutservice.logout();
 }






}
