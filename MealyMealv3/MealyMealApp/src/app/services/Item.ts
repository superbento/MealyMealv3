
export class Item {
     name: string;
     brand: string;
     description: string;
     gtin: string;
     constructor(myname: string, mybrand: string, mydescription: string, mygtin: string){
         this.name = myname;
         this.brand = mybrand;
         this.description = mydescription;
         this.gtin = mygtin;
     }
 }
