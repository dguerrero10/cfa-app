import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MobileViewService } from 'src/app/core/services/shared/mobile-view.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public today: any;
  public onMobile: boolean = false;

  constructor(public mobileViewService: MobileViewService,
              public breakpointObserver: BreakpointObserver,
              public route: ActivatedRoute,
              public router: Router) { }

  ngOnInit(): void {
    this.today = Date.now();
    this.breakpointObserver
    .observe(['(max-width: 800px)'])
    .subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.onMobile = true;
        this.mobileViewService.switchToMobileState(true);
      } else {
        this.onMobile = false;
        this.mobileViewService.switchToMobileState(false);
      }
    });
  }
}
