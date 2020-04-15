import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {User} from '../../../models/User';
import {UserService} from '../../../services/user.service';
import {BoardService} from '../../../services/board.service';
import {TokenStorageService} from '../../../auth/services/token-storage.service';
import {CollaboratorService} from '../../../services/collaborator.service';

@Component({
  selector: 'app-menu-dialog',
  templateUrl: './menu-dialog.component.html',
  styleUrls: ['./menu-dialog.component.scss']
})
export class MenuDialogComponent implements OnInit {

  collaborators: User[] = [];
  owner: User = new User();

  constructor(
    public dialogRef: MatDialogRef<MenuDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public boardId: number, private tokenStorage: TokenStorageService,
    private userService: UserService, private boardService: BoardService, private collaboratorService: CollaboratorService) {

    this.collaboratorService.getCollaboratorsByBoardId(boardId).subscribe(
      data => this.collaborators = data,
      error => console.log(error)
    );

    this.collaboratorService.getOwnerByBoardId(boardId).subscribe(
      data => this.owner = data,
      error => console.log(error)
    );

  }

  ngOnInit() {
  }

  save() {
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }

  deleteCollaborator(id: number) {
    this.collaboratorService.deleteCollaborator(id, this.boardId).subscribe(
      () => this.collaborators = this.collaborators.filter(collab => collab.id !== id)
    );
  }
}
