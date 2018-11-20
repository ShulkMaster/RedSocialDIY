import { FormControl } from '@angular/forms';

export class Passwordcheck {
  static validUsername(pass1: FormControl, pass2: FormControl) {
    if ( pass1.value.toLowerCase() === 'abc123' || pass1.value.toLowerCase() === '123abc') {
      return ({validUsername: true});
    } else {
      return (null);
    }
  }
}
