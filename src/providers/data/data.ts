import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {

  constructor(public http: HttpClient) {

  }

  getData(city : string){
    
    return this.http.get('http://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=3fe9e88e97712dcf566bc74a57238f9b');
    
  }

  /*getWeatherIcon(icon: string){

  }*/
  

}
