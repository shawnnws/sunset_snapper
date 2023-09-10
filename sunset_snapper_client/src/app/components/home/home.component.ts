import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  countries: string[] = [
    'Singapore', 'Tokyo', 'Seoul', 'Kuala Lumpur', 'Phuket', 'Bali'
  ]
}
