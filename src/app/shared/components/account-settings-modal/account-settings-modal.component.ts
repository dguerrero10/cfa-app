import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CurrentUserService } from 'src/app/core/services/shared/current-user.service';
import { User } from '../../models/auth/user.model';

@Component({
  selector: 'app-account-settings-modal',
  templateUrl: './account-settings-modal.component.html',
  styleUrls: ['./account-settings-modal.component.scss']
})
export class AccountSettingsModalComponent implements OnInit, OnDestroy{
  public user: User = <User>{};
  public changePasswordMode: boolean = false;
  public changeEmailMode: boolean = false;
  private userServiceSub$ = new Subscription;

  constructor(public currentUserService: CurrentUserService) { }

  ngOnInit(): void {
   this.userServiceSub$ = this.currentUserService.getCurrentUser()
      .subscribe(userData => {
        this.user = (Object.values(userData)[0]);
      });
  }

  onChangeEmail(event: any) {
    if (event.target.value) {
        this.changeEmailMode = true;
    }
    if (event.target.value == this.user.email) {
      this.changeEmailMode = false;
    }
  }

  onChangePassword() {
    this.changePasswordMode = true;
  }

  cancelChangePassword() {
    this.changeEmailMode = false;
    this.changePasswordMode = false;
  }

  ngOnDestroy() {
    this.userServiceSub$.unsubscribe();
  }

}
