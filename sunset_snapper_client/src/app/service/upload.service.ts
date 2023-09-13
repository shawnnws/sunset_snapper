import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { BACKEND_URL } from "src/environment-variables";
import { Photo } from "../model/photo";


export function uploadPhoto(httpClient: HttpClient, formData: FormData): Observable<any> {
  const headers = new HttpHeaders()
    .append("Access-Control-Allow-Origin", "http://localhost:8080")
  const url = `${BACKEND_URL}/uploadPhoto`;

  alert(`uploadPhoto called for POST - ${url}`)
  return httpClient.post(url, formData, { headers });
}

// export function uploadPhotoSQL(httpClient: HttpClient, formData: FormData): Observable<any> {
//   const headers = new HttpHeaders()
//     .append('Accept', 'application/json');
//   const url = `${BACKEND_URL}/_____________`;

//   return httpClient.post(url, formData, { headers });
//   // returns boolean like our backend function?
// }

export function incrementLike(httpClient: HttpClient, photoId: number): Observable<any> {
  const headers = new HttpHeaders()
    .append('Accept', 'application/json');
  const url = `${BACKEND_URL}/incrementLike/${photoId}`;

  return httpClient.post(url, photoId, { headers });
  // check!
  // put method correct since we are doing an update?
}

export function getPhotosByCountryCity(httpClient: HttpClient, country: string, city: string): Observable<Photo[]> {
  const headers = new HttpHeaders()
    .append('Accept', 'application/json');
  const url = `${BACKEND_URL}/____________/country=${country}&city=${city}`;

  return httpClient.get<Photo[]>(url, { headers });
  // check!
}

export function getPhotosByCity(httpClient: HttpClient, city: string): Observable<Photo[]> {
  const headers = new HttpHeaders()
    .append('Accept', 'application/json');
  const url = `${BACKEND_URL}/city/${city}`;

  return httpClient.get<Photo[]>(url, { headers });
}

export function insertNewUser(httpClient: HttpClient, formData: FormData): Observable<any> {
  const headers = new HttpHeaders()
    .append('Accept', 'application/json');
  const url = `${BACKEND_URL}/__createNewUser__`;

  return httpClient.post(url, formData, { headers });
  // check!
}

export function getPhotosByUser(httpClient: HttpClient, username: string): Observable<Photo[]> {
  const headers = new HttpHeaders()
    .append('Accept', 'application/json');
  const url = `${BACKEND_URL}/username/${username}`;

  return httpClient.get<Photo[]>(url, { headers });
  // check!
}


