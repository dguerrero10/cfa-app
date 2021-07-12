import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { CurrentUserService } from 'src/app/core/services/shared/current-user.service';
import { User } from '../../models/auth/user.model';
import { AccountSettingsModalComponent } from '../account-settings-modal/account-settings-modal.component';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {
  public profileImg = '../../../../../../assets/images/profile-imgs/sacred-cow.png';
  public url: string = <string>('');
  public user: User = <User>{};
  public adminUrl: string = 'admin';
  public navigatedToAdmin: boolean = false;

  constructor(public dialog: MatDialog,
              public currentUserService: CurrentUserService,
              public authService: AuthService,
              private router: Router) { }



  ngOnInit(): void {
    this.currentUserService.getCurrentUser()
      .subscribe(userData => {
        this.user = (Object.values(userData)[0]);
      });
    if (this.router.url.includes(this.adminUrl)) {
      this.navigatedToAdmin = true;
    }
    else {
      this.navigatedToAdmin = false;
    }
  }

  onLogout() {
    this.authService.logout();
  }

  goToAdmin() {
    this.router.navigate(['/admin']);
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  openAccountSettings() {
    this.dialog.open(AccountSettingsModalComponent, {width: '400px'});
  }

}
