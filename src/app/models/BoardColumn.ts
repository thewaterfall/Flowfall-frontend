import {Row} from './Row';
import {Board} from './Board';

export class BoardColumn {
  public id: number;
  public name: string;
  public index: number;
  public board: Board;
  public rows: Row[];

  constructor(name?: string, index?: number, boardId?: number) {
    this.name = name;
    this.index = index;
    this.board = new Board(boardId);
    this.rows = [];
  }
}
