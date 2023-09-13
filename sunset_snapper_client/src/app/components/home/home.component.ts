import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  cities: string[] = [
    'Singapore', 'Johor Bahru', 'Seoul', 'Kuala Lumpur', 'Phuket', 'Batam', 'Taipei', 'Ho Chi Minh City'
  ]
  city: string = ''

  loggedInUsername: string | null;


  constructor(private router: Router, private authService: AuthService) {
    this.loggedInUsername = this.authService.getLoggedInUsername();
  }

  getPhotos() {
    this.router.navigate(['/city', this.city]);
  }

  get isLoggedIn(): boolean {
    return this.authService.getisLoggedIn();
  }

  logout(): void {
    this.authService.logout();
  }
}
