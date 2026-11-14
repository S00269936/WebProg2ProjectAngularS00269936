import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function wrongValue(word: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value?.toLowerCase() === word.toLowerCase()) {
      return { wrongValue: true };
    }
    return null;
  };
}
//lowercase the value and makes sure it is not forbidden value e.g "test" or "TEST"