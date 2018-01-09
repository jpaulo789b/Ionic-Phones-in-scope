import { NgModule } from '@angular/core';
import { ConfigGeoFireDirective } from './config-geo-fire/config-geo-fire';
import { FirebaseDirective } from './firebase/firebase';
@NgModule({
	declarations: [ConfigGeoFireDirective,
    FirebaseDirective],
	imports: [],
	exports: [ConfigGeoFireDirective,
    FirebaseDirective]
})
export class DirectivesModule {}
