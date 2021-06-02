import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CaresFormModalComponent } from '../modals/cares-form-modal/cares-form-modal.component';

@Component({
  selector: 'app-cares',
  templateUrl: './cares.component.html',
  styleUrls: ['./cares.component.scss']
})
export class CaresComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openCaresFormModal() {
    this.dialog.open(CaresFormModalComponent);
  }

}
