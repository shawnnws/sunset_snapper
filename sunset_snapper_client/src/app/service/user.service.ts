import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { BACKEND_URL } from "src/environment-variables";


export let GLOBAL_USERNAME: string | null = null


export function createNewUser(httpClient: HttpClient, username: string): Observable<any> {
  const headers = new HttpHeaders()
    .append('Accept', 'application/json');
  const url = `${BACKEND_URL}/createUser/${username}`;

  return httpClient.post(url, username, { headers });
  // check!
}

export function checkIfUserExists(httpClient: HttpClient, username: string): Observable<any> {
  const headers = new HttpHeaders()
    .append('Accept', 'application/json');
  const url = `${BACKEND_URL}/checkUser/${username}`;

  return httpClient.get(url, { headers });
}

export function getGlobalUsername() {
  return GLOBAL_USERNAME;
}

export function setGlobalUsername(username: string) {
  GLOBAL_USERNAME = username;
}

export function resetGlobalUsername() {
  GLOBAL_USERNAME = null;
}