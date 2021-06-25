import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminUsersService } from 'src/app/core/services/admin/admin-users.service';
import { User } from 'src/app/shared/models/auth/user.model';
import { DeleteUserWarningModalComponent } from '../modals/delete-user-warning-modal/delete-user-warning-modal.component';
import { ElevatePrivilegesWarningModalComponent } from '../modals/elevate-privileges-warning-modal/elevate-privileges-warning-modal.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  public checked: boolean = false;
  public users: User[] = <User[]>([]); 

  constructor(private userService: AdminUsersService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
   this.userService.userSourceListener.subscribe(userData => this.users = userData);
  }

  deleteUserWarningModal(userId: string) {
    this.dialog.open(DeleteUserWarningModalComponent, {
      data: {
        userId: userId
      }
    });
  }

  adminChecked(event: any) {
    if (event.checked) {
      this.dialog.open(ElevatePrivilegesWarningModalComponent);
    }
  }

}
