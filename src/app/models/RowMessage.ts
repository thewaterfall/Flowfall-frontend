import {Row} from './Row';
import {User} from './User';

export class RowMessage {
  public id: number;
  public row: Row;
  public sender: User;
  public text: string;
}
