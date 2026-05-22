import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ClientPriceTableComponent } from '../client-price-table/client-price-table.component';

interface ClientItem {
  id: string;
  itemCode: string;
  itemName: string;
  rate: string;
}

@Component({
  selector: 'app-client-price-list',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    ClientPriceTableComponent
  ],
  templateUrl: './client-price-list.component.html',
  styleUrl: './client-price-list.component.css'
})
export class ClientPriceListComponent {
  selectedItem = signal<ClientItem | null>(null);

  onEditItem(item: ClientItem) {
    this.selectedItem.set(item);
  }

  handleUpdatePrice(newPrice: string) {
    if (!this.selectedItem()) return;
    // Just a mock update state
    alert(`Price of ${this.selectedItem()?.itemName} successfully updated to Rs. ${newPrice}`);
  }
}
