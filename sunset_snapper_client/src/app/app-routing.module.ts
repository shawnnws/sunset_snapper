import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { UploadComponent } from './components/upload/upload.component';

const routes: Routes = [
  { path:"", component: HomeComponent },
  { path:"login", component: LoginComponent },
  { path: "upload", component: UploadComponent },
  
  { path:"**", redirectTo:"/", pathMatch: "full"}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
