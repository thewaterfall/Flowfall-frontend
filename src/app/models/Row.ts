import {BoardColumn} from './BoardColumn';

export class Row {
  public id: number;
  public name: string;
  public content: string;
  public index: number;
  public boardColumn: BoardColumn;

  constructor(name?: string, index?: number, boardColumnId?: number) {
    this.name = name;
    this.index = index;

    let boardColumn = new BoardColumn();
    boardColumn.id = boardColumnId;

    this.boardColumn = boardColumn;
  }
}
