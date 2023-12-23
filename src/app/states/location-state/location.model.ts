export interface Location {
  id: string;
  locationData: LocationData
}
export interface LocationData {
  administrativeArea: AdministrativeAreaOrCountry;
  country: AdministrativeAreaOrCountry;
  Key: string
  LocalizedName: string;
  Rank: number
  Type: string
  Version: number
}
export interface AdministrativeAreaOrCountry {
  ID: string;
  LocalizedName: string
}
