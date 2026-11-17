import { AbstractControl, ValidationErrors } from '@angular/forms';

export function imageUrlValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const urlPattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp))$/i;
    //regex checks if it's a valid url
    /*it checks for:
    - The URL starts with "http://" or "https://"
    - Followed by any characters (.*)
    - Ends with a file extension that is either .png, .jpg, .jpeg, .gif, .svg or webp
    */
    if (typeof value === 'string' && value.length > 0 && !urlPattern.test(value)) {
      return { invalidImageUrl: true };
    }
    return null;
}
