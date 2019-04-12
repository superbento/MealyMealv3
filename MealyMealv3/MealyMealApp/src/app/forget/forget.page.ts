import { Component, OnInit } from '@angular/core';
import  {logoutService} from '../services/logoutService.service';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.page.html',
  styleUrls: ['./forget.page.scss'],
})
export class ForgetPage implements OnInit {

  constructor(private logoutservice:logoutService) { }

  ngOnInit() {
  }


  logout(){
   this.logoutservice.logout();
 }


}
