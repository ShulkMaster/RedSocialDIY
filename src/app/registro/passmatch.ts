import { AbstractControl } from '@angular/forms';

export function Passwordcheck(control: AbstractControl) {
  if (control && (control.value !== null || control.value !== undefined)) {
    const pass1 = control.root.get('passwd');
    const pass2 = control.value;
    if (pass1) {
      const valorpw = pass1.value;
      if (pass2 !== valorpw) {
        return {isError: true};
      }
    }
  }
  return null;
}
