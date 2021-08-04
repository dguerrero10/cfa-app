import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-settings-bottom-sheet',
  templateUrl: './settings-bottom-sheet.component.html',
  styleUrls: ['./settings-bottom-sheet.component.scss']
})
export class SettingsBottomSheetComponent implements OnInit {

  constructor(private bottomSheetRef: MatBottomSheetRef<SettingsBottomSheetComponent>,
              private authService: AuthService) { }

  ngOnInit(): void {
  }

  onLogout(): void {
    this.bottomSheetRef.dismiss();
    this.authService.logout();
  }

}
