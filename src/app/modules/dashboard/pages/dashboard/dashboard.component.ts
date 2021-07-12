import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterTrackerService } from 'src/app/core/services/shared/router-tracker.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public today: any;
  public onDashboard: boolean = true;

  constructor(private cdr: ChangeDetectorRef,
              public routerTrackerService: RouterTrackerService,
              public router: Router) { }

  ngOnInit(): void {
  this.today = Date.now();
  }
}
