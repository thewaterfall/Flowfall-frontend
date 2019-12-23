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
import {BoardColumnService} from '../../services/board-column.service';
import {RowService} from '../../services/row.service';

enum FieldMode {
  EDIT = 'edit', VIEW = 'view'
}

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  boardId: string;
  currentBoard: Board = new Board();
  connectedList: string[] = [];

  nameFieldMode: FieldMode = FieldMode.VIEW;

  constructor(private route: ActivatedRoute, private router: Router, private dialog: MatDialog,
              private boardService: BoardService, private boardColumnService: BoardColumnService, private rowService: RowService) {
    this.route.params.subscribe(
      params => {
        this.boardId = params['id'];

        this.boardService.getBoardById(this.boardId).subscribe(
          data => {
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
        this.boardColumnService.addBoardColumn(new BoardColumn(data.name,
          this.currentBoard.boardColumns.length + 1,
          this.currentBoard.id)).subscribe(
          column => {
            this.currentBoard.boardColumns.push(column);
            this.connectedList.push(column.name);
          } ,
          error => console.log(error)
        );
      }
    });
  }

  addRow(column: BoardColumn) {
    const dialogRef = this.dialog.open(AddRowDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data !== undefined) {
        this.rowService.addRow(new Row(data.content, column.rows.length + 1, column.id)).subscribe(
          row => column.rows.push(row),
          error => console.log(error)
        );
      }
    });
  }

  deleteRow(column: BoardColumn, row: Row) {
    this.rowService.deleteRow(row.id).subscribe(
      data => {
        column.rows = column.rows.filter(colRow => colRow !== row);
      },
      error => console.log(error)
    );
  }

  deleteColumn(column: BoardColumn) {
    this.boardColumnService.deleteBoardColumn(column.id).subscribe(
      data => {
        this.currentBoard.boardColumns = this.currentBoard.boardColumns.filter(col => col !== column);
      },
      error => console.log(error)
    );
  }

  deleteBoard() {
    this.boardService.deleteBoard(this.currentBoard.id).subscribe(
      data => {
        this.router.navigate(['/boardspace']);
      },
      error => console.log(error)
    );
  }

  editBoardName(event) {
    let name = event.target.value;

    if(name !== this.currentBoard.name) {
      this.boardService.updateBoard(this.currentBoard).subscribe(data => {
        this.currentBoard.name = name;
      });
    }

    this.switchNameFieldMode();
  }

  switchNameFieldMode() {
    this.nameFieldMode = this.nameFieldMode === FieldMode.VIEW ? FieldMode.EDIT : FieldMode.VIEW;
  }

  showDeleteIcon(event) {
      event.target.getElementsByClassName('delete-icon')[0].style.visibility = 'visible';
  }

  hideDeleteIcon(event) {
    event.target.getElementsByClassName('delete-icon')[0].style.visibility = 'hidden';
  }
}
