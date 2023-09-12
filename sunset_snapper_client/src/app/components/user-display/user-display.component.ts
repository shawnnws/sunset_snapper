import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Photo } from 'src/app/model/photo';
import { incrementLike, getPhotosByUser } from 'src/app/service/upload.service';

@Component({
  selector: 'app-user-display',
  templateUrl: './user-display.component.html',
  styleUrls: ['./user-display.component.css']
})
export class UserDisplayComponent implements OnInit {

  username!: string
  photoList: Photo[] = []

  constructor(private httpClient: HttpClient, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.username = this.activatedRoute.snapshot.params['username'];
    this.getUserPhotos();
  }

  getUserPhotos(): void {
    getPhotosByUser(this.httpClient, this.username).subscribe(
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
