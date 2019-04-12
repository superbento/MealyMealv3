import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { FormBuilder} from '@angular/forms';
import { Item } from '../services/Item';
import { NavController} from '@ionic/angular';

@Component({
    selector: 'app-getlist',
    templateUrl: './getList.component.html'
})

    export class GetListComponent implements OnInit{
    floor(num){
      num=Math.ceil(num);
      return num;
    }
    user;
    ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser')); 
    }
    public arrayA: Array<Item> = [];
    constructor(private http: HttpClient, public formBuilder: FormBuilder, public nav: NavController) {}
    listBox =  this.formBuilder.group({
        name: [''],
        brand: [''],
        description: [''],
        gtin: ['']
    });
    getList(id: string) {
        // @ts-ignore
        const item: Item = new Item() ;
        const headers = new HttpHeaders().set('x-ibm-client-secret', 'Q2rU7uQ1nL3fH5nY1tY0lV4gM6tH6uW4jF6gU2bI6sG1gU2qN1').set('x-ibm-client-id', '70c36ca5-cde6-40dd-9bb4-ad86d8cd25b7');
        this.http.get('https://api.fr.carrefour.io/v1/openapi/items/' + id, {headers: headers}).subscribe(
            (res: any) => {
                console.log(res);
                this.listBox.patchValue({
                    name: res.name,
                    brand: res.brand,
                    description: res.description,
                    gtin: res.gtin
                });
                item.name = res.name;
                item.brand = res.brand;
                item.description = res.description;
                item.gtin = res.gtin;
                this.arrayA.push(item);
            },
            err => {
                console.log('Error');
            });
    }

    pageBack(){
        this.nav.back();
    }
}




