import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {
  public profileImg = '../../../../../../assets/images/profile-imgs/sacred-cow.png';
  public url: string = <string>('');
  public adminUrl: string = '/admin';
  public navigatedToAdmin: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.url = this.router.url;
    if (this.url === this.adminUrl) {
      this.navigatedToAdmin = true;
    }
    else {
      this.navigatedToAdmin = false;
    }
  }

  goToAdmin() {
    this.router.navigate(['/admin']);
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

}
