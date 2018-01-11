import { AngularFireDatabase } from "angularfire2/database";
import { GeoFire } from 'geofire';
// import { FirebaseApp } from "angularfire2";
import { LatLng, Marker } from "@ionic-native/google-maps";
export class FirebaseMaps {
    
    private geoFire: GeoFire
    private firebase:AngularFireDatabase
    constructor(private angularFire: AngularFireDatabase) {
        this.firebase = angularFire;
        this.geoFire = new GeoFire(this.firebase);
    }

    public obterSalvosNoRadio(posicao:LatLng) {
          this.geoFire.query({
            center: [posicao.lat, posicao.lng],
            radius: 10
          });
          
    }

    public salvarMarker(posicao:LatLng){
        this.geoFire.set("Lugar", [37.79, -122.41]).then(function() {
            console.log("Provided key has been added to GeoFire");
          }, function(error) {
            console.log("Error: " + error);
          });
    }

}