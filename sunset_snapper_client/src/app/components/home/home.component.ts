import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GLOBAL_USERNAME, setGlobalUsername, getGlobalUsername, resetGlobalUsername } from 'src/app/service/user.service';
import { MaterialModule } from 'src/app/material.module';

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

  constructor(private router: Router) {}

  getPhotos() {
    this.router.navigate(['/city', this.city]);
  }

  // get GLOBAL_USERNAME() {
  //   return getGlobalUsername()
  // }



  onPostButtonClick() {
    if (getGlobalUsername() === null) {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/upload', GLOBAL_USERNAME]);
    }
  }

  onLogout(): void {
    resetGlobalUsername();
  }
}
