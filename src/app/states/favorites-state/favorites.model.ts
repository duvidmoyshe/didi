import { LocationData } from "src/app/states/location-state/location.model";
import { WeatherData } from "src/app/states/weather-state/weather.model";

export interface Favorite {
  id: string;
  weatherData: WeatherData;
  favoriteName: string;
}
