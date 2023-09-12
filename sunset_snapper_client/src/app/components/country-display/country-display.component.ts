import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Photo } from 'src/app/model/photo';
import { getPhotosByCity, incrementLike } from 'src/app/service/upload.service';

@Component({
  selector: 'app-country-display',
  templateUrl: './country-display.component.html',
  styleUrls: ['./country-display.component.css']
})
export class CountryDisplayComponent implements OnInit {

  constructor(private httpClient: HttpClient, private activatedRoute: ActivatedRoute) {}

  // @Input() country?: string
  // @Input() city!: string
  city!: string
  photoList: Photo[] = []

  ngOnInit(): void {
    this.city = this.activatedRoute.snapshot.params['city'];
    this.getCityPhotos();
  }

  getCityPhotos(): void {
    getPhotosByCity(this.httpClient, this.city).subscribe(
      (response) => {
        this.photoList = response;
      },
      (error) => {
        console.error('Error fetching photo list...', error);
      }
    );
  }

  onLikeClick(photoId: number): void {
    console.log('Photo to increment like: ' + photoId)
    incrementLike(this.httpClient, photoId).subscribe(
      (response) => {
        console.log('Incremented like: ' + response);
      },
      (error) => {
        console.error('Error incrementing like...', error);
      }
    )
  }
}
