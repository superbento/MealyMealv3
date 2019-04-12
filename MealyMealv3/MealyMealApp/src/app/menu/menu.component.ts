
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { httpService } from '../services/httpRequest.service';
import { Router } from '@angular/router';
import  {logoutService} from '../services/logoutService.service';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
   
temp:string;
    user;

  constructor(private menuhttp: httpService, private logoutservice:logoutService) { }
 
accordion(index,temp) {
      this.temp=temp+index;
  }

  ngOnInit() {

  	const params = new FormData();
  	this.user = JSON.parse(localStorage.getItem('currentUser'));  
    params.append('iduser', this.user.id );


   	this.menuhttp.getMenu(params).subscribe(data => {
             console.log(data); // alert('good');

              this.user = data;
               
              localStorage.setItem('currentUser', JSON.stringify(this.user)); 
              console.log(" surrent user "+JSON.parse(localStorage.getItem('currentUser')));

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

