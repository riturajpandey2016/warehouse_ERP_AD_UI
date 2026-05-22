import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProductRateUpdateTableComponent } from '../product-rate-update-table/product-rate-update-table.component';

@Component({
  selector: 'app-product-rate-update',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    ProductRateUpdateTableComponent
  ],
  templateUrl: './product-rate-update.component.html',
  styleUrl: './product-rate-update.component.css'
})
export class ProductRateUpdateComponent {
  showTable = signal<boolean>(false);
  selectedBranch = signal<string>('Select CC Center');

  onBranchChange(event: any) {
    this.selectedBranch.set(event.target.value);
  }

  handleView() {
    if (this.selectedBranch() === 'Select CC Center') {
      alert('Please select a valid Branch first.');
      return;
    }
    this.showTable.set(true);
  }
}
