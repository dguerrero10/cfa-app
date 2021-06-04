import { Component, OnInit } from '@angular/core';
import { ChangeFeatureAdminService } from 'src/app/core/services/navigation/change-feature-admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  public feature: string = <string>('');
  
  constructor(public changeFeatureAdminService: ChangeFeatureAdminService) { }

  ngOnInit(): void {
    this.changeFeatureAdminService.currentFeature.subscribe(feature => this.feature = feature);
  }

}
