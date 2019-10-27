import { NgModule } from '@angular/core';
import {MatButtonModule, MatInputModule, MatToolbarModule} from '@angular/material';

let components = [
  MatToolbarModule,
  MatInputModule,
  MatButtonModule
];

@NgModule({
  declarations: [],
  imports: [
    components
  ],
  exports: [
    components
  ]
})
export class MaterialModule { }
