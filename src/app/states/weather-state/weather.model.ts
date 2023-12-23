export interface Weather {
  id: string
  weatherData: WeatherData;
}
export interface WeatherData {
  EpochTime: number;
  HasPrecipitation: boolean;
  IsDayTime: boolean;
  Link: string;
  LocalObservationDateTime: string;
  MobileLink: string;
  PrecipitationType: string;
  Temperature: Temprature;
  WeatherIcon: number;
  WeatherText: string
}

export interface Temprature {
  Metric: MetricOrImperial;
  Imperial: MetricOrImperial
}

export interface MetricOrImperial {
  Value: number;
  Unit: string;
  UnitType: number
}
