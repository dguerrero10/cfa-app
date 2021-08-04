import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { CurrentUserService } from 'src/app/core/services/shared/current-user.service';
import { User } from '../../models/auth/user.model';
import { AccountSettingsModalComponent } from '../account-settings-modal/account-settings-modal.component';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit, OnDestroy {
  public profileImg = '../../../../../../assets/images/profile-imgs/sacred-cow.png';
  public url: string = <string>('');
  public user: User = <User>{};
  public adminUrl: string = 'admin';
  public navigatedToAdmin: boolean = false;
  private userServiceSub$ = new Subscription;

  constructor(public dialog: MatDialog,
    private snackBar: MatSnackBar,
    public currentUserService: CurrentUserService,
    public authService: AuthService,
    private router: Router) { }


  handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      this.snackBar.open('An error occured, please logout and try again.', 'Dismiss', {
        duration: 5000
      })
    }
  }

  ngOnInit(): void {
    this.userServiceSub$ = this.currentUserService.getCurrentUser()
      .subscribe(userData => {
        this.user = (Object.values(userData)[0]);
      },
        (error) => {
          this.handleError(error);
        }
      );
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
    this.dialog.open(AccountSettingsModalComponent, { width: '400px' });
  }

  ngOnDestroy() {
    this.userServiceSub$.unsubscribe();
  }

}
