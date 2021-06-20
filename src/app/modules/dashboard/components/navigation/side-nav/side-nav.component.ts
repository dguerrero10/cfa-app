import { Component, OnInit } from '@angular/core';
import { Feature } from '../../../../../shared/models/feature.model';
import { FEATURES } from 'src/app/shared/data/features';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  public cfaLogo = '../../../../../assets/images/cfa-logo.svg';
  public features: Feature[] = FEATURES;

  constructor() { }

  ngOnInit(): void {
    
  }
}