import { NgModule } from '@angular/core';
import {MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatToolbarModule} from '@angular/material';
import {DragDropModule} from '@angular/cdk/drag-drop';

let components = [
  MatToolbarModule,
  MatInputModule,
  MatButtonModule,
  DragDropModule,
  MatDialogModule,
  MatButtonModule,
  MatInputModule,
  MatCardModule
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
