import {Component, Inject, OnInit} from '@angular/core';
import {Row} from '../../../models/Row';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {RowService} from '../../../services/row.service';

import {RowMessage} from '../../../models/RowMessage';
import {WebSocketRowMessage} from '../../../websocket/WebSocketRowMessage';
import {TokenStorageService} from '../../../auth/services/token-storage.service';
import {User} from '../../../models/User';
import {WebsocketService} from '../../../websocket/websocket.service';
import {RowMessageService} from '../../../services/row-message.service';
import {ConfirmationDialogComponent} from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-row-feed-dialog',
  templateUrl: './row-feed-dialog.component.html',
  styleUrls: ['./row-feed-dialog.component.scss']
})
export class RowFeedDialogComponent implements OnInit {

  row: Row = new Row();

  messages: RowMessage[] = [];

  constructor(public dialogRef: MatDialogRef<RowFeedDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: {row: Row, colId: number, boardId: number},
              private rowService: RowService, private tokenStorage: TokenStorageService,
              private websocketService: WebsocketService, private rowMessageService: RowMessageService,
              private dialog: MatDialog) {
    this.row = data.row;

    this.rowMessageService.getRowMessagesByRowId(this.data.boardId, this.data.colId, this.row.id).subscribe(
      rowMessages => this.messages = rowMessages
    );

    this.websocketService.initWebSocketConnection(this.row.id, (message) => {
      this.onWebSocketMessageReceived(message);
    });
  }

  ngOnInit() {
  }

  save() {
    this.dialogRef.close(this.row);
  }

  close() {
    this.dialogRef.close();
  }

  editRowName(value) {
    let oldName = this.row.name;

    if (value !== oldName) {
      this.row.name = value;

      this.rowService.updateRow(this.data.boardId, this.data.colId, this.row).subscribe(
        () => {},
        error => this.row.name = oldName
      );
    }
  }

  editRowContent(value) {
    let oldContent = this.row.content;

    if (value !== oldContent) {
      this.row.content = value;

      this.rowService.updateRow(this.data.boardId, this.data.colId, this.row).subscribe(
        () => {},
        error => this.row.content = oldContent
      );
    }
  }


  onWebSocketMessageReceived(message: WebSocketRowMessage) {
    if (message.type === 'SEND') {
      this.messages.unshift(message.message);
    } else if (message.type === 'DELETE') {
      this.messages = this.messages.filter(msg => msg.id !== message.message.id);
    }
  }

  addComment(messageInput) {
    // TODO: refactor URL
    this.websocketService.sendMessage(this.row.id, this.createWebSocketMessage(messageInput.value));
    messageInput.value = '';
  }

  deleteComment(message: RowMessage) {
    let confirmRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Are you sure you want to delete comment?'
    });

    confirmRef.afterClosed().subscribe(confirm => {
      if (confirm) {
        let comment = document.getElementById(String(message.id));

        comment.classList.add('animated', 'bounceOut', 'fast');
        comment.addEventListener('animationend', () => {
          // TODO: refactor URL
          this.websocketService.deleteMessage(this.row.id, new WebSocketRowMessage('DELETE', message));
          this.messages = this.messages.filter(msg => msg.id !== message.id);
        });
      }
    });
  }

  editComment(value, msg: RowMessage) {
    let oldComment = msg.text;

    if (value !== oldComment) {
      msg.text = value;

      this.rowMessageService.update(this.data.boardId, this.data.colId, this.row.id, msg).subscribe(
        () => {},
        error => msg.text = oldComment
      );
    }
  }

  createWebSocketMessage(message: string): WebSocketRowMessage {
    let rowMessage = new RowMessage();
    rowMessage.row = this.row;
    rowMessage.sender = new User(parseInt(this.tokenStorage.getId()));
    rowMessage.text = message;

    return new WebSocketRowMessage('SEND', rowMessage);
  }

  isCommentOwner(msg: RowMessage) {
    return msg.sender.id == this.tokenStorage.getId();
  }
}
