import { Component, OnInit } from '@angular/core';
import {BoardService} from '../../services/board.service';
import {TokenStorageService} from '../../auth/services/token-storage.service';
import {Board} from '../../models/Board';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from "@angular/material";
import {AddBoardDialogComponent} from "../dialogs/add-board-dialog/add-board-dialog.component";
import {User} from "../../models/User";

@Component({
  selector: 'app-boardspace',
  templateUrl: './boardspace.component.html',
  styleUrls: ['./boardspace.component.scss']
})
export class BoardspaceComponent implements OnInit {

  boards: Board[] = [];
  collabBoards: Board[] = [];

  constructor(private boardService: BoardService, private tokenStorage: TokenStorageService,
              private router: Router, private activatedRoute: ActivatedRoute, private dialog: MatDialog) { }

  ngOnInit() {
    this.boardService.getBoards().subscribe(
      data => {
        this.boards = data;
      },
      error => console.log(error)
    );

    this.boardService.getCollaborativeBoards().subscribe(
      data => {
        this.collabBoards = data;
      },
      error => console.log(error)
    );
  }

  navigateToBoard(board: Board) {
    this.router.navigate([`/b`, board.id]);
  }

  addBoard() {
    let dialogRef = this.dialog.open(AddBoardDialogComponent,{
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data !== undefined) {
        data.user = new User(parseInt(this.tokenStorage.getId()));

        this.boardService.addBoard(data).subscribe(board => {
          this.boards.push(board);
          this.router.navigate(['/b', board.id]);
        });
      }
    });
  }

}
