import {FormGroup, ValidatorFn} from '@angular/forms';

export function PasswordMatch(password: string, confirmPassword: string): ValidatorFn {
  return (group: FormGroup): { [key: string]: boolean } | null  => {
    const passwordField = group.controls[password];
    const confirmField = group.controls[confirmPassword];

    if (passwordField.value !== confirmField.value) {
      const passwordError = {passwordMatch: true};

      confirmField.setErrors(passwordError);
      return passwordError;
    }

    return null;
  };
}
