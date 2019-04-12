
import { Component, OnInit } from '@angular/core';
import { httpService } from '../services/httpRequest.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit {


  Login : FormGroup;
  user;

  constructor(private formBuilder: FormBuilder, private loghttp: httpService, private router: Router) { }

  ngOnInit() {

    this.user = JSON.parse(localStorage.getItem('currentUser'));  
    console.log(this.user);// alert(this.user);
   this.initForm();

  }



   initForm(){
  	
    this.Login = this.formBuilder.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['', Validators.required],
     
    });

  }


  onSubmitForm(){
  		const formValue = this.Login.value;
  	if(formValue['email'] != '' && formValue['password']!=''){
  	 
          let user;
  		  const params = new FormData();
          params.append('email', formValue['email']);
          params.append('password', formValue['password']);

          //alert(params.get('email'));

          this.loghttp.Login(params).subscribe(data => {
             //console.log(JSON.parse(data));  alert(JSON.parse(data));

                user = data;
               
              localStorage.setItem('currentUser', JSON.stringify(user)); 
              //alert(localStorage.getItem('currentUser')); console.log(localStorage.getItem('currentUser'));
              this.router.navigate(['../module']);
		  }, (error) => {
          alert('Erreur ! : ' + error);
        });


  	}

  }

}
