
import { Component, ViewChild, ElementRef, OnInit, EventEmitter, Output } from "@angular/core/";
import { Platform, NavController, ToastController, Gesture, } from 'ionic-angular';
import { GoogleMap, GoogleMaps, GoogleMapsEvent, LatLng, Marker, GoogleMapsAnimation, CameraPosition, ILatLng } from "@ionic-native/google-maps";
import { Geolocation } from '@ionic-native/geolocation';
import { LongPressModule } from 'ionic-long-press';
import { Databaseservice } from "../../providers/databaseservice/databaseservice";
// import { Databaseservice } from "../../providers/databaseservice/databaseservice";
// import { FirebaseListObservable } from "angularfire2";
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
  private listaMarkadores: LatLng[] = []
  subscription: any;
  constructor(
    private geolocation: Geolocation,
    public platform: Platform,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public db: Databaseservice
  ) {
    console.warn("Chegou a constru")

    // <-- no longer need to define in constructor
  }

  loadMap() {
    let lugarQualquer = new LatLng(-16.6868912, -49.2647943);

    this.obterPosicaoAtual()
    this.db.getLocations(10, lugarQualquer)
    this.db.observableLocations.subscribe(hit =>{ 
          
      let novoMaker: any = { title: 'Um lugar',icon: 'red',animation: 'DROP'}
        novoMaker.position = {lat:hit.lat,lng:hit.lng}
        // console.info("O Que tem no  element postion"+JSON.stringify(novoMaker));
            this.map.addMarker(novoMaker);
    });
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
          // alert(JSON.stringify(dados))this.db.salvarMarker(latLng)
          this.db.salvarMarker(dados.position)
          //this.map.addMarker(dados);
        }
      );
      this.map.addEventListener(GoogleMapsEvent.CAMERA_MOVE_END).subscribe((camera) => {
        let posicaoDaCamera: ILatLng = this.map.getCameraTarget()
        this.map.clear()
       
          this.db.getLocations(10, posicaoDaCamera)
      })
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
