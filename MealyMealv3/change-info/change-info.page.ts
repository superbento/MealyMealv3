
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
      
      currentWeight: ['', Validators.required],
      size: ['', Validators.required],
      
      password: ['', Validators.required],
      passwordconfirm: ['', Validators.required]
    });

  }


   onSubmitForm() {
    
    const formValue = this.changeInfo.value;
   
    if(this.page === 1){
  		

  		if(formValue['currentWeight']!='' && formValue['size']!=''){
  		 this.nextPage();
  		}else{
  			alert("fill all field");
  		}

  	}else if(this.page===2){

	  	if(formValue['password']!='' && formValue['passwordconfirm']!='' && formValue['password'] === formValue['passwordconfirm']){

          alert(this.user.email);
	    	
	   

          const params = new FormData();
     
          params.append('currentWeight', formValue['currentWeight']);
          params.append('size', formValue['size']);

          params.append('email', this.user.email);
          params.append('password', formValue['password']);


          this.subscribehttp.changeInfo(params).subscribe(data => {
             console.log(data);  alert('good');
		  }, (error) => {
          var str = JSON.stringify(error);
          alert('Erreur ! : ' + str);
        });

        	 this.nextPage();

	    }else{

	      alert("fill all field");

	    }

    }
      
      
    
  }

}
