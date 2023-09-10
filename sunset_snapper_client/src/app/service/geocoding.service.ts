import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs"


export interface Location {
  city: string
  country: string 
}

export interface CityCountry {
  // locality from GeoCodingAddressComponent.types
  city: string 
  // country from GeoCodingAddressComponent.types
  country: string 
}

export interface GeoCodingResponse {
  plus_code: PlusCode
  results: GeoCodingSingleResult[]
  status: string
}

export interface PlusCode {
  compound_code: string 
  global_code: string 
}

export interface GeoCodingSingleResult {
  address_components: GeoCodingAddressComponent[]
  formatted_address: string
  geometry: Geometry
  place_id: string 
  plus_code: PlusCode
  types: string[] 
}

export interface Geometry {
  bounds: Bounds 
  location: LatLngCoordinate 
  location_type: string 
  viewport: Bounds
}

export interface Bounds {
  northeast: LatLngCoordinate
  southwest: LatLngCoordinate
}

export interface LatLngCoordinate {
  lat: number 
  lng: number 
}

export interface GeoCodingAddressComponent {
  long_name: string 
  short_name: string 
  types: string[] 
}

export function geocode(httpClient: HttpClient, apiKey: string, latLng: google.maps.LatLngLiteral): Observable<GeoCodingResponse> {
  let url: string = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latLng.lat},${latLng.lng}&key=${apiKey}`;
  return httpClient.get<GeoCodingResponse>(url);
}