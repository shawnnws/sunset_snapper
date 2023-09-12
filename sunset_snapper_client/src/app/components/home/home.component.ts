import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
}
