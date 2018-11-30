import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../servicios/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public localauth: AuthService,
    private URL: Router,
    private http: HttpClient) {}

  canActivate():  Observable<boolean> | boolean {
    console.log('desde el guardio: ', this.URL.url.split('/')[3]);
    return this.http.get<boolean>('/srv/getauth/' + this.URL.url.split('/')[3]);
  }

}
