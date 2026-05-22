import { Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProductAssignBranchTableComponent } from '../product-assign-branch-table/product-assign-branch-table.component';

interface ProductAssignForm {
  branch: string;
  warehouse: string;
  mfgCode: string;
  group: string;
  productName: string;
  unitGroup: string;
  openingUnit: string;
  purchasePrice: string;
  salesPrice: string;
  productionPrice: string;
  openingStock: string;
  openingRate: string;
  stockAsOn: string;
  priceEffectiveDate: string;
  wallNailNo: string;
  mrp: string;
  serialNumber: string;
}

@Component({
  selector: 'app-product-assign-branch',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    ProductAssignBranchTableComponent
  ],
  templateUrl: './product-assign-branch.component.html',
  styleUrl: './product-assign-branch.component.css'
})
export class ProductAssignBranchComponent {
  formData: WritableSignal<ProductAssignForm> = signal({
    branch: 'Select CC Center',
    warehouse: '',
    mfgCode: 'Select Manufacture',
    group: 'Select Group',
    productName: 'Select Item Name',
    unitGroup: 'Select Unit Group',
    openingUnit: '',
    purchasePrice: '0.00',
    salesPrice: '0.00',
    productionPrice: '0.00',
    openingStock: '0.00',
    openingRate: '0.00',
    stockAsOn: '19 May 2026',
    priceEffectiveDate: '19 May 2026',
    wallNailNo: '',
    mrp: '0.00',
    serialNumber: ''
  });

  updateForm(field: keyof ProductAssignForm, value: string) {
    this.formData.update(prev => ({ ...prev, [field]: value }));
  }

  handleReset() {
    this.formData.set({
      branch: 'Select CC Center',
      warehouse: '',
      mfgCode: 'Select Manufacture',
      group: 'Select Group',
      productName: 'Select Item Name',
      unitGroup: 'Select Unit Group',
      openingUnit: '',
      purchasePrice: '0.00',
      salesPrice: '0.00',
      productionPrice: '0.00',
      openingStock: '0.00',
      openingRate: '0.00',
      stockAsOn: '19 May 2026',
      priceEffectiveDate: '19 May 2026',
      wallNailNo: '',
      mrp: '0.00',
      serialNumber: ''
    });
  }
}
