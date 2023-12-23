import { Injectable } from '@angular/core';
import { Weather } from '../states/weather-state/weather.model';
import { Forecast } from '../states/forecast-state/forecast.model';
import { LocationData } from '../states/location-state/location.model';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {

  saveCitiesData(query: string, data: LocationData[]): void {
    const existingData = this.getData('cities');
    if (existingData && existingData.length > 0) {
      const objectExists = existingData.some(
        (item: LocationData) => item.LocalizedName === query
      );
      if (!objectExists) {
        const mergedData = [...existingData, ...data];
        localStorage.setItem('cities', JSON.stringify(mergedData));
      }
    } else {
      localStorage.setItem('cities', JSON.stringify(data));
    }
  }

  getData(key: string): any {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : null;
  }

  clearData(key: string): void {
    localStorage.removeItem(key);
  }

  saveWeatherOrForecast(key: string, weatherdata: Weather | null, forecastData: Forecast | null): void {
    const existingData = this.getData(key);
    if (existingData) {
      if (weatherdata) {
        existingData.push({
          weatherData: weatherdata.weatherData,
          id: weatherdata.id
        });
      }
      if (forecastData) {
        existingData.push({
          forecastData: forecastData.forecastData,
          id: forecastData.id
        })
      }
      localStorage.setItem(key, JSON.stringify(existingData));
    }

    else {
      let data: any
      weatherdata ? data = weatherdata : data = forecastData
      localStorage.setItem(key, JSON.stringify([data]));
    }
  }
}
