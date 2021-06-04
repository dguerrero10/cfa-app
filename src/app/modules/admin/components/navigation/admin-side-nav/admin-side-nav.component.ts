import { Component, OnInit } from '@angular/core';
import { ChangeFeatureAdminService } from 'src/app/core/services/navigation/change-feature-admin.service';
import { ADMIN_FEATURES } from 'src/app/shared/data/admin-features';
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

  constructor(public changeFeatureAdmiService: ChangeFeatureAdminService) { }

  ngOnInit(): void {
    this.changeFeatureAdmiService.currentFeature.subscribe(feature => this.adminFeature = feature);
  }

  onSelect(feature:string) {
   this.adminFeatures = this.changeFeatureAdmiService.onSelect(feature);
   this.changeFeatureAdmiService.switchFeature(feature); 
  }

}
