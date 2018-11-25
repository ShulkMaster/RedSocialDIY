import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { AuthService } from '../servicios/auth.service';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  @ViewChild(CdkVirtualScrollViewport) renderize: CdkVirtualScrollViewport;

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
      console.log('su usuario si es mayor de eedad', this.session.myUser);
      return true;
    }
    return false;
  }

  getNextPack() {
    console.log('getNextPack fired!');
    if (this.dataserver.theEnd) {
      console.log('llegaste al fin prro!');
      return;
    }
    const end = this.renderize.getRenderedRange().end;
    const total = this.renderize.getDataLength();
    if ((end === total) && !this.running) {
      console.log('before getpostfeed!');
      this.dataserver.getpostfeed(total);
      console.log('el valor de mamacion', this.dataserver.theEnd);
      this.running = true;
      setTimeout(() => {
        this.running = false;
        console.log('after getpostfeed!', this.running);
      }, 800);
    }
  }

}
