import { Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Search } from 'lucide-angular';

import { ProductCreationTableComponent } from '../product-creation-table/product-creation-table.component';

interface ProductCreationForm {
  itemName: string;
  itemCode: string;
  itemType: string;
  group: string;
  unitGroup: string;
  purchaseUnit: string;
  salesUnit: string;
  issueUnit: string;
  itemCategory: string;
  itemMaterialType: string;
  status: string;
  isSerial: string;
  isBarcode: string;
  entryDate: string;
  mfgCode: string;
  warrantyPeriod: string;
  guaranteePeriod: string;
  maxLevel: string;
  minLevel: string;
  reorderLevel: string;
  effectiveDate: string;
  hsn: string;
  scrapItem: string;
  remarks: string;
  assetCategory: string;
}

@Component({
  selector: 'app-product-creation',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    LucideAngularModule,
    ProductCreationTableComponent
  ],
  templateUrl: './product-creation.component.html',
  styleUrl: './product-creation.component.css'
})
export class ProductCreationComponent {
  readonly SearchIcon = Search;

  formData: WritableSignal<ProductCreationForm> = signal({
    itemName: '',
    itemCode: '',
    itemType: 'Select Item Type',
    group: 'Select Product Group',
    unitGroup: 'Select Unit Of Measure',
    purchaseUnit: '',
    salesUnit: '',
    issueUnit: '',
    itemCategory: 'Select Category',
    itemMaterialType: 'Select Item Type',
    status: 'Active',
    isSerial: 'No',
    isBarcode: 'No',
    entryDate: '19 May 2026',
    mfgCode: 'Select Manufacture',
    warrantyPeriod: '',
    guaranteePeriod: '',
    maxLevel: '',
    minLevel: '',
    reorderLevel: '',
    effectiveDate: '19 May 2026',
    hsn: 'Select HSN / SAC Code',
    scrapItem: 'Select Scrap Item',
    remarks: '',
    assetCategory: 'Select Asset Category'
  });

  updateForm(field: keyof ProductCreationForm, value: string) {
    this.formData.update(prev => ({ ...prev, [field]: value }));
  }

  handleReset() {
    this.formData.set({
      itemName: '',
      itemCode: '',
      itemType: 'Select Item Type',
      group: 'Select Product Group',
      unitGroup: 'Select Unit Of Measure',
      purchaseUnit: '',
      salesUnit: '',
      issueUnit: '',
      itemCategory: 'Select Category',
      itemMaterialType: 'Select Item Type',
      status: 'Active',
      isSerial: 'No',
      isBarcode: 'No',
      entryDate: '19 May 2026',
      mfgCode: 'Select Manufacture',
      warrantyPeriod: '',
      guaranteePeriod: '',
      maxLevel: '',
      minLevel: '',
      reorderLevel: '',
      effectiveDate: '19 May 2026',
      hsn: 'Select HSN / SAC Code',
      scrapItem: 'Select Scrap Item',
      remarks: '',
      assetCategory: 'Select Asset Category'
    });
  }
}
