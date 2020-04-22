import {ErrorDto} from './ErrorDto';

export class ErrorResponseDto {
  public message: string;
  public type: string;
  public status: number;
  public fieldErrors: ErrorDto[];
  public timestamps: Date;
}
