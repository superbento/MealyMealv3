
import { Component, OnInit } from '@angular/core';
import { displayFormService } from '../services/display.service';
import { httpService } from '../services/httpRequest.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-change-info',
  templateUrl: './change-info.page.html',
  styleUrls: ['./change-info.page.scss'],
})
export class ChangeInfoPage implements OnInit {
 user;
page = 1;

  changeInfo : FormGroup;


  constructor(private formBuilder: FormBuilder, private subscribehttp: httpService) { 

  }

  ngOnInit() {
    this.initForm();
    this.user = JSON.parse(localStorage.getItem('currentUser'));  
  }

  nextPage(){

   if(this.page === 1){
    this.page=2;
    }else if(this.page===2){
      this.page=3;
    }

  }

  previousPage(){
    this.page=1;
  }


  initForm(){
  

    
    this.changeInfo = this.formBuilder.group({
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

  }


   onSubmitForm() {
    
    const formValue = this.changeInfo.value;
   
    if(this.page === 1){
      

      
       this.nextPage();
      

    }else if(this.page===2){

      if(formValue['password'] !='' && formValue['passwordconfirm']!='' &&formValue['password'] === formValue['passwordconfirm']){

         // alert(this.user.email);
        
     

          const params = new FormData();

          if(formValue['firstname']!=''){
              params.append('firstname', formValue['firstname']);
          }else{
              params.append('firstname', this.user.firstname);
          }

          if(formValue['lastname']!=''){
          params.append('lastname', formValue['lastname']);
          }else{
          params.append('lastname', this.user.lastname);
          }

          if(formValue['lastname']!=''){
          params.append('currentWeight', formValue['currentWeight']);
          }else{
          params.append('currentWeight', this.user.weight);
          }

          if(formValue['size']!=''){
          params.append('size', formValue['size']);
          }else{
          params.append('size', this.user.size);
          }

          if(formValue['age']!=''){
          params.append('age', formValue['age']);
          }else{
          params.append('age', this.user.age);
          }

          if(formValue['gender']!=''){
          params.append('gender', formValue['gender']);
          }else{
          params.append('gender', this.user.gender);
          }

          if(formValue['birthday']!=''){
          params.append('birthday', formValue['birthday']);
          }else{
           params.append('birthday', this.user.birthday);
          }

           if(formValue['email']!=''){
          params.append('email', formValue['email']);
          }else{
          params.append('email', this.user.email);
          }

         
          params.append('password', formValue['password']);
         

          this.subscribehttp.changeInfo(params).subscribe(data => {
             console.log(data);  alert('good');
      }, (error) => {
          var str = JSON.stringify(error);
          alert('Erreur ! : ' + str);
        });

           this.nextPage();

      }else{

        alert("password must be filled");

      }

    }
      
      
    
  }

}
