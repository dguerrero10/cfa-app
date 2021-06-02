import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ItemOrderFormModalComponent } from '../modals/item-order-form-modal/item-order-form-modal.component';

@Component({
  selector: 'app-item-order',
  templateUrl: './item-order.component.html',
  styleUrls: ['./item-order.component.scss']
})
export class ItemOrderComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openItemOrderFormModal() {
    this.dialog.open(ItemOrderFormModalComponent, {width: '500px'});
  }

}
