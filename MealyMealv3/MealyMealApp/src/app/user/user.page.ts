
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { httpService } from '../services/httpRequest.service';
import { Router } from '@angular/router';
import  {logoutService} from '../services/logoutService.service';

//let fibonacci: number[] = [0.25, 0.75];

@Component({
  selector: 'app-user',
  templateUrl: 'user.page.html',
  styleUrls: ['user.page.scss']
})
export class userPage implements OnInit{
	

	public form= [
      { val: 'Breakfast', isChecked: false },
      { val: 'Snack1', isChecked: false },
      { val: 'Lunch', isChecked: false },
      { val: 'Snack2', isChecked: false },
      { val: 'Diner', isChecked: false }
    ];

time:any;
detectH:boolean;

today = '2019-03-24';
user;
percentageform: FormGroup;
 chartOptions : any;
  labels:string[] = [];

  initForm(){
  	
    this.percentageform = this.formBuilder.group({

      dish: ['false', Validators.required],
     // description: [''], 
        
    });

  }

  constructor(private userhttp: httpService,private formBuilder: FormBuilder,  private router: Router, private logoutservice:logoutService) { 
    this.ngOnInit();


    
 }
  
detectHour(){
  this.time = new Date();
  //alert(this.time.getHours());
  var hour = this.time.getHours();
  
  if(hour>=22){
     this.detectH=true;
  }
}




  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser')); 
    this.initForm(); 
    this.detectH=false;
    this.detectHour();
  	const params = new FormData();
  	this.user = JSON.parse(localStorage.getItem('currentUser'));  
    params.append('iduser', this.user.id );
    params.append('startdate', this.user.module.startDate );
    params.append('today', this.today);


   	this.userhttp.getGraph(params).subscribe(res => {
            // console.log(res); 
            // alert(res);
            // this.chartOptions.series[0].data = data;
           
             for(var i in res){
               // alert(i); 
                let num = Number(i)+1;
                //alert(num);
                this.labels[i]= "day "+num;
                
             }
           

             this.chartOptions = {


                  /* scales: {
                        yAxis: [{
                            display: true,
                            ticks: {
                                min:0,
                                max:100,
                            }
                        }]
                    },*/
                   chart: {
                    type: 'line'
                   },
                   title: {
                    text: 'Completion statistics',
                    style: {
                      color : "#ff0000"
                    }
                   },
                  yAxis: {

                     min:0,
                     max:100,
                      title: {
                    text: 'percentage'
                     }
                  },
                  xAxis: {
                  categories: this.labels,
                   title: {
                    text: 'days'
                   }
                  },
                  series: [{
                   name: this.user.firstname,
                   data: res
                  }]
                  }





      }, (error) => {
      var str = JSON.stringify(error);
      var name = JSON.stringify(this.user.name);
          alert('Erreur ! : ' + str+'user:'+name);

   });

  }

onSubmitForm(){
  if(this.detectH===false){
     alert("this form only can be modified between 22:00 and 00:00");

  }else{


  alert(this.form[0].isChecked +" "+this.form[1].isChecked+" "+this.form[2].isChecked+" "+this.form[3].isChecked+" "+this.form[4].isChecked);

    this.user = JSON.parse(localStorage.getItem('currentUser')); 

   let numberDays = Math.abs( (new Date(this.today).getTime() - new Date(this.user.module.startDate).getTime())/(1000*60*60*24) ) +1;

  // numberDays = 1;
   alert("number days "+numberDays);

    const params = new FormData();
    params.append('iduser', this.user.id );
    params.append('day', String(numberDays));
    params.append('breakfast', String(this.form[0].isChecked));
    params.append('snack1', String(this.form[1].isChecked));
    params.append('lunch', String(this.form[2].isChecked));
    params.append('snack2', String(this.form[3].isChecked));
    params.append('diner', String(this.form[4].isChecked));

     this.userhttp.setMenuDone(params).subscribe(data => {
             console.log(data);  


      }, (error) => {
      var str = JSON.stringify(error);
      var name = JSON.stringify(this.user);
          alert('Erreur ! : ' + str+'user:'+name);

   });

}
}





 logout(){
   this.logoutservice.logout();
 }

}
