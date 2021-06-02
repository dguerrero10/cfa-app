import { Component, OnInit } from '@angular/core';
import { ADMIN_FEATURES } from 'src/app/shared/data/adminFeatures';
import { Feature } from 'src/app/shared/models/feature.model';

@Component({
  selector: 'app-admin-side-nav',
  templateUrl: './admin-side-nav.component.html',
  styleUrls: ['./admin-side-nav.component.scss']
})
export class AdminSideNavComponent implements OnInit {
  cfaLogo = '../../../../../../assets/images/cfa-logo.svg';
  public adminFeatures: Feature[] = ADMIN_FEATURES;
  public adminFeature: string = <string>('');

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(feature:string) {
    console.log(feature);
  }

}
