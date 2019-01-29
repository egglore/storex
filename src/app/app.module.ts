import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import { MyApp } from './app.component';
//import { IonicStorageModule } from '@ionic/storage';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { IntroPage } from '../pages/intro/intro';
import { DetailPage } from '../pages/detail/detail';
import { MapPage } from '../pages/map/map';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { KakaoMapsModule } from 'kakao-maps-sdk';
import { CallNumber } from '@ionic-native/call-number';
import { IonicImageViewerModule } from 'ionic-img-viewer';

import { FilterPipe } from '../pages/home/filter.pipe';
import { AdMobFree } from '@ionic-native/admob-free';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    IntroPage,
    DetailPage,
    MapPage,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    KakaoMapsModule,
    IonicImageViewerModule,
    IonicModule.forRoot(MyApp)
   // IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    IntroPage,
    DetailPage,
    MapPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CallNumber,
    AdMobFree,    
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
