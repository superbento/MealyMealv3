
import { Component, OnInit } from '@angular/core';
import { displayFormService } from '../services/display.service';
import { httpService } from '../services/httpRequest.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss']
})


export class SubscribeComponent implements OnInit {

	page = 1;

	Subscribtion : FormGroup;

   chooseallergy : FormGroup;

   aliments;

  allergies:any[] = [];


  constructor(private formBuilder: FormBuilder, private subscribehttp: httpService) { 

  }

  ngOnInit() {
  	this.initForm();
   
     this.page = 1;
     this.subscribehttp.getAliments().subscribe(data => {
             console.log(data);  
              //alert(data)
              this.aliments = data;
               
             // localStorage.setItem('currentUser', JSON.stringify(this.user)); 
             // console.log(" current user "+JSON.parse(localStorage.getItem('currentUser')));

      }, (error) => {
      var str = JSON.stringify(error);
      
        //  alert('Erreur ! : ' + str+'user:'+name);

   });


  }

  nextPage(){

   if(this.page === 1){
  	this.page=2;
  	}else if(this.page===2){
  		this.page=3;
  	}else if(this.page===3){
      this.page=4;
    }

  }

  previousPage(){

    if(this.page === 2){
    this.page=1;
    }else if(this.page===3){
      this.page=2;
    }
  
  }


  initForm(){
  	
    this.Subscribtion = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      currentWeight: ['', Validators.required],
      size: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      birthday: ['', Validators.required],
      email: ['',[Validators.required, Validators.email]],
      password: ['', Validators.required],
      passwordconfirm: ['', Validators.required]
    });


    this.chooseallergy = this.formBuilder.group({
      aliment: ['', Validators.required],
      
    });

  }





  allergy(){


  const formValue = this.chooseallergy.value;
  let exist = 0;

  //alert(this.allergies.length);

   for (var i = 0; i < this.allergies.length; i++) {

      // alert(this.allergies[0]); 

     if(this.allergies[i] === formValue['aliment']){
       exist = 1; //alert("equallll");
     }
   }

    if(exist === 0){

      this.allergies.push(formValue['aliment']);

    }

  }





   onSubmitForm() {
    
    const formValue = this.Subscribtion.value;
   
    if(this.page === 1){
  		console.log(formValue['firstname']+" "+formValue['lastname'] );

  		if(formValue['firstname']!='' && formValue['lastname']!='' && formValue['currentWeight']!='' && formValue['size']!='' && formValue['age']!='' && formValue['gender']!=''){
  		 this.nextPage();
  		}else{
  			alert("fill all field");
  		}

  	}else if(this.page===2){

	  	if(formValue['birthday']!='' && formValue['email']!='' && formValue['password']!='' && formValue['passwordconfirm']!='' && formValue['password'] === formValue['passwordconfirm']){


          this.nextPage();

	    	console.log(formValue['email']+" "+formValue['password'] );
	    	console.log("et l'ancienn " +formValue['firstname']+" "+formValue['lastname'] );
	    	//this.router.navigate(['/users']);

	    }else{

	      alert("fill all field");

	    }

    }else if(this.page===3){


          const params = new FormData();
          params.append('firstname', formValue['firstname']);
          params.append('lastname', formValue['lastname']);
          params.append('currentWeight', formValue['currentWeight']);
          params.append('size', formValue['size']);
          params.append('age', formValue['age']);
          params.append('gender', formValue['gender']);
          params.append('birthday', formValue['birthday']);
          params.append('email', formValue['email']);
          params.append('password', formValue['password']);
          params.append('allergies', String(this.allergies));


        this.subscribehttp.Subscribtion(params).subscribe(data => {
             console.log(data);  //alert('good');
        }, (error) => {
          var str = JSON.stringify(error);
          alert('Erreur ! : ' + str);
        });

           this.nextPage();


    }else{
      this.page = 1;
    }
      
      
    
  }




deleteAllergy(event){


   //alert(event.target.attributes.id.nodeValue);


   let alimentname = event.target.attributes.id.nodeValue;

  let index;

  for (var i = 0; i < this.allergies.length; i++) {
     if(this.allergies[i] === alimentname){
        this.allergies.splice(i, 1);
     }
  }
   

}



}
