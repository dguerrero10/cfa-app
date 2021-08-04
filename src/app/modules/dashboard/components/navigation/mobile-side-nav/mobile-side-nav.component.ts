import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { FEATURES } from 'src/app/shared/data/features';
import { Feature } from 'src/app/shared/models/feature.model';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { SettingsBottomSheetComponent } from '../../mobile/settings-bottom-sheet/settings-bottom-sheet.component';
import { CurrentUserService } from 'src/app/core/services/shared/current-user.service';
import { User } from 'src/app/shared/models/auth/user.model';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-mobile-side-nav',
  templateUrl: './mobile-side-nav.component.html',
  styleUrls: ['./mobile-side-nav.component.scss']
})
export class MobileSideNavComponent implements OnInit, OnDestroy {
  @ViewChild('drawer') public drawer!: MatSidenav;
  public features: Feature[] = FEATURES;
  public currentDay: number = 0;
  public currentMonth: string = <string>('');
  public user: User = <User>{};
  private userServiceSub$ = new Subscription;
  public monthNames = ["January", "February", "March", "April", 
                       "May","June","July", "August", "September", 
                       "October", "November","December"];

  constructor(private currentUserService: CurrentUserService,
              private bottomSheet: MatBottomSheet,
              private breakpointObserver: BreakpointObserver) {}

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );
  

  openSettingsBottomSheet(): void {
    this.bottomSheet.open(SettingsBottomSheetComponent);
  }

  toggleSideNav() {
    if (window.innerWidth <= 600) {
      this.drawer.close();
    }
  }

  ngOnInit(): void {
    this.userServiceSub$ = this.currentUserService.getCurrentUser()
      .subscribe(userData => {
        this.user = (Object.values(userData)[0]);
      });
    let d = new Date();
    this.currentDay = d.getDate();
    this.currentMonth = this.monthNames[d.getMonth()];
  }

  ngOnDestroy() {
    this.userServiceSub$.unsubscribe();
  }

}
