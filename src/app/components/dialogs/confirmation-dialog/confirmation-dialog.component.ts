import {Component, Inject, OnInit} from '@angular/core';
import {Board} from '../../../models/Board';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {BoardColumn} from '../../../models/BoardColumn';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) {

  }

  ngOnInit() {
  }

  save() {
    this.dialogRef.close(true);
  }

  close() {
    this.dialogRef.close(false);
  }

}
