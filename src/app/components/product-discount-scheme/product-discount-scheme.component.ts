import { Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  LucideAngularModule, 
  Save, RotateCcw, Search, Edit, XCircle, ToggleRight
} from 'lucide-angular';

import { ErpSelectComponent } from '../shared/erp-select/erp-select.component';
import { SectionHeaderComponent } from '../shared/section-header/section-header.component';

@Component({
  selector: 'app-product-discount-scheme',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    LucideAngularModule, 
    ErpSelectComponent,
    SectionHeaderComponent
  ],
  templateUrl: './product-discount-scheme.component.html',
  styleUrl: './product-discount-scheme.component.css'
})
export class ProductDiscountSchemeComponent {
  sections = signal({
    searchContents: true
  });

  // Entry Form
  formData = signal({
    zone: 'East',
    company: 'ILICO SERVICES LTD.(vERP)',
    branch: '',
    store: '',
    schemeType: 'Invoice Value', // 'Invoice Value' | 'Individual Product'
    grandAmountFrom: '',
    grandAmountTo: '',
    discountType: 'Percent', // 'Percent' | 'Amount'
    discountValue: '',
    startDate: '25 May 2026 02:54:02 PM',
    endDate: '25 May 2026 02:54:02 PM'
  });

  // Search Form
  searchData = signal({
    company: 'ILICO SERVICES LTD.(vERP)',
    branch: '',
    startDate: '01 May 2026',
    endDate: '31 May 2026'
  });

  // Icons
  readonly SaveIcon = Save;
  readonly RotateCcwIcon = RotateCcw;
  readonly SearchIcon = Search;
  readonly EditIcon = Edit;
  readonly XCircleIcon = XCircle;
  readonly ToggleRightIcon = ToggleRight;

  zoneOptions = [
    { label: 'East', value: 'East' },
    { label: 'West', value: 'West' }
  ];

  companyOptions = [
    { label: 'ILICO SERVICES LTD.(vERP)', value: 'ILICO SERVICES LTD.(vERP)' }
  ];

  branchOptions = [
    { label: '--Select CC Center Name--', value: '' },
    { label: 'Head Office', value: 'Head Office' }
  ];

  storeOptions = [
    { label: '--Select Store--', value: '' },
    { label: 'Kolkata Branch', value: 'Kolkata Branch' }
  ];

  // Mock Table Data
  tableData = signal([
    { slNo: 1, zone: 'East', branch: 'Head Office', company: 'ILICO SERVICES LTD.(vERP)', schemeType: 'Invoice Value', discount: '10%', startDate: '25 May 2026', endDate: '31 May 2026' }
  ]);

  toggleSection(key: 'searchContents') {
    this.sections.update(prev => ({ ...prev, [key]: !prev[key] }));
  }

  updateForm(field: string, value: any) {
    this.formData.update(prev => ({ ...prev, [field]: value }));
  }

  updateSearch(field: string, value: any) {
    this.searchData.update(prev => ({ ...prev, [field]: value }));
  }

  handleSave() {
    console.log('Saving Scheme...', this.formData());
    alert('Discount Scheme Saved Successfully!');
  }

  handleReset() {
    console.log('Resetting form');
  }

  handleSearch() {
    console.log('Searching Schemes...', this.searchData());
  }

  editRow(item: any) {
    console.log('Editing', item);
  }
  
  toggleRow(item: any) {
    console.log('Toggling', item);
  }

  deleteRow(item: any) {
    console.log('Deleting', item);
  }
}
