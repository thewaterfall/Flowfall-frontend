import {BoardColumn} from './BoardColumn';

export class Row {
  public id: number;
  public content: string;
  public index: number;
  public boardColumn: BoardColumn;

  constructor(content?: string, index?: number, boardColumnId?: number) {
    this.content = content;
    this.index = index;

    let boardColumn = new BoardColumn();
    boardColumn.id = boardColumnId;

    this.boardColumn = boardColumn;
  }
}
