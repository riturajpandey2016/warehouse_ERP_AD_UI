import { Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  LucideAngularModule, 
  Save, RotateCcw, Search, Edit, XCircle
} from 'lucide-angular';

import { ErpSelectComponent } from '../shared/erp-select/erp-select.component';
import { SectionHeaderComponent } from '../shared/section-header/section-header.component';

@Component({
  selector: 'app-store-requisition',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    LucideAngularModule, 
    ErpSelectComponent,
    SectionHeaderComponent
  ],
  templateUrl: './store-requisition.component.html',
  styleUrl: './store-requisition.component.css'
})
export class StoreRequisitionComponent {
  sections = signal({
    itemDetails: true,
    selectedItemDetails: true,
    requisitionDetails: true
  });

  // Entry Form
  formData = signal({
    entryDate: '25 May 2026',
    company: 'ILICO SERVICES LTD.(vERP)',
    branch: '',
    store: '',
    remarks: ''
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
  readonly XCircleIcon = XCircle;

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
  tableData = signal<any[]>([]); // Empty as per screenshot

  toggleSection(key: 'itemDetails' | 'selectedItemDetails' | 'requisitionDetails') {
    this.sections.update(prev => ({ ...prev, [key]: !prev[key] }));
  }

  updateForm(field: string, value: any) {
    this.formData.update(prev => ({ ...prev, [field]: value }));
  }

  updateSearch(field: string, value: any) {
    this.searchData.update(prev => ({ ...prev, [field]: value }));
  }

  handleSave() {
    console.log('Saving Requisition...', this.formData());
    alert('Requisition Saved Successfully!');
  }

  handleReset() {
    console.log('Resetting form');
  }

  handleSearch() {
    console.log('Searching Requisitions...', this.searchData());
  }

  editRow(item: any) {
    console.log('Editing', item);
  }

  deleteRow(item: any) {
    console.log('Deleting', item);
  }
}
