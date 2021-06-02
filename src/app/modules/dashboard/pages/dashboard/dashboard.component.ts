import { Component, OnInit } from '@angular/core';
import { ChangeFeatureService } from 'src/app/core/services/change-feature.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public feature: string = <string>('');

  constructor(private changeFeatureService: ChangeFeatureService) { }

  ngOnInit(): void {
    this.changeFeatureService.currentFeature.subscribe(feature => this.feature = feature);
  }

}
