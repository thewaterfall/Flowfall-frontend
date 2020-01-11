import {Component, Inject, OnInit} from '@angular/core';
import {Row} from "../../../models/Row";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {RowService} from "../../../services/row.service";
import {Board} from "../../../models/Board";

enum FieldMode {
  EDIT = 'edit', VIEW = 'view'
}

@Component({
  selector: 'app-row-feed-dialog',
  templateUrl: './row-feed-dialog.component.html',
  styleUrls: ['./row-feed-dialog.component.scss']
})
export class RowFeedDialogComponent implements OnInit {

  row: Row = new Row();
  nameFieldMode = FieldMode.VIEW;
  contentFieldMode = FieldMode.VIEW;

  constructor(public dialogRef: MatDialogRef<RowFeedDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Row,
              private rowService: RowService) {
    this.row = data;
  }

  ngOnInit() {
  }

  save() {
    this.dialogRef.close(this.row);
  }

  close() {
    this.dialogRef.close();
  }

  switchNameFieldMode() {
    if (this.nameFieldMode === FieldMode.VIEW) {
      this.nameFieldMode = FieldMode.EDIT;

      setTimeout(f => {
        let rowNameInput = document.getElementById('rowNameInput');
        rowNameInput.focus();
        // @ts-ignore
        rowNameInput.select();
      }, 100);
    } else {
      this.nameFieldMode = FieldMode.VIEW;
    }
  }

  editRowName(event) {
    let name = event.target.value;
    let oldName = this.row.name;

    if (name !== oldName) {
      this.row.name = name;

      this.rowService.updateRow(this.row).subscribe(
        () => {},
        error => this.row.name = oldName
      );
    }

    this.switchNameFieldMode();
  }

  switchContentFieldMode() {
    if (this.contentFieldMode === FieldMode.VIEW) {
      this.contentFieldMode = FieldMode.EDIT;

      setTimeout(f => {
        let rowContentInput = document.getElementById('rowContentInput');
        rowContentInput.focus();
        // @ts-ignore
        rowContentInput.select();
      }, 100);
    } else {
      this.contentFieldMode = FieldMode.VIEW;
    }
  }

  editRowContent(event) {
    let content = event.target.value;
    let oldContent = this.row.content;

    if (content !== oldContent) {
      this.row.content = content;

      this.rowService.updateRow(this.row).subscribe(
        () => {},
        error => this.row.content = oldContent
      );
    }

    this.switchContentFieldMode();
  }


}
