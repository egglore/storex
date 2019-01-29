import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { HomePage } from '../home/home';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { TabsPage } from '../../pages/tabs/tabs';

/**
 * Generated class for the IntroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-intro',
  templateUrl: 'intro1.html',
})

export class IntroPage {
  @ViewChild(Slides) slides: Slides;

  /*goToSlide() {
    this.slides.slideTo(2, 500);
  }*/

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log('page-intro');
    let TIME_IN_MS = 1000;
    setTimeout(() => {
      this.navHome();
    }, TIME_IN_MS);

  }

  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    console.log('Current index is', currentIndex);
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad IntroPage');
  }

  navHome() {
    this.navCtrl.setRoot(TabsPage, {},  { animate: true,
      animation: 'wp-transition',
      duration: 800
    });
  }

}
