import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BACKEND_URL } from 'src/environment-variables';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // No use, can delete
}
