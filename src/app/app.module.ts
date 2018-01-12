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
// import { Databaseservice } from "../providers/databaseservice/databaseservice"
import { Databaseservice } from '../providers/databaseservice/databaseservice';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';

export const firebaseConfig = {
  apiKey: "AIzaSyDaw--6eoBfkkOIqrmZVoDEo-NGpmnYW_Y",
  authDomain: "apenastestes-e598b.firebaseapp.com",
  databaseURL: "https://apenastestes-e598b.firebaseio.com",
  projectId: "apenastestes-e598b",
  storageBucket: "apenastestes-e598b.appspot.com",
  messagingSenderId: "956706882458"
};




@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MapaComponent],
  imports: [
    BrowserModule,
    HttpModule,
    LongPressModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
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
    AngularFireDatabase,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Databaseservice
    
  ]
})
export class AppModule { }
