import { DataProvider } from './../../providers/data/data';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  show;
  info;
  infoList;
  city : string;
  image:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private data: DataProvider) {
    
    this.show = 0;
    console.log('Construc.. '+this.show);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  viewWeather(){
    this.data.getData(this.city).subscribe(data => {
      this.info = data;
      //this.infoList = this.info.data;
      this.image = this.info.weather[0].icon+'.png';
    });
    console.log(this.city);
    console.log(this.data);
    this.show = 1;
  }

  refresh(){
    //this.info = '';
    this.infoList = '';
    this.city = '';

    this.show = 0;
    console.log(this.show);
  }

}
