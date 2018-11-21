import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { AuthService } from '../servicios/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  constructor(private session: AuthService, private dataserver: DataService) {
    console.log('Home constructor fired from home');
  }

  ngOnInit() {
  }

  checkuserage() {
    if (this.session.myUser.edad >= 10) {
      console.log('su usuario si es mayor de eedad', this.session.myUser);
      return true;
    }
    return false;
  }

}
