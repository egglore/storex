import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
//import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { DetailPage } from '../detail/detail';
import { CallNumber } from '@ionic-native/call-number';
//import { IntroPage } from '../intro/intro';

// import { AdMobPro } from '@ionic-native/admob-pro';
// import { Platform } from 'ionic-angular';

import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';

// @Pipe({
//   name: 'search'
// })
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
  //pipes: [CategoryPipe]   // This Line 
})
export class HomePage {

  public transform(value, keys: string, term: string) {

    if (!term) return value;
    return (value || []).filter((item) => keys.split(',').some(key => item.hasOwnProperty(key) && new RegExp(term, 'gi').test(item[key])));

  }

  stores: any;
  private items;
  public rowItems = [];
  public search = false;

  constructor(public navCtrl: NavController, public http: Http, 
              private loadingCtrl: LoadingController, private callNumber: CallNumber, private admobFree: AdMobFree) {

    let loadingPopup = this.loadingCtrl.create({
      content: 'Loading posts...'
    });
    this.http.get('assets/datas/storeList.json').map(res => res.json()).subscribe(data => {
        this.stores = data.store_list;

        this.stores.sort(function(a,b) {
          return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
        });
        this.initializeItems();
        //console.log(this.stores);

        loadingPopup.dismiss();
    });

    let bannerConfig: AdMobFreeBannerConfig = {
      // add your config here
      // for the sake of this example we will just use the test config
      isTesting: true,
      autoShow: true
     };  
     this.admobFree.banner.config(bannerConfig);

     this.admobFree.banner.prepare()
     .then(() => {
       // banner Ad is ready
       // if we set autoShow to false, then we will need to call the show method here
     })
     .catch(e => console.log(e));

     //admobFree.interstitial.show();
  }

  initializeItems() {
    this.items = this.stores;
    this.getCategory();
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();        

    // set val to the value of the searchbar
    let val = ev.target.value;

    if (val == '' || val === undefined) {
      this.search = false;
    } else {
      this.search = true;
    }
    //console.log(val);
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        //console.log(item);
        return (item.tag.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  getCategory() {
    this.items.forEach(element => {
      this.rowItems.push(element.category);      
    });
    this.rowItems = this.rowItems.reduce(function(a,b) {
      if (a.indexOf(b) < 0 ) a.push(b);
      return a;
    },[]);
    this.rowItems.sort(function(a,b) {
      return a < b ? -1 : a > b ? 1 : 0;
    });    
    console.log(this.rowItems);
  }
  //ionViewDidLoad() {

    /*this.storage.get('intro-done').then(done => {
      if (!done) {
        this.storage.set('intro-done', true);*/
//        this.navCtrl.setRoot(IntroPage);
      /*}
    });*/
  //}

  goDetail(id) {
    this.navCtrl.push(DetailPage, {
      id: id
    });
  }

  toCall(number) {
    this.callNumber.callNumber(number, true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err))
  }
}
