
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { httpService } from '../services/httpRequest.service';
import { Router } from '@angular/router';
import  {logoutService} from '../services/logoutService.service';


@Component({
  selector: 'app-setting',
  templateUrl: 'setting.page.html',
  styleUrls: ['setting.page.scss']
})
export class settingPage implements OnInit{
	

  user;

  aliments;

  allergies:any[];

  chooseallergy : FormGroup;


  constructor(private formBuilder: FormBuilder, private http: httpService, private router: Router, private logoutservice:logoutService) { }
 


   ngOnInit() {

    this.initForm();
    //const params = new FormData();
    this.user = JSON.parse(localStorage.getItem('currentUser'));  

    this.allergies = this.user.allergies;
    //params.append('iduser', this.user.id );


     this.http.getAliments().subscribe(data => {
             console.log(data);  
              //alert(data)
              this.aliments = data;
               
             // localStorage.setItem('currentUser', JSON.stringify(this.user)); 
             // console.log(" current user "+JSON.parse(localStorage.getItem('currentUser')));

      }, (error) => {
      var str = JSON.stringify(error);
      var name = JSON.stringify(this.user);
          alert('Erreur ! : ' + str+'user:'+name);

   });

  }




  initForm(){
    
    this.chooseallergy = this.formBuilder.group({
      aliment: ['', Validators.required],
      
    });

  }




onSubmitForm(){
    const formValue = this.chooseallergy.value;
  /*this.router.navigate(['../menu']);*/ //alert("ho");
  let exist = 0;

   
  // alert(this.allergies.length);

   for (var i = 0; i < this.allergies.length; i++) {

      // alert(this.allergies[0]); 

     if(this.allergies[i] === formValue['aliment']){
       exist = 1; //alert("equallll");
     }

   }

  if(exist === 0){

    const params = new FormData();
    params.append('iduser', this.user.id );
    params.append('aliment', formValue['aliment'] );

    this.http.setAllergy(params).subscribe(data => {
             console.log(data);  //alert('good');

         

          }, (error) => {
              alert('Erreur ! : ' + error.message);
             
            });


    this.allergies.push(formValue['aliment']);
  }
  
}



deleteAllergy(event){


   alert(event.target.attributes.id.nodeValue);


   let alimentname = event.target.attributes.id.nodeValue;
   const params = new FormData();
    params.append('iduser', this.user.id );
    params.append('alimentname', alimentname);

    this.http.deleteAllergy(params).subscribe(data => {
             console.log(data);  alert('good');

             this.loadagain();

          }, (error) => {
              alert('Erreur ! : ' + error.message);
             
            });

}




loadagain(){

  const params = new FormData();
    this.user = JSON.parse(localStorage.getItem('currentUser'));  
    params.append('iduser', this.user.id );


     this.http.getMenu(params).subscribe(data => {
             console.log(data);  alert('good');

             // this.user = data;
               
             

              localStorage.setItem('currentUser', JSON.stringify(data));

              this.user = JSON.parse(localStorage.getItem('currentUser')); 

              this.allergies = this.user.allergies; 
              //console.log(" surrent user "+JSON.parse(localStorage.getItem('currentUser')));

      }, (error) => {
      var str = JSON.stringify(error);
      var name = JSON.stringify(this.user);
          alert('Erreur ! : ' + str+'user:'+name);

   });

}




 logout(){
   this.logoutservice.logout();
}
 


}
