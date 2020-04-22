import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {HttpErrorResponse} from '@angular/common/http';
import {FormGroup} from '@angular/forms';
import {ErrorResponseDto} from '../models/dtos/ErrorResponseDto';

@Injectable()
export class ResponseService {

  constructor(private snackbar: MatSnackBar) { }

  handleMessage(message: string) {
    this.snackbar.open(message, 'OK', {
      duration: 4000
    });
  }

  handleFieldErrors(errorResponse: HttpErrorResponse, formGroup: FormGroup) {
    if (errorResponse.status === 400) {
      const error: ErrorResponseDto = errorResponse.error;
      error.fieldErrors.forEach(fieldError => {

        const formControl = formGroup.get(fieldError.field);
        if (formControl) {
          formControl.setErrors({
            serverError: fieldError.message
          });
        }

      });
    } else {
      this.handleMessage('Error occurred');
    }
  }

}
