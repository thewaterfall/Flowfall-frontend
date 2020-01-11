import {Component, OnInit} from '@angular/core';
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
import {User} from '../../models/User';
import {UserService} from '../../services/user.service';
import {MenuDialogComponent} from '../dialogs/menu-dialog/menu-dialog.component';
import {TokenStorageService} from '../../auth/services/token-storage.service';
import {RowFeedDialogComponent} from "../dialogs/row-feed-dialog/row-feed-dialog.component";

enum FieldMode {
  EDIT = 'edit', VIEW = 'view'
}

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  isOwner: boolean = false;

  boardId: string;
  currentBoard: Board = new Board();
  connectedList: string[] = [];
  collaborators: User[] = [];

  nameFieldMode: FieldMode = FieldMode.VIEW;

  isMouseDown = false;
  clickX;
  clickScrollLeft;

  menuRef;
  isMenuOpened = false;

  constructor(private route: ActivatedRoute, private router: Router, private dialog: MatDialog,
              private boardService: BoardService, private boardColumnService: BoardColumnService, private rowService: RowService,
              private userService: UserService, private tokenStorage: TokenStorageService) {
    this.route.params.subscribe(
      params => {
        this.boardId = params['id'];

        this.boardService.getBoardById(this.boardId).subscribe(
          data => {
            this.currentBoard = data;
            this.fillConnectedList(data.boardColumns);

            this.userService.getCollaboratorsByBoardId(this.currentBoard.id).subscribe(
              collabs => this.collaborators = collabs,
              error => console.log(error)
            );

            this.userService.getOwnerByBoardId(this.currentBoard.id).subscribe(
              owner => this.isOwner = owner.id.toString() === tokenStorage.getId()
            )
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
        this.rowService.addRow(new Row(data.name, column.rows.length + 1, column.id)).subscribe(
          row => column.rows.push(row),
          error => console.log(error)
        );
      }
    });
  }

  openMenu() {
    if (this.menuRef !== undefined && this.isMenuOpened === true) {
      this.menuRef.close();
    } else {
      this.menuRef = this.dialog.open(MenuDialogComponent, {
        data: this.currentBoard.id,
        disableClose: true,
        hasBackdrop: false,
        width: '400px',
        height: '80vh',
        position: {
          top: '100px',
          right: '20px'
        },
      });

      this.menuRef.afterOpened().subscribe(() => this.isMenuOpened = true);
      this.menuRef.afterClosed().subscribe(() => this.isMenuOpened = false);
    }
  }

  openRowFeed(row: Row) {
    let dialogRef = this.dialog.open(RowFeedDialogComponent, {
      data: row,
      width: '50vw',
      height: '90vh'
    })
  }

  deleteRow(column: BoardColumn, row: Row) {
    this.rowService.deleteRow(row.id).subscribe(
      () => column.rows = column.rows.filter(colRow => colRow !== row),
      error => console.log(error)
    );
  }

  deleteColumn(column: BoardColumn) {
    this.boardColumnService.deleteBoardColumn(column.id).subscribe(
      () => this.currentBoard.boardColumns = this.currentBoard.boardColumns.filter(col => col !== column),
      error => console.log(error)
    );
  }

  deleteBoard() {
    this.boardService.deleteBoard(this.currentBoard.id).subscribe(
      () => this.router.navigate(['/boardspace']),
      error => console.log(error)
    );
  }

  editBoardName(event) {
    let name = event.target.value;

    if (name !== this.currentBoard.name) {

     this.boardService.updateBoard(new Board(this.currentBoard.id, name)).subscribe(
        data => this.currentBoard.name = name,
        error => console.log(error)
      );
    }

    this.switchNameFieldMode();
  }

  switchNameFieldMode() {
    if (this.nameFieldMode === FieldMode.VIEW) {
      this.nameFieldMode = FieldMode.EDIT;

      setTimeout(f => {
        let boardnameInput = document.getElementById('boardnameInput');
        boardnameInput.focus();
        // @ts-ignore
        boardnameInput.select();
      }, 100);
    } else {
      this.nameFieldMode = FieldMode.VIEW;
    }
  }

  showDeleteIcon(event) {
    event.target.getElementsByClassName('delete-icon')[0].style.visibility = 'visible';
  }

  hideDeleteIcon(event) {
    event.target.getElementsByClassName('delete-icon')[0].style.visibility = 'hidden';
  }

  inviteCollab(event) {
    let collabEmail = event.value;
    this.boardService.inviteCollaborator(this.currentBoard.id, collabEmail).subscribe(
      data => console.log('Invited'),
      error => console.log('Could not invite')
    );

  }

  scrollBoardContent(event) {
    let element = event.target;
    element.scrollLeft = this.clickScrollLeft + (this.clickX - event.pageX);
  }

  mouseDown(event) {
    this.isMouseDown = true;
    this.clickX = event.pageX;
    this.clickScrollLeft = event.target.scrollLeft;
  }

  mouseUp() {
    this.isMouseDown = false;
  }
}
