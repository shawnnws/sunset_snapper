import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.createForm();
  }

  private createForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  invalidFormInput(controlName: string): boolean {
    const control = this.loginForm.controls[controlName];
    return control.invalid && control.touched;
  }

  onLogin(): void {
    const { username, password } = this.loginForm.value;

    this.authService.login(username, password).subscribe(
      (response) => {
        const user = response as User;
        this.authService.setLoggedInUser(user);
        this.authService.setLoggedInUsername(user.username);

        // Putting isLoggedIn = true here instead of service because I only want it to be true if login is successful.
        // Suggestion to put it in service means upon execution it will be set to true regardless login is successful or not.
        
        this.router.navigate(['/']);
      },
      (error) => {
        console.error('Login failed:', error);
      }
    )
  }
}
