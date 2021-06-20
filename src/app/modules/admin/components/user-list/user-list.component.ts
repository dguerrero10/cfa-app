import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsersService } from 'src/app/core/services/admin/users.service';
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

  constructor(private userService: UsersService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.userService.getAllUsers()
      .subscribe(users => {this.users = users.users; console.log(this.users)});
  }

  deleteUserWarningModal() {
    this.dialog.open(DeleteUserWarningModalComponent);
  }

  adminChecked(event: any) {
    if (event.checked) {
      this.dialog.open(ElevatePrivilegesWarningModalComponent);
    }
  }

}
