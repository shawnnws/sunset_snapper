import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { BACKEND_URL } from "src/environment-variables";
import { Photo } from "../model/photo";

export function uploadPhotoS3(httpClient: HttpClient, formData: FormData): Observable<any> {
  const headers = new HttpHeaders()
    .append('Accept', 'application/json');
  const url = `${BACKEND_URL}/uploadPhotoS3`;

  return httpClient.post(url, formData, { headers });
}

export function uploadPhotoSQL(httpClient: HttpClient, formData: FormData): Observable<any> {
  const headers = new HttpHeaders()
    .append('Accept', 'application/json');
  const url = `${BACKEND_URL}/_____________`;

  return httpClient.post(url, formData, { headers });
  // returns boolean like our backend function?
}

export function incrementLike(httpClient: HttpClient, photoUrl: string): Observable<any> {
  const headers = new HttpHeaders()
    .append('Accept', 'application/json');
  const url = `${BACKEND_URL}/_____________/${photoUrl}`;

  return httpClient.put(url, photoUrl, { headers });
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
  const url = `${BACKEND_URL}/____________/username=${username}`;

  return httpClient.get<Photo[]>(url, { headers });
  // check!
}


