import { Component, OnInit } from '@angular/core';
import { ChangeFeatureService } from 'src/app/core/services/change-feature.service';
import { Feature } from '../../../../../shared/models/feature.model';
import { FEATURES } from 'src/app/shared/data/features';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  public features: Feature[] = FEATURES;
  public feature: string = <string>('');
  public cfaLogo = '../../../../../assets/images/cfa-logo.svg';

  constructor(private featureService: ChangeFeatureService) { }

  ngOnInit(): void {
    this.featureService.currentFeature.subscribe(feature => this.feature = feature);
  }

  onSelect(feature: string) {
    this.features = this.featureService.onSelect(feature);
    this.featureService.switchFeature(feature);
  }

}