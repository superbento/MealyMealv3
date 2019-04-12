
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ReactiveFormsModule,FormsModule  } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { LoginComponent } from './login/login.component';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { displayFormService } from './services/display.service';
import { httpService } from './services/httpRequest.service';
import  {logoutService} from './services/logoutService.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { ChooseModuleComponent } from './choose-module/choose-module.component';
import { MenuComponent } from './menu/menu.component';
import { cartPage } from './cart/cart.page';
import { cartSecondPage } from './cart/cartSecond.page';
import { settingPage } from './setting/setting.page';
import { userPage } from './user/user.page';
import { ChartModule } from 'angular2-highcharts';
import * as highcharts from 'Highcharts';
import { ForgetPage } from './forget/forget.page';
import {GetListComponent} from './getList/getList.component';
import {ChangeInfoPage} from './change-info/change-info.page';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [AppComponent, AccueilComponent, LoginComponent, SubscribeComponent, ChooseModuleComponent, MenuComponent, settingPage, cartPage, cartSecondPage, userPage, ForgetPage, GetListComponent, ChangeInfoPage],
  entryComponents: [],
  imports: [BrowserModule, AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBcRt1r4xB3aiAJ9Mv1pvt3fxCcq6tcKPc'
  }), IonicModule.forRoot(), AppRoutingModule, FormsModule, ReactiveFormsModule, HttpModule, HttpClientModule, ChartModule.forRoot(highcharts)],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    displayFormService,
    httpService,
    logoutService

  ],
  bootstrap: [AppComponent],

})
export class AppModule {}
