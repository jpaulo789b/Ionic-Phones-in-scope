import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as GeoFire from "geofire";
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { LatLng, ILatLng } from '@ionic-native/google-maps';
import { Subscriber } from 'rxjs/Subscriber';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class Databaseservice {
    dbRef: any;
    geoFire: any;
    hits: LatLng[] = [];
    observableLocations;
    locations;
    constructor(private db: AngularFireDatabase) {
        /// Reference database location for GeoFire
        this.dbRef = this.db.database
        this.geoFire = new GeoFire(this.db.database.ref('local'));
        this.observableLocations = new Observable<LatLng>(sub =>{
            this.locations = sub;
        });
    }

    public salvarMarker(posicao: LatLng) {
        alert("ServiceDB" + JSON.stringify({ lat: posicao.lat, lng: posicao.lng }))
        this.geoFire.set(this.randonKey(), [posicao.lat, posicao.lng])
            .then(_ => console.warn('location updated'))
            .catch(err => console.warn(err))
    }
    public getLocations(distance: number, posicao: ILatLng) {
        let query:any = {}
        query.center = [posicao.lat, posicao.lng]
        query.radius = distance
        
        this.geoFire.query(query).on('key_entered', (key, location, distance) => {
            let hit:LatLng = new LatLng(location[0], location[1])
            this.locations.next(hit)
            this.hits.push(hit)
        })
    }
    // public getLocations(radius: number, posicao:LatLng):LatLng[] {
    //     alert("DB SERVICE SHOW ALL"+JSON.stringify(posicao))
    //     this.geoFire.query({
    //       center: [posicao.lat,posicao.lng],
    //       radius: radius
    //     })
    //     .on('key_entered', (key, location, distance) => {
    //       let hit = new LatLng(location[0],location[1])
    //       let currentHits = this.hits
    //       currentHits.push(hit)
    //     })
    //     return this.hits
    //    }


    private randonKey(): string {
        return this.dbRef.ref('d').push().getKey();
    }
}