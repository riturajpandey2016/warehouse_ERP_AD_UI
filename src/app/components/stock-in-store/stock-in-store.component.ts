import { Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  LucideAngularModule, 
  Save, RotateCcw, Search, Edit, XCircle
} from 'lucide-angular';

import { ErpSelectComponent } from '../shared/erp-select/erp-select.component';
import { ErpInputComponent } from '../shared/erp-input/erp-input.component';
import { SectionHeaderComponent } from '../shared/section-header/section-header.component';

@Component({
  selector: 'app-stock-in-store',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    LucideAngularModule, 
    ErpSelectComponent,
    ErpInputComponent,
    SectionHeaderComponent
  ],
  templateUrl: './stock-in-store.component.html',
  styleUrl: './stock-in-store.component.css'
})
export class StockInStoreComponent {
  sections = signal({
    stockList: true
  });

  // Entry Form
  formData = signal({
    company: 'ILICO SERVICES LTD.(vERP)',
    ccCenter: '',
    group: '',
    unitGroup: '',
    salesPrice: '0.00',
    priceEffectiveDate: '2026-05-25',
    store: '',
    productName: '',
    baseUnit: '',
    openingStock: '0.00'
  });

  // Search Form
  searchData = signal({
    company: 'ILICO SERVICES LTD.(vERP)',
    ccCenter: '',
    group: '',
    store: '',
    productName: ''
  });

  // Icons
  readonly SaveIcon = Save;
  readonly RotateCcwIcon = RotateCcw;
  readonly SearchIcon = Search;
  readonly EditIcon = Edit;
  readonly XCircleIcon = XCircle;

  companyOptions = [
    { label: 'ILICO SERVICES LTD.(vERP)', value: 'ILICO SERVICES LTD.(vERP)' }
  ];

  ccCenterOptions = [
    { label: '--Select CC Center / Branch--', value: '' },
    { label: 'Head Office', value: 'Head Office' }
  ];

  groupOptions = [
    { label: '--Select Group--', value: '' },
    { label: 'FINISHED', value: 'FINISHED' },
    { label: 'MAIN', value: 'MAIN' }
  ];

  unitGroupOptions = [
    { label: '--Select Unit Group--', value: '' },
    { label: 'Pieces', value: 'Pieces' }
  ];

  storeOptions = [
    { label: '--Select Store--', value: '' },
    { label: 'Mumbai Branch Store', value: 'Mumbai Branch Store' },
    { label: 'Howrah Branch', value: 'Howrah Branch' }
  ];

  productOptions = [
    { label: '--Select Stock Name--', value: '' },
    { label: '1/4" Plug Nut', value: '1/4" Plug Nut' }
  ];

  baseUnitOptions = [
    { label: '--Select Base Unit--', value: '' },
    { label: 'NOS', value: 'NOS' }
  ];

  // Mock Table Data
  tableData = signal([
    { slNo: 1, itemName: '1/4" Plug Nut', itemCode: 'F0468', hsn: '84139190', price: 'Rs. 500.00', ccCenter: 'Head Office', store: 'Mumbai Branch Store', date: '11 Oct 2022', group: 'FINISHED', itemType: 'Pump Unit Assly PTO' },
    { slNo: 2, itemName: '3/8" Plug Nut', itemCode: 'F0469', hsn: '84139190', price: 'Rs. 800.00', ccCenter: 'Head Office', store: 'Howrah Branch', date: '02 Jun 2022', group: 'FINISHED', itemType: 'Pump Unit Assly PTO' },
    { slNo: 3, itemName: 'LED TV', itemCode: 'LTv', hsn: '00440245', price: 'Rs. 10000.00', ccCenter: 'Head Office', store: 'Howrah Branch', date: '02 Jun 2022', group: 'MAIN', itemType: 'General Assly' },
    { slNo: 4, itemName: 'Red Curpet', itemCode: 'FNS/SVE/00001', hsn: '19041010', price: 'Rs. 300.00', ccCenter: 'Head Office', store: 'Kolkata Branch', date: '08 Mar 2022', group: 'FINISHED', itemType: 'Service' },
    { slNo: 5, itemName: 'LED TV', itemCode: 'LTv', hsn: '00440245', price: 'Rs. 50000.00', ccCenter: 'Head Office', store: 'NewTown Branch', date: '07 Mar 2022', group: 'MAIN', itemType: 'General Assly' },
    { slNo: 6, itemName: 'Adjusting Wheel (GM 80011)', itemCode: 'F0078', hsn: '84131199', price: 'Rs. 457.00', ccCenter: 'Head Office', store: 'NewTown Branch', date: '07 Mar 2022', group: 'FINISHED', itemType: 'Meter Unit' },
    { slNo: 7, itemName: 'Adj.Stud (7032-21)', itemCode: 'F0365', hsn: '84131199', price: 'Rs. 5000.00', ccCenter: 'Head Office', store: 'NewTown Branch', date: '07 Mar 2022', group: 'FINISHED', itemType: 'Pump Unit' },
    { slNo: 8, itemName: '1/4" Plug Nut', itemCode: 'F0468', hsn: '84139190', price: 'Rs. 3000.00', ccCenter: 'Head Office', store: 'NewTown Branch', date: '07 Mar 2022', group: 'FINISHED', itemType: 'Pump Unit Assly PTO' }
  ]);

  toggleSection(key: 'stockList') {
    this.sections.update(prev => ({ ...prev, [key]: !prev[key] }));
  }

  updateForm(field: string, value: any) {
    this.formData.update(prev => ({ ...prev, [field]: value }));
  }

  updateSearch(field: string, value: any) {
    this.searchData.update(prev => ({ ...prev, [field]: value }));
  }

  handleSerialShow() {
    console.log('Showing Serials for opening stock...');
  }

  handleSave() {
    console.log('Saving Stock...', this.formData());
    alert('Stock Saved Successfully!');
  }

  handleReset() {
    console.log('Resetting form');
  }

  handleSearch() {
    console.log('Searching Stock...', this.searchData());
  }

  editRow(item: any) {
    console.log('Editing', item);
  }

  deleteRow(item: any) {
    console.log('Deleting', item);
  }
}
