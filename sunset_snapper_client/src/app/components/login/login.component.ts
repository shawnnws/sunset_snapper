import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { setGlobalUsername , getGlobalUsername, createNewUser, checkIfUserExists, GLOBAL_USERNAME} from 'src/app/service/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  username!: string

  constructor(private fb: FormBuilder, private httpClient: HttpClient, private router: Router, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.createForm();
  }

  private createForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required]
    })
  }

  invalidFormInput(controlName: string): boolean {
    const control = this.loginForm.controls[controlName];
    return control.invalid && control.touched;
  }

  onLogin(): void {
    // const { username } = this.loginForm.value;
    checkIfUserExists(this.httpClient, this.username).subscribe((result) => {
      if (result === true) {
        // Username exists, set GLOBAL_USERNAME and navigate to homepage.
        setGlobalUsername(this.username);
        this.router.navigate(['/upload', GLOBAL_USERNAME]);
      } else {
        // Username does not exist, open a pop-up dialog.
        this.openConfirmationDialog();
      }
    });
  }

  openConfirmationDialog() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {getGlobalUsername},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'yes') {
        // User clicked "Yes", create username and proceed.
        createNewUser(this.httpClient, this.username).subscribe(() => {
          setGlobalUsername(this.username);
          this.router.navigate(['/']);
        })
      }
    })
  }


    /**
     * On the backend, don't do jwt
     * on signup, save the usernane and password into the users table
     * 
     * over here, on login,
     * send the username and password to the backend
     * backend will query user table
     * 
     * SELECT username, password FROM table WHERE username = 'username' AND password = 'password';
     * 
     * If the query returns Nothing, not authenticated
     * If the query returns a row, returns authenticated
     * 
     * After authentication, set the global username to the user
     */

    // this.authService.login(username, password).subscribe(
    //   (response) => {
    //     const user = response as User;
    //     this.authService.setLoggedInUser(user);
    //     this.authService.setLoggedInUsername(user.username);

    //     // Putting isLoggedIn = true here instead of service because I only want it to be true if login is successful.
    //     // Suggestion to put it in service means upon execution it will be set to true regardless login is successful or not.
        
    //     this.router.navigate(['/']);
    //   },
    //   (error) => {
    //     console.error('Login failed:', error);
    //   }
    // )

}
