
import { Component, ViewChild, ElementRef, OnInit, EventEmitter, Output } from "@angular/core/";
import { Platform, NavController, ToastController, Gesture, } from 'ionic-angular';
import { GoogleMap, GoogleMaps, GoogleMapsEvent, LatLng, Marker, GoogleMapsAnimation } from "@ionic-native/google-maps";
import { Geolocation } from '@ionic-native/geolocation';
import { LongPressModule } from 'ionic-long-press';
import { FirebaseMaps } from '../../app/shared/FirebaseComunication'
import { AngularFireDatabase } from "angularfire2/database";
/**
 * Generated class for the MapaComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'mapa',
  templateUrl: 'mapa.html'
})
export class MapaComponent implements OnInit {

  @ViewChild('map')
  sketchElement: ElementRef;

  map: GoogleMap;

  constructor(
    private geolocation: Geolocation,
    public platform: Platform,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    ) {
    console.warn("Chegou a constru")
    // <-- no longer need to define in constructor
  }

  ionViewDidLoad() {
    console.warn("Chegou a load primario")
    this.loadMap();
  }
  ngAfterViewInit() {
    console.warn("Chegou a ngAfterViewInit")
    this.loadMap();
  }

  loadMap() {

    console.warn("Chegou a load")
    this.map = GoogleMaps.create('map');  // <-- changed
    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      this.map.on(GoogleMapsEvent.MAP_LONG_CLICK).subscribe(
        (latLng) => {
          let dados: any = {
            title: 'Um lugar',
            icon: 'red',
            animation: 'DROP',
            position: JSON.parse(latLng)
          }
          this.map.addMarker(dados);
          // new FirebaseMaps(this.firebaseDB).salvarMarker(latLng)
          
        }
      );

    });
  }
  ngOnInit() {
    console.warn("Chegou a load++")
    this.loadMap();
  }


  obterPosicaoAtual() {
    this.geolocation.getCurrentPosition().then((resp) => {
      let minhaPosicao: LatLng = new LatLng(resp.coords.latitude, resp.coords.longitude)
      this.map.setCameraTarget(minhaPosicao)
      this.map.setCameraZoom(12)
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }
}
