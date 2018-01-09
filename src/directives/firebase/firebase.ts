import { Directive } from '@angular/core';

/**
 * Generated class for the FirebaseDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[firebase]' // Attribute selector
})
export class FirebaseDirective {

  constructor() {
    console.log('Hello Firebase Directive Directive');
  }

}
export const firebaseConfig = {
  apiKey: "AIzaSyDaw--6eoBfkkOIqrmZVoDEo-NGpmnYW_Y",
  authDomain: "apenastestes-e598b.firebaseapp.com",
  databaseURL: "https://apenastestes-e598b.firebaseio.com",
  storageBucket: "",
  messagingSenderId: "apenastestes-e598b"
};