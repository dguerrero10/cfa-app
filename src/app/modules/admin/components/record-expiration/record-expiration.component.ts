import { Component, OnInit } from '@angular/core';
import { TeamMemberAttendanceService } from 'src/app/core/services/team-attendance/team-member-attendance.service';
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
  public expirationTimes: any[] = ['1', '4', '8', '12', 'Never'];
  
  constructor(private teamMemberAttendanceService: TeamMemberAttendanceService) { }

  ngOnInit(): void {
    this.teamMemberAttendanceService.updateExpiration().subscribe(
      data => console.log(data)
    )
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

