
import { Component, OnInit } from '@angular/core';
import { httpService } from '../services/httpRequest.service';
import {logoutService} from '../services/logoutService.service';
import {NavController} from '@ionic/angular';


@Component({
  selector: 'app-cart',
  templateUrl: 'cart.page.html',
  styleUrls: ['cart.page.scss']
})

export class cartPage implements OnInit{
	 constructor(private menuhttp: httpService,private logoutservice:logoutService,  public nav: NavController) { }


	  user;

	   ngOnInit() {

  	//const params = new FormData();
  	this.user = JSON.parse(localStorage.getItem('currentUser'));  
     console.log(this.user);
  /*  params.append('iduser', this.user.id );


   	this.menuhttp.getMenu(params).subscribe(data => {
             console.log(data); 

              this.user = data;
               
              localStorage.setItem('currentUser', JSON.stringify(this.user)); 
              console.log(" surrent user "+JSON.parse(localStorage.getItem('currentUser')));

      }, (error) => {
      var str = JSON.stringify(error);
      var name = JSON.stringify(this.user);
          //alert('Erreur ! : ' + str+'user:'+name);

   });*/

  }


   logout(){
   this.logoutservice.logout();
 }
    navCartSecond(){
        this.nav.navigateForward('/secondPage');
    }

}
