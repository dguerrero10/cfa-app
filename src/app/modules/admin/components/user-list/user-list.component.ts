import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteUserWarningModalComponent } from '../modals/delete-user-warning-modal/delete-user-warning-modal.component';
import { ElevatePrivilegesWarningModalComponent } from '../modals/elevate-privileges-warning-modal/elevate-privileges-warning-modal.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  public checked: boolean = false;
  users = [
    {
      name: 'Dave Guerrero',
      email: 'dguerrer10@gmail.com',
      privileges: 'Admin',
      employeeID: '232321'
    },
    {
      name: "Sheri O'Leary",
      email: 'sheriLeary@gmail.com',
      privileges: 'Admin',
      employeeID: '432118'
    },
  ];
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
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
