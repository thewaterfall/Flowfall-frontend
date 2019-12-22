import {Component, Inject, OnInit} from '@angular/core';
import {Row} from '../../../models/Row';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-add-row-dialog',
  templateUrl: './add-row-dialog.component.html',
  styleUrls: ['./add-row-dialog.component.scss']
})
export class AddRowDialogComponent implements OnInit {
  row: Row = new Row();

  constructor(
    public dialogRef: MatDialogRef<AddRowDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Row) {}

  ngOnInit() {
  }

  save() {
    this.dialogRef.close(this.row);
  }

  close() {
    this.dialogRef.close();
  }

}
