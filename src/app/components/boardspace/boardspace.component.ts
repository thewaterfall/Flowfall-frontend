import { Component, OnInit } from '@angular/core';
import {BoardService} from '../../services/board.service';
import {TokenStorageService} from '../../auth/services/token-storage.service';
import {Board} from '../../models/Board';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-boardspace',
  templateUrl: './boardspace.component.html',
  styleUrls: ['./boardspace.component.scss']
})
export class BoardspaceComponent implements OnInit {

  boards: Board[] = [];

  constructor(private boardService: BoardService, private tokenStorage: TokenStorageService,
              private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.boardService.getBoardsByUserId(this.tokenStorage.getId()).subscribe(
      data => {
        console.log(data);
        this.boards = data;
      },
      error => console.log(error)
    );
  }

  navigateToBoard(board: Board) {
    this.router.navigate([`/b`, board.id]);
  }

}
