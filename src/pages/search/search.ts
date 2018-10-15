import { DataProvider } from './../../providers/data/data';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { PopoverComponent } from '../../components/popover/popover';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  city: string;
  info;
  show : number;
  image : string;
  current_temp: any;
  currentTempKelvin: any;
  min_temp:any;
  max_temp:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private providerData: DataProvider, public popoverCtrl: PopoverController) {
    this.show = 0;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  onInput(){

    this.providerData.getData(this.city).subscribe(pData => {
      this.info = pData;
      //this.infoList = this.info.data;
      this.image = this.info.weather[0].icon+'.png';
      this.currentTempKelvin = this.info.main.temp;
      this.current_temp = (this.info.main.temp-273.15).toFixed(0) +' Degrees Celsius';
      this.max_temp = (this.info.main.temp_max - 273.15).toFixed(0) +' C';
      this.min_temp = (this.info.main.temp_min - 273.15).toFixed(0) +' C';
    });

    this.show = 1;
  }

  refresh(){
    //this.info = '';
    //this.infoList = '';
    this.city = '';

    this.show = 0;
    console.log(this.show);
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.onInput();
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverComponent);
    popover.present({
      ev: myEvent
    });

    popover.onDidDismiss(popoverData =>{
      if(popoverData.name == 'Degrees'){
        this.current_temp = (this.info.main.temp-273.15).toFixed(0) +' Degrees Celsius';
        this.min_temp = (this.info.main.temp_min - 273.15).toFixed(0) + ' C';
        this.max_temp = (this.info.main.temp_max - 273.15).toFixed(0) + ' C';
      }else if(popoverData.name == 'Fahrenheit'){
        this.current_temp = (this.info.main.temp * 9/5 - 459.67).toFixed(0) +' Degrees Fahrenheit';
        this.min_temp = (this.info.main.temp_min * 9/5 - 459.67).toFixed(0) + ' F';
        this.max_temp = (this.info.main.temp_max * 9/5 - 459.67).toFixed(0) + ' F';
      }else if(popoverData.name == 'Kelvin'){
        this.current_temp = (this.info.main.temp).toFixed(0) +' Kelvin';
        this.min_temp = (this.info.main.temp_min).toFixed(0) + ' K';
        this.max_temp = (this.info.main.temp_max).toFixed(0) + ' k';
      }
    });
  }

}
