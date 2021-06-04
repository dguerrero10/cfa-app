import { Component, OnInit } from '@angular/core';
import { ChangeFeatureService } from 'src/app/core/services/navigation/change-feature.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public feature: string = <string>('');

  constructor(private changeFeatureSerivce: ChangeFeatureService) { }

  ngOnInit(): void {
    this.changeFeatureSerivce.currentFeature.subscribe(feature => this.feature = feature);
  }

}
