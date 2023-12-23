export interface Forecast {
  id: string;
  forecastData: ForecastData
}

export interface ForecastData {
  DailyForecast: DailyForecast[];
  Headline: Headline;
}

export interface DailyForecast {
  Date: string;
  day: NightOrDay;
  EpochDate: number;
  Link: string;
  MobileLink: string;
  Night: NightOrDay;
  Sources: string[];
  Temperature: Temperature;
}

export interface NightOrDay {
  HasPrecipitation: boolean;
  Icon: number;
  IconPhrase: string
}

export interface Temperature {
  Maximum: TempValues;
  Minimum: TempValues
}

export interface TempValues {
  Unit: string;
  UnitType: number;
  Value: number;
}

export interface Headline {
  Category: string;
  EffectiveDate: string;
  EffectiveEpochDate: number;
  EndDate: Date;
  EndEpochDate: Date;
  Link: string;
  MobileLink: string;
  Severity: number;
  Text: string;
}



