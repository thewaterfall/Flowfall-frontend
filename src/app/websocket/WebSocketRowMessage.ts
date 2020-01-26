import {RowMessage} from '../models/RowMessage';

export class WebSocketRowMessage {
  public type: 'send' | 'delete';
  public message: RowMessage;
}
