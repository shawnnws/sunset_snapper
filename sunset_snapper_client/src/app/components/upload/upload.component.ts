import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { uploadPhoto } from 'src/app/service/upload.service';
import { Observable, catchError, map, of } from 'rxjs';
import { GeoCodingResponse, CityCountry, geocode } from 'src/app/service/geocoding.service';
import { GOOGLE_MAPS_API_KEY } from 'src/environment-variables';
import { LoginService } from 'src/app/service/login.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  loggedInUsername: string | null = null
  country!: string
  city!: string

  myForm!: FormGroup;

  constructor(private fb: FormBuilder, private httpClient: HttpClient, private router: Router, private authService: AuthService) {
    this.apiLoaded = httpClient.jsonp(`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}`, 'callback')
        .pipe(
          map(() => true),
          catchError(() => of(false)),
        );

    this.loggedInUsername = this.authService.getLoggedInUsername();
  }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm() {
    this.myForm = this.fb.group({
      photo: ['', Validators.required],
      country: [''],
      city: [''],
      details: [null]
    })
  }

  invalidFormInput(controlName: string): boolean {
    const control = this.myForm.controls[controlName];
    return control.invalid && control.touched;
  }

  photoUpload(event: any) {
    const file = event.target.files[0];
    this.myForm.patchValue({ photo: file });
    this.myForm.get('photo')?.markAsTouched();
  }

  submitForm() {
    if (this.myForm.valid) {
      const formData = new FormData()
      formData.append('username', this.loggedInUsername || '');
      formData.append('photo', this.myForm.value.photo);
      formData.append('country', this.country);
      formData.append('city', this. city);
      formData.append('details', this.myForm.value.details);

      uploadPhoto(this.httpClient, formData).subscribe(
        (response) => {
          console.log('Form submitted successfully...', response);
          // alert(JSON.stringify(response))
          this.router.navigate(['/']);

        },
        (error) => {
          console.error('Error submitting form...', error);
          alert(JSON.stringify(error))
        }
      );
    } else {
      console.log('Form contains errors...');
    }

  }

  /* 
      Google Maps Integration
  */

  apiLoaded: Observable<boolean>;
  center: google.maps.LatLngLiteral = {"lat":1.3516282134874862,"lng":103.8280831140344}
  zoom = 11;
  markerOptions: google.maps.MarkerOptions = {draggable: true};
  markerPosition: google.maps.LatLngLiteral | null = null;
  stringMarkerPosition: string | null = null;
  geocodingResponse: GeoCodingResponse | null = null;
  stringGeocodingResponse: string | null = null;
  cityCountry: CityCountry | null = null;
  stringCityCountry: string | null = null;
  

  findCityCountry(response: GeoCodingResponse): CityCountry[] {
      /** Parse possible candidates for city and country */
      let allParsed: CityCountry[] = []
      for (let result of response.results) {
          let country: string = ""
          let city: string = ""
          for (let address_component of result.address_components) {
            let isCity: boolean = false
            let isCountry: boolean = false
            for (let currentType of address_component.types) {
                if (currentType === "country") {
                    isCountry = true
                } else if (currentType === "locality") {
                    isCity = true
                }
            }

            if (country === "" && isCountry) {
              country = address_component.long_name
            } else if (city === "" && isCity) {
              city = address_component.long_name
            }
            /**
             * We found all the city and country component of the current address. early terminate
             */
            if (city !== "" && country !== "") {
              break
            }
          }

          allParsed.push({
            city,
            country
          })
      }
      return allParsed
  }

  chooseCityCountry(candidates: CityCountry[]): CityCountry {
    let city = ""
    let country = ""
    for (let candidate of candidates) {
      if (city === "" && candidate.city !== "") {
        city = candidate.city
      }
      if (country === "" && candidate.country !== "") {
        country = candidate.country
      }
      /**
       * We found all the city and country component from the candidates for the current marker. early terminate
       */
      if (city !== "" && country !== "") {
        break
      }
    }
    return {
      city,
      country
    }
  }

  updateMarker(event: google.maps.MapMouseEvent) {
    if (event !== null && event.latLng !== null) {
      this.markerPosition = event.latLng.toJSON();
      this.stringMarkerPosition = JSON.stringify(event.latLng.toJSON());
      geocode(this.httpClient, GOOGLE_MAPS_API_KEY, this.markerPosition).subscribe(
        (result) => {
          this.geocodingResponse = result;
          this.stringGeocodingResponse = JSON.stringify(result);
          this.cityCountry = this.chooseCityCountry(this.findCityCountry(result));
          this.stringCityCountry = JSON.stringify(this.cityCountry);
          // Extract country and city
          this.country = this.cityCountry.country
          this.city = this.cityCountry.city
        },
        (error) => {
          console.error("Geocoding error:", error);
        }
      );
    }
  }
}
