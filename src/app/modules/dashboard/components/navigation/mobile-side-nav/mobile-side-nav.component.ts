import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { FEATURES } from 'src/app/shared/data/features';
import { Feature } from 'src/app/shared/models/feature.model';

@Component({
  selector: 'app-mobile-side-nav',
  templateUrl: './mobile-side-nav.component.html',
  styleUrls: ['./mobile-side-nav.component.scss']
})
export class MobileSideNavComponent implements OnInit {
  public features: Feature[] = FEATURES;
  public currentDay: number = 0;
  public currentMonth: string = <string>('');
  public monthNames = ["January", "February", "March", "April", 
                       "May","June","July", "August", "September", 
                       "October", "November","December"];


  constructor(private breakpointObserver: BreakpointObserver) {}

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  ngOnInit(): void {
    let d = new Date();
    this.currentDay = d.getDate();
    this.currentMonth = this.monthNames[d.getMonth()];
  }
}
