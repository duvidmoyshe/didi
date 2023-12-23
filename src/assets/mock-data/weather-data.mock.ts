import { WeatherData } from "src/app/states/weather-state/weather.model";

export const weatherData: WeatherData[] = [
  {
  EpochTime: 1,
  HasPrecipitation: true,
  IsDayTime: true,
  Link: '',
  LocalObservationDateTime: '',
  MobileLink: '',
  PrecipitationType: '',
  Temperature: {
    Metric: {
      Value: 10,
      Unit: 'F',
      UnitType: 1
    },
    Imperial: {
      Value: 20,
      Unit: 'C',
      UnitType: 30
    },
  },
  WeatherIcon: 22,
  WeatherText: 'text'
},
{
  EpochTime: 1,
  HasPrecipitation: true,
  IsDayTime: true,
  Link: '',
  LocalObservationDateTime: '',
  MobileLink: '',
  PrecipitationType: '',
  Temperature: {
  Metric: {
    Value: 50,
    Unit: 'F',
    UnitType: 1
  },
  Imperial: {
    Value: 100,
    Unit: 'C',
    UnitType: 30
  },
},
  WeatherIcon: 22,
  WeatherText: 'text'
}
]
