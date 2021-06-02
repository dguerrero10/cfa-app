import { Component, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { filter, map, mergeMap} from 'rxjs/operators'; 
import {
  ActivatedRoute,
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CFA-Dashboard';
  
  constructor(public router: Router,
              public activatedRoute: ActivatedRoute,
              @Inject(DOCUMENT) private document: Document,
              public renderer: Renderer2) {

  }

  ngOnInit(): void {
    this.router.events
    .pipe(filter((event:any) => event instanceof NavigationEnd))
    .pipe(map(() => this.activatedRoute))
    .pipe(map((route:any) => {
      while (route.firstChild) {
        route = route.firstChild;
      }
      return route;
    }))
    .pipe(filter((route:any) => route.outlet === 'primary'))
    .pipe(mergeMap((route:any) => route.data))
    .subscribe((event: any) => this.updateBodyClass(event.bodyClass));
  }
  private updateBodyClass(customBodyClass?: string) {
    this.renderer.setAttribute(this.document?.body, 'class', '');
    if (customBodyClass) {
      this.renderer.addClass(this.document?.body, customBodyClass);
    }
  }
}
