import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class Weather {
  city!: string;
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  APIkey = 'c545eea8145b2d5716dd0c65680e5de9';
  URL = 'http://api.openweathermap.org/data/2.5/weather?q=';
  constructor(private http: HttpClient) {}


   getCurrentWeather(city: string) : Observable<any> {
    return this.http.get(this.URL + city + '&APPID=' + this.APIkey);
  }

}
