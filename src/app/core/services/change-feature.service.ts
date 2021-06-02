import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Feature } from '../../shared/models/feature.model';
import { FEATURES } from '../../shared/data/features';

@Injectable({
  providedIn: 'root'
})
export class ChangeFeatureService {
  private featureSource = new BehaviorSubject<string>('teamMemberAttendance');
  public currentFeature = this.featureSource.asObservable();
  public features: Feature[] = FEATURES;

  constructor() {}

  switchFeature(feature:string) {
    this.featureSource.next(feature);
  }

  onSelect(feature: string) {
    let f = this.features.findIndex(f => f.feature === feature);
    this.features[f].selected = true;
    for (let i = 0; i < this.features.length; i++) {
      if (this.features[i].feature !== this.features[f].feature) {
        this.features[i].selected = false;
      }
    }
    return [...this.features];
  }
}
