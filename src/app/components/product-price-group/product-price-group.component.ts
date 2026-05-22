import { Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProductPriceGroupTableComponent } from '../product-price-group-table/product-price-group-table.component';

interface ProductPriceGroupForm {
  priceGroupName: string;
  group: string;
}

@Component({
  selector: 'app-product-price-group',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    ProductPriceGroupTableComponent
  ],
  templateUrl: './product-price-group.component.html',
  styleUrl: './product-price-group.component.css'
})
export class ProductPriceGroupComponent {
  formData: WritableSignal<ProductPriceGroupForm> = signal({
    priceGroupName: '',
    group: 'select'
  });

  updateForm(field: keyof ProductPriceGroupForm, value: string) {
    this.formData.update(prev => ({ ...prev, [field]: value }));
  }

  handleReset() {
    this.formData.set({
      priceGroupName: '',
      group: 'select'
    });
  }
}
