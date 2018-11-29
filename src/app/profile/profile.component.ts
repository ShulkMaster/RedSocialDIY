import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { AuthService } from '../servicios/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  running = false;

  constructor(public session: AuthService, public dataserver: DataService) {
    console.log('Home constructor fired from home');
    this.session = session;
    this.dataserver = dataserver;
  }

  ngOnInit() {
  }

  checkuserage() {
    if (this.session.myUser.edad >= 10) {
      console.log('su usuario si es mayor de edad', this.session.myUser);
      return true;
    }
    return false;
  }
}