import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ADMIN_FEATURES } from 'src/app/shared/data/admin-features';
import { Feature } from 'src/app/shared/models/feature.model';

@Injectable({
  providedIn: 'root'
})
export class ChangeFeatureAdminService {
  private featureSource = new BehaviorSubject<string>('manageUsers');
  public currentFeature = this.featureSource.asObservable();
  public adminFeatures: Feature[] = ADMIN_FEATURES;

  constructor() {}

  switchFeature(feature:string) {
    this.featureSource.next(feature);
  }

  onSelect(feature: string) {
    let f = this.adminFeatures.findIndex(f => f.feature === feature);
    this.adminFeatures[f].selected = true;
    for (let i = 0; i < this.adminFeatures.length; i++) {
      if (this.adminFeatures[i].feature !== this.adminFeatures[f].feature) {
        this.adminFeatures[i].selected = false;
      }
    }
    return [...this.adminFeatures];
  }
}
