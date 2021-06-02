import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FinancialServicesFormModalComponent } from '../modals/financial-services-form-modal/financial-services-form-modal.component';

@Component({
  selector: 'app-financial-services',
  templateUrl: './financial-services.component.html',
  styleUrls: ['./financial-services.component.scss']
})
export class FinancialServicesComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openFinancialServicesFormModal() {
    this.dialog.open(FinancialServicesFormModalComponent, {width: '400px'});
  }

}
