import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Row} from '../../../models/Row';
import {BoardColumn} from '../../../models/BoardColumn';

@Component({
  selector: 'app-add-column-dialog',
  templateUrl: './add-column-dialog.component.html',
  styleUrls: ['./add-column-dialog.component.scss']
})
export class AddColumnDialogComponent implements OnInit {

  column: BoardColumn = new BoardColumn();

  constructor(
    public dialogRef: MatDialogRef<AddColumnDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BoardColumn) {}

  ngOnInit() {
  }

  save() {
    this.dialogRef.close(this.column);
  }

  close() {
    this.dialogRef.close();
  }

}
