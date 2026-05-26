import { Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  LucideAngularModule, 
  Save, RotateCcw, Search, Edit, ToggleRight, XCircle
} from 'lucide-angular';

import { ErpSelectComponent } from '../shared/erp-select/erp-select.component';
import { ErpInputComponent } from '../shared/erp-input/erp-input.component';
import { SectionHeaderComponent } from '../shared/section-header/section-header.component';

@Component({
  selector: 'app-branch-store-entry',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    LucideAngularModule, 
    ErpSelectComponent,
    ErpInputComponent,
    SectionHeaderComponent
  ],
  templateUrl: './branch-store-entry.component.html',
  styleUrl: './branch-store-entry.component.css'
})
export class BranchStoreEntryComponent {
  sections = signal({
    storeDetails: true
  });

  // Entry Form
  formData = signal({
    company: 'ILICO SERVICES LTD.(vERP)',
    ccCenter: 'Head Office',
    storeName: '',
    storeCode: ''
  });

  // Search Form
  searchData = signal({
    company: 'ILICO SERVICES LTD.(vERP)',
    ccCenter: ''
  });

  // Icons
  readonly SaveIcon = Save;
  readonly RotateCcwIcon = RotateCcw;
  readonly SearchIcon = Search;
  readonly EditIcon = Edit;
  readonly ToggleRightIcon = ToggleRight;
  readonly XCircleIcon = XCircle;

  companyOptions = [
    { label: 'ILICO SERVICES LTD.(vERP)', value: 'ILICO SERVICES LTD.(vERP)' },
    { label: 'Warehouse Group Corp', value: 'Warehouse Group Corp' }
  ];

  ccCenterOptions = [
    { label: '--Select CC Center Name--', value: '' },
    { label: 'Head Office', value: 'Head Office' },
    { label: 'Bihar', value: 'Bihar' }
  ];

  ccCenterEntryOptions = [
    { label: 'Head Office', value: 'Head Office' },
    { label: 'Bihar', value: 'Bihar' }
  ];

  // Mock Table Data
  tableData = signal([
    { slNo: 1, company: 'ILICO SERVICES LTD.(vERP)', branch: 'Head Office', storeName: 'Kolkata Branch', storeCode: 'KOL001', entryBy: 'Siddharta Dikshit', entryDate: '23 Feb 2022' },
    { slNo: 2, company: 'ILICO SERVICES LTD.(vERP)', branch: 'Head Office', storeName: 'NewTown Branch', storeCode: 'NEWT0001', entryBy: 'Siddharta Dikshit', entryDate: '23 Feb 2022' },
    { slNo: 3, company: 'ILICO SERVICES LTD.(vERP)', branch: 'Head Office', storeName: 'Barasat Branch', storeCode: 'BARS0001', entryBy: 'Siddharta Dikshit', entryDate: '23 Feb 2022' },
    { slNo: 4, company: 'ILICO SERVICES LTD.(vERP)', branch: 'Head Office', storeName: 'Howrah Branch', storeCode: 'HOWR0001', entryBy: 'Siddharta Dikshit', entryDate: '23 Feb 2022' },
    { slNo: 5, company: 'ILICO SERVICES LTD.(vERP)', branch: 'Bihar', storeName: 'Patna Store', storeCode: 'PS0001', entryBy: 'Siddharta Dikshit', entryDate: '05 May 2022' },
    { slNo: 6, company: 'ILICO SERVICES LTD.(vERP)', branch: 'Head Office', storeName: 'Mumbai Branch Store', storeCode: 'MBS', entryBy: 'Siddharta Dikshit', entryDate: '11 Oct 2022' }
  ]);

  toggleSection(key: 'storeDetails') {
    this.sections.update(prev => ({ ...prev, [key]: !prev[key] }));
  }

  updateForm(field: string, value: any) {
    this.formData.update(prev => ({ ...prev, [field]: value }));
  }

  updateSearch(field: string, value: any) {
    this.searchData.update(prev => ({ ...prev, [field]: value }));
  }

  handleSave() {
    console.log('Saving Branch Store...', this.formData());
    if (this.formData().storeName && this.formData().storeCode) {
      alert('Store Saved Successfully!');
      this.formData.update(prev => ({ ...prev, storeName: '', storeCode: '' }));
    } else {
      alert('Please fill mandatory fields!');
    }
  }

  handleReset() {
    this.formData.update(prev => ({ ...prev, storeName: '', storeCode: '' }));
  }

  handleSearch() {
    console.log('Searching Stores...', this.searchData());
  }

  editRow(item: any) {
    this.formData.update(prev => ({
      ...prev,
      storeName: item.storeName,
      storeCode: item.storeCode,
      ccCenter: item.branch
    }));
  }

  toggleRow(item: any) {
    console.log('Toggling active state for', item);
  }

  deleteRow(item: any) {
    console.log('Deleting', item);
  }
}
