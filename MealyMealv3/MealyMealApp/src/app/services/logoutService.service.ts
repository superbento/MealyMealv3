
import { Router } from '@angular/router';

import { Injectable } from '@angular/core';



@Injectable()
export class logoutService{
	


	constructor (private router: Router) {}


 logout(){
 	localStorage.removeItem('currentUser');
 	 this.router.navigate(['../log']);
 }


}