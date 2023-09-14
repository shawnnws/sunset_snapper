import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule  } from '@angular/material/dialog';


const MATERIAL = [
  MatButtonModule,
  MatDialogModule,
  MatIconModule,
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MATERIAL,
  ],
  exports: [
    MATERIAL,
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hadBackdrop: false}}
  ]
})
export class MaterialModule { }
