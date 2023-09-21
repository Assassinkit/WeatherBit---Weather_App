import { HttpClient } from '@angular/common/http';
import {
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';


@Component({
  selector: 'app-kylient-weather-widget',
  templateUrl: './kylient-weather-widget.component.html',
  styleUrls: ['./kylient-weather-widget.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class KylientWeatherWidgetComponent implements OnInit {

  // For Storing current Weather Data.
  currentWeatherData: any;
  // For Storing Forecast Weather Data.
  forecastData: any;

  constructor(
    private http: HttpClient,
    ) {}

  ngOnInit(): void {
    // Call the methods to fetch weather data inn the UI
    this.fetchWeatherData();
  }

  // Get BOTH Current and Forecasted Data
  fetchWeatherData() {
    // Get user's geolocation
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        // Call the methods to fetch weather data based on geolocation
        this.getCurrentWeather(lat, lon);
        this.get7DayForecast(lat, lon);
      });
    } else {
      // Handle the case where geolocation is not available
      console.log('Geolocation is not available.');
    }
  }

  // To Get Current Weather wrt Geolocation
  getCurrentWeather(lat: number, lon: number) {
    const currentWeatherUrl = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key="PASTE YOUR OWN KEY WITHOUT QUOTES"&include=minutely`;

    this.http.get(currentWeatherUrl).subscribe((data) => {
      // Fetching only current weather data w.r.t lattitude and Longitude
      this.currentWeatherData = data;
    });
  }

  // Define a method to fetch 7-day forecast data based on geolocation
  get7DayForecast(lat: number, lon: number) {
    const forecastUrl = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key="PASTE YOUR OWN KEY WITHOUT QUOTES"`;

    this.http.get(forecastUrl).subscribe((data) => {
      // Fetching For 7 days Forecast Data
      this.forecastData = data;
    });
  }

  getWeatherIconUrl(weatherData: any): string {
    if (weatherData && weatherData.data && weatherData.data.length > 0) {
      const weather = weatherData.data[0].weather;
      // If Icon is not there then we have to show the Default Icon
      const iconCode = weather && weather.icon ? weather.icon : 'default-icon';

      // For mapping the Icon wrt Current Weather Data
      const iconMappings: Record<string, string> = {
        'c01d': '../assets/animation-ready/clear-day.svg',// Clear Day
        'c02d': '../assets/animation-ready/partly-cloudy-day.svg',// Few Clouds, Scattered clouds
        'c03d': '../assets/animation-ready/partly-cloudy-day-rain.svg',// Broken Clouds
        'c04d': '../assets/animation-ready/cloudy.svg',// Overcast Clouds
        'c04n': '../assets/animation-ready/partly-cloudy-night.svg',// Cloudy
        't02d': '../assets/animation-ready/thunderstorms.svg',//Thunderstorm with rain
        't03d': '../assets/animation-ready/thunderstorms.svg',//Thunderstorm with heavy rain
        'r01d': '../assets/animation-ready/rain.svg',//Light Rain
        'r02d': '../assets/animation-ready/rain.svg',//Moderate Rain
        'r03d': '../assets/animation-ready/rain.svg',//Heavy Rain
        'default-icon': '../assets/animation-ready/cloudy.svg', // Default Icon as per the season
      };

      // If Icon is not there then we have to show the Default Icon
      const iconUrl =  iconMappings[iconCode] || iconMappings['default-icon'];
      console.log('Icon URL:', iconUrl);

      return iconUrl;
    }

    // Default icon URL in case of missing data
    return '../assets/default-icon.svg';
  }


  getWeatherIconUrlForDay(day: any): string {
    const iconCode = day.weather && day.weather.icon ? day.weather.icon : 'default-icon';

    // For mapping the Icon wrt Forecasted Data
    const iconMappings: Record<string, string> = {
      'c01d': '../assets/animation-ready/clear-day.svg',// Clear Day
      'c02d': '../assets/animation-ready/partly-cloudy-day.svg',// Few Clouds, Scattered clouds
      'c03d': '../assets/animation-ready/partly-cloudy-day-rain.svg',// Broken Clouds
      'c04d': '../assets/animation-ready/cloudy.svg',// Overcast Clouds
      'c04n': '../assets/animation-ready/partly-cloudy-night.svg',// Cloudy
      't02d': '../assets/animation-ready/thunderstorms.svg',//Thunderstorm with rain
      't03d': '../assets/animation-ready/thunderstorms.svg',//Thunderstorm with heavy rain
      'r01d': '../assets/animation-ready/rain.svg',//Light Rain
      'r02d': '../assets/animation-ready/rain.svg',//Moderate Rain
      'r03d': '../assets/animation-ready/rain.svg',//Heavy Rain
      'default-icon': '../assets/animation-ready/cloudy.svg', // Default Icon as per the season
    };

    return iconMappings[iconCode] || iconMappings['default-icon'];
  }

}


