import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {BoardColumn} from "../../../models/BoardColumn";
import {Board} from "../../../models/Board";

@Component({
  selector: 'app-add-board-dialog',
  templateUrl: './add-board-dialog.component.html',
  styleUrls: ['./add-board-dialog.component.scss']
})
export class AddBoardDialogComponent implements OnInit {

  board = new Board();

  constructor(
    public dialogRef: MatDialogRef<AddBoardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BoardColumn) {}

  ngOnInit() {
  }

  save() {
    this.dialogRef.close(this.board);
  }

  close() {
    this.dialogRef.close();
  }
}
