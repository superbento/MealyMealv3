  
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {RequestOptions, Request, RequestMethod} from '@angular/http';
import { Injectable } from '@angular/core';



@Injectable()
export class httpService{
	
	serverName : string ;
  url: string;



	constructor (private http: HttpClient) {
    this.serverName = "http://35.189.215.7:80/MealyMealBackEnd/";
    //this.serverName = "http://localhost/MealyMealBackEnd/";
	}


  setHeader(){


    let headers = new HttpHeaders().set('Access-Control-Allow-Origin','*').set('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS')/*.set('Content-Type','application/json').set('Authorization','authkey')*/;


    return headers;
  }


  Subscribtion(params:FormData) {
     this.url =  this.serverName + "subscribe.php";

     let headers = this.setHeader();

    
  		return this.http.post(this.url, params, {headers:headers});

  }


  Login(params:FormData){

     this.url =  this.serverName + "log.php";

     let headers = this.setHeader();
    
      return this.http.post(this.url, params , {headers:headers});


  }

  CreateModule(params:FormData){

   
     this.url =  this.serverName + "createModule.php";


     let headers = this.setHeader();
    
      return this.http.post(this.url, params , {headers:headers});


  }


    getMenu(params:FormData){

     this.url =  this.serverName + "getmenu.php";

     let headers = this.setHeader();
    
      return this.http.post(this.url, params , {headers:headers});


  }


  getGraph(params:FormData){

     this.url =  this.serverName + "getgraph.php";

     let headers = this.setHeader();
    
      return this.http.post(this.url, params , {headers:headers});


  }



  setMenuDone(params:FormData){

     this.url =  this.serverName + "menuDone.php";

     let headers = this.setHeader();
    
      return this.http.post(this.url, params , {headers:headers});


  }


  changeInfo(params:FormData){

     this.url =  this.serverName + "changeInfo.php";

     let headers = this.setHeader();
    
      return this.http.post(this.url, params , {headers:headers});


  }


  setAllergy(params:FormData){

     this.url =  this.serverName + "setallergies.php";

     let headers = this.setHeader();
    
      return this.http.post(this.url, params , {headers:headers});


  };


   deleteAllergy(params:FormData){

     this.url =  this.serverName + "deleteallergies.php";

     let headers = this.setHeader();
    
      return this.http.post(this.url, params , {headers:headers});


  };


 
  getAliments(){

     this.url =  this.serverName + "aliments.php";

     let headers = this.setHeader();
    
      return this.http.get(this.url,{headers:headers});


  }


  finishProgram(params:FormData){

     this.url =  this.serverName + "finishprogram.php";

     let headers = this.setHeader();
    
       return this.http.post(this.url, params , {headers:headers});


  }







}