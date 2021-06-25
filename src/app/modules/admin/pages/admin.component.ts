import { Component, OnInit } from '@angular/core';
import { AdminUsersService } from 'src/app/core/services/admin/admin-users.service';
import { ChangeFeatureAdminService } from 'src/app/core/services/navigation/change-feature-admin.service';
import { RefreshDataService } from 'src/app/core/services/shared/refresh-data.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  public feature: string = <string>('');
  
  constructor(public refreshDataService: RefreshDataService,
              public adminUsersService: AdminUsersService,
              public changeFeatureAdminService: ChangeFeatureAdminService) { }

  ngOnInit(): void {
   this.getUserData();
    this.refreshDataService.dataRefreshed.subscribe(refreshed => {
      if (refreshed) {
       this.getUserData();
      }
    })
    this.changeFeatureAdminService.currentFeature.subscribe(feature => this.feature = feature);
  }

  getUserData() {
    this.adminUsersService.getAllUsers()
      .subscribe(userData => this.adminUsersService.shareUserData(userData.users));
  }
}
