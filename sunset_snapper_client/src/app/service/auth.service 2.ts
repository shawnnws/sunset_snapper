import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BACKEND_URL } from 'src/environment-variables';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedInUser!: User;
  isLoggedIn = false;

  constructor(private httpClient: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const body = { username, password };
    const url = `${BACKEND_URL}/login`;
    this.isLoggedIn = true;
    
    return this.httpClient.post(url, body);
    // ???: How to handle generated token from backend

  }

  logout(): void {
    this.loggedInUsername = null;
  }

  setLoggedInUser(user: User): void {
    this.loggedInUser = user;
  }

  getLoggedInUser(): User {
    return this.loggedInUser;
  }



  loggedInUsername: string | null = null

  setLoggedInUsername(username: string): void {
    this.loggedInUsername = username;
  }

  getLoggedInUsername(): string | null {
    return this.loggedInUsername;
  }

  getisLoggedIn(): boolean {
    return this.isLoggedIn;
  }
}
