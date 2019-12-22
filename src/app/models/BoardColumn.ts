import {Row} from './Row';
import {Board} from './Board';

export class BoardColumn {
  public id: number;
  public name: string;
  public index: number;
  public board: Board;
  public rows: Row[];

  constructor() {
    this.rows = [];
  }
}
