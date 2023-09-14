// import { Injectable } from '@angular/core';
// import { User } from '../model/user';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { BACKEND_URL } from 'src/environment-variables';

// // set to null on logout
// // set to username (string) on login

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   constructor(private httpClient: HttpClient) { }

//   login(username: string): Observable<any> {
//     // const body = { username, password };
//     // const url = `${BACKEND_URL}/login`;
//     this.isLoggedIn = true;
    
//     // return Observable.create( (observer: any) =>  observer.complete());
//     // return this.httpClient.post(url, body);
//     // ???: How to handle generated token from backend

//   }

//   export function insertNewUser(httpClient: HttpClient, formData: FormData): Observable<any> {
//     const headers = new HttpHeaders()
//       .append('Accept', 'application/json');
//     const url = `${BACKEND_URL}/__createNewUser__`;
  
//     return httpClient.post(url, formData, { headers });
//     // check!
//   }

//   // logout(): void {
//   //   this.loggedInUsername = null;
//   // }

//   // setLoggedInUser(user: User): void {
//   //   this.loggedInUser = user;
//   // }

//   // getLoggedInUser(): User {
//   //   return this.loggedInUser;
//   // }



//   // loggedInUsername: string | null = null

//   // setLoggedInUsername(username: string): void {
//   //   this.loggedInUsername = username;
//   // }

//   // getLoggedInUsername(): string | null {
//   //   return this.loggedInUsername;
//   // }

//   // getisLoggedIn(): boolean {
//   //   return this.isLoggedIn;
//   // }
// }
