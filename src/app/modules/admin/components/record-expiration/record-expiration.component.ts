import { Component, OnInit } from '@angular/core';
import { FEATURES_COPY } from 'src/app/shared/data/features-copy';
import { Feature } from 'src/app/shared/models/feature.model';

@Component({
  selector: 'app-record-expiration',
  templateUrl: './record-expiration.component.html',
  styleUrls: ['./record-expiration.component.scss']
})
export class RecordExpirationComponent implements OnInit {
  public features: Feature[] = FEATURES_COPY;
  public featureEdit: string = this.features[0].feature;
  public expirationTimes: any[] = [10, 20, 30, 40, 50, 60, 70, 'Never'];
  constructor() { }

  ngOnInit(): void {
    this.onSelect(this.featureEdit);
  }

  onSelect(feature: string) {
    let f = this.features.findIndex(f => f.feature === feature);
    this.features[f].selected = true;
    this.featureEdit = this.features[f].matToolTip;
    for (let i = 0; i < this.features.length; i++) {
      if (this.features[i].feature !== this.features[f].feature) {
        this.features[i].selected = false;
      }
    }
    return [...this.features];
  }


}

