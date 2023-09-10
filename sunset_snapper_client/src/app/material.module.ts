import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';


const MATERIAL = [
  MatButtonModule,

]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MATERIAL,
  ],
  exports: [
    MATERIAL,
  ]
})
export class MaterialModule { }
