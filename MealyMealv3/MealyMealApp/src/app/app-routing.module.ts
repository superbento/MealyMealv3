import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { LoginComponent } from './login/login.component';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { ChooseModuleComponent } from './choose-module/choose-module.component';
import { MenuComponent } from './menu/menu.component';
import { cartPage } from './cart/cart.page';
import { cartSecondPage } from './cart/cartSecond.page';
import { settingPage } from './setting/setting.page';
import { userPage } from './user/user.page';
import { ForgetPage } from './forget/forget.page';
import {GetListComponent} from './getList/getList.component';
import  {ChangeInfoPage} from './change-info/change-info.page';


const routes: Routes = [
  { path: '', component: AccueilComponent },
  { path: 'log', component: LoginComponent},
  { path: 'subs', component: SubscribeComponent },
  { path: 'module', component: ChooseModuleComponent},
  { path: 'menu', component: MenuComponent},
 { path: 'cart', component: cartPage},
  { path: 'secondPage', component: cartSecondPage},
   { path: 'setting', component: settingPage},
    { path: 'user', component: userPage},
{ path: 'forget', component: ForgetPage},
  { path: 'getlist', component: GetListComponent},
  { path: 'changeinfo', component: ChangeInfoPage }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
