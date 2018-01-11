import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MapaComponent } from '../components/mapa/mapa';
import { GoogleMaps } from '@ionic-native/google-maps';
import { HttpModule } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';
import { LongPressModule } from 'ionic-long-press';
import { AngularFireModule } from 'angularfire2/index';
import { FirebaseConfig } from './shared/firebase.config'


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MapaComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    LongPressModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FirebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MapaComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    MapaComponent,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
