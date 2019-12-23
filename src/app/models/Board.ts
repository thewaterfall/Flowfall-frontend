import {User} from './User';
import {BoardColumn} from './BoardColumn';

export class Board {
  public id: number;
  public name: string;
  public user: User;
  public boardColumns: BoardColumn[];

  constructor(id?: number) {
    this.id = id;
  }
}
