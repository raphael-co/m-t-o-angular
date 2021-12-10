import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Weather, WeatherService } from './weather.service';
import countries from './countries.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  pays: any = countries;
  title = 'angular-weather-api';
  city!: any;
  acronymePays?:any;
  affiche!: any;
  boolaffiche?: boolean = false
  temperature?: any;
  temperatureRessentis?: any;
  vitesseVent?: any;
  directionVent?: any;
  vitessRafalVent?: any;
  panelOpenState: boolean = false
  vitesseVentBoll: boolean = true
  AfficheError: string = ""
  //error
  villeError?: boolean = false
  loading: boolean = false
  erreur!: any;
  constructor(private ws: WeatherService) {
  }
  ngOninit() {

  }

  loadweather() {
    this.ws.getCurrentWeather(this.city).subscribe(

      //reception des données
      res => {
        this.affiche = res

         this.acronymePays = (this.affiche.sys.country)
         console.log(this.acronymePays)
        this.pays = countries[this.acronymePays]
        console.log(this.pays)

        this.boolaffiche = true
        console.log(this.affiche)
        this.loading = true;
        //temperature
        this.temperature = (this.affiche.main.temp - 273.15).toFixed(2)
        this.temperatureRessentis = (this.affiche.main.feels_like - 273.15).toFixed(2)
        this.temperature = this.temperature

        //vent
        this.vitesseVent = (this.affiche.wind.speed * (3600 / 1000)).toFixed(2);
        this.vitessRafalVent = (this.affiche.wind.gust * (3600 / 1000)).toFixed(2);


        //direction du vent
        this.directionVent = this.affiche.wind.deg
        if (this.directionVent <= 22.5) {
          this.directionVent = "nord"
        } if (this.directionVent > 22.5 && this.directionVent <= 67.5) {
          this.directionVent = "nord-est"
        } if (this.directionVent > 67.5 && this.directionVent <= 112.5) {
          this.directionVent = "est"
        } if (this.directionVent > 112.5 && this.directionVent <= 157.5) {
          this.directionVent = "sud-est"
        } if (this.directionVent > 157.5 && this.directionVent <= 202.5) {
          this.directionVent = "sud"
        } if (this.directionVent > 202.5 && this.directionVent <= 247.5) {
          this.directionVent = "sud-ouest"
        } if (this.directionVent > 247.5 && this.directionVent <= 292.5) {
          this.directionVent = "ouest"
        } if (this.directionVent > 292.5 && this.directionVent <= 337.5) {
          this.directionVent = "nord-ouest"
        } if (this.directionVent < 337.5) {
          this.directionVent = "nord"
        }
        //error pas d'info sur les vitessRafalVent
        this.vitesseVentBoll = true
        if (this.vitessRafalVent == "NaN") {
          this.vitesseVentBoll = false
          this.vitessRafalVent = "l'information n'est pas disponible"

        }

        //remettre les valeurs a 0
        this.city = "";
        this.villeError = false;

      }, error => {
        //type d'erreur reçu
        this.AfficheError = error.error.message;
        this.loading = false;
        this.error()
      }
    )
  }
  error() {
    this.villeError = true;
    console.log(this.villeError)
  }
}
