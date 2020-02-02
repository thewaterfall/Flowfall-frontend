import {RowMessage} from '../models/RowMessage';

export class WebSocketRowMessage {
  public type: 'SEND' | 'DELETE';
  public message: RowMessage;

  constructor(type, message) {
    this.type = type;
    this.message = message;
  }
}
