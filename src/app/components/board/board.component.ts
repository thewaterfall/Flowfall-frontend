import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Board} from '../../models/Board';
import {BoardService} from '../../services/board.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {BoardColumn} from '../../models/BoardColumn';
import {Row} from '../../models/Row';
import {MatDialog} from '@angular/material';
import {AddRowDialogComponent} from '../dialogs/add-row-dialog/add-row-dialog.component';
import {AddColumnDialogComponent} from '../dialogs/add-column-dialog/add-column-dialog.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  boardId: string;
  currentBoard: Board = new Board();
  connectedList: string[] = [];

  constructor(private route: ActivatedRoute, private boardService: BoardService, private dialog: MatDialog) {
    this.route.params.subscribe(
      params => {
        this.boardId = params['id'];

        this.boardService.getBoardById(this.boardId).subscribe(
          data => {
            console.log(data);
            this.currentBoard = data;
            this.fillConnectedList(data.boardColumns);
          },
          error => console.log(error)
        );
      }
    );
  }

  ngOnInit() {
  }

  dropRow(event: CdkDragDrop<Row[]>) {
    if (event.previousContainer === event.container) {
      if (event.previousIndex === event.currentIndex)
        return;

      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }

    this.recalculateIndices(this.currentBoard);
    this.boardService.updateBoard(this.currentBoard).subscribe();
  }

  dropColumn(event: CdkDragDrop<BoardColumn[]>) {
    if (event.previousIndex === event.currentIndex)
      return;

    moveItemInArray(this.currentBoard.boardColumns, event.previousIndex, event.currentIndex);

    this.recalculateIndices(this.currentBoard);
    this.boardService.updateBoard(this.currentBoard).subscribe();
  }

  fillConnectedList(columns: BoardColumn[]) {
    columns.forEach(data => {
      this.connectedList.push(data.name);
    });
  }

  recalculateIndices(board: Board) {
    for (let i = 0; i < board.boardColumns.length; i++) {
      board.boardColumns[i].index = i + 1;
      for (let j = 0; j < board.boardColumns[i].rows.length; j++) {
        board.boardColumns[i].rows[j].index = j + 1;
      }
    }
  }

  addColumn() {
    const dialogRef = this.dialog.open(AddColumnDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data !== undefined) {
        this.currentBoard.boardColumns.push(data);
        this.recalculateIndices(this.currentBoard);
        this.boardService.updateBoard(this.currentBoard).subscribe();
      }
    });
  }

  addRow(column: BoardColumn) {
    const dialogRef = this.dialog.open(AddRowDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data !== undefined) {
        column.rows.push(data);
        this.recalculateIndices(this.currentBoard);
        this.boardService.updateBoard(this.currentBoard).subscribe();
      }
    });
  }

  // TODO: implement
  deleteRow(column: BoardColumn, row: Row) {
    column.rows = column.rows.filter(colRow => colRow !== row);
  }

}
