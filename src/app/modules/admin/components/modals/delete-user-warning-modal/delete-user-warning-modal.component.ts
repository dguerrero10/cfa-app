import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminUsersService } from 'src/app/core/services/admin/admin-users.service';
import { RefreshDataService } from 'src/app/core/services/shared/refresh-data.service';

export interface UserId {
  userId: string;
}

@Component({
  selector: 'app-delete-user-warning-modal',
  templateUrl: './delete-user-warning-modal.component.html',
  styleUrls: ['./delete-user-warning-modal.component.scss']
})
export class DeleteUserWarningModalComponent implements OnInit {

  constructor(private refreshDataService: RefreshDataService,
              private snackBar: MatSnackBar,
              private adminUserService: AdminUsersService,
              private dialogRef: MatDialogRef<DeleteUserWarningModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: UserId) { }

  ngOnInit(): void {
  }

  deleteUser() {
    this.adminUserService.deleteUser(this.data.userId)
      .subscribe(data => {
        if (data.success) {
          this.dialogRef.close();
          this.refreshDataService.refreshData(true);
          this.snackBar.open('User successfully deleted!', 'Dimiss', {duration: 1000});
        }
      })
    }
}
