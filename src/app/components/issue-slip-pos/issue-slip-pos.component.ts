import { Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  LucideAngularModule, 
  Save, RotateCcw, Search, Edit, XCircle, FileSpreadsheet
} from 'lucide-angular';

import { ErpSelectComponent } from '../shared/erp-select/erp-select.component';
import { SectionHeaderComponent } from '../shared/section-header/section-header.component';

@Component({
  selector: 'app-issue-slip-pos',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    LucideAngularModule, 
    ErpSelectComponent,
    SectionHeaderComponent
  ],
  templateUrl: './issue-slip-pos.component.html',
  styleUrl: './issue-slip-pos.component.css'
})
export class IssueSlipPosComponent {
  sections = signal({
    issueEntryDetails: true,
    selectedItemDetails: true,
    searchContents: true
  });

  // Entry Form
  formData = signal({
    type: 'Against POS Requisition',
    issueDate: '25 May 2026',
    company: 'ILICO SERVICES LTD.(vERP)',
    ccCenter: '',
    store: '',
    remarks: ''
  });

  // Search Form
  searchData = signal({
    fromDate: '01 May 2026',
    toDate: '25 May 2026',
    company: 'ILICO SERVICES LTD.(vERP)',
    ccCenter: '',
    store: '',
    referenceNo: ''
  });

  // Icons
  readonly SaveIcon = Save;
  readonly RotateCcwIcon = RotateCcw;
  readonly SearchIcon = Search;
  readonly EditIcon = Edit;
  readonly XCircleIcon = XCircle;
  readonly FileSpreadsheetIcon = FileSpreadsheet;

  companyOptions = [
    { label: 'ILICO SERVICES LTD.(vERP)', value: 'ILICO SERVICES LTD.(vERP)' }
  ];

  ccCenterOptions = [
    { label: '--Select CC Center Name--', value: '' },
    { label: 'Head Office', value: 'Head Office' }
  ];

  storeOptions = [
    { label: '--Select Store--', value: '' },
    { label: 'Mumbai Branch Store', value: 'Mumbai Branch Store' },
    { label: 'NewTown Branch', value: 'NewTown Branch' },
    { label: 'Kolkata Branch', value: 'Kolkata Branch' }
  ];

  // Mock Table Data
  tableData = signal([
    { slNo: 1, refNo: 'ISLISP22-23/00002', type: 'Against POS Requisition', branch: 'Head Office', storeName: 'Mumbai Branch Store', issueDate: '11 Oct 2022', entryBy: 'Siddharta Dikshit', entryDate: '11 Oct 2022' },
    { slNo: 2, refNo: 'ISLISP22-23/00001', type: 'Direct Issue', branch: 'Head Office', storeName: 'NewTown Branch', issueDate: '08 Jul 2022', entryBy: 'Siddharta Dikshit', entryDate: '08 Jul 2022' },
    { slNo: 3, refNo: 'ISLISP21-22/00001', type: 'Against POS Requisition', branch: 'Head Office', storeName: 'Kolkata Branch', issueDate: '31 Mar 2022', entryBy: 'Siddharta Dikshit', entryDate: '01 Apr 2022' },
    { slNo: 4, refNo: 'ISLISP21-22/00003', type: 'Direct Issue', branch: 'Head Office', storeName: 'Kolkata Branch', issueDate: '31 Mar 2022', entryBy: 'Siddharta Dikshit', entryDate: '01 Apr 2022' },
    { slNo: 5, refNo: 'ISLISP21-22/00004', type: 'Direct Issue', branch: 'Head Office', storeName: 'NewTown Branch', issueDate: '31 Mar 2022', entryBy: 'Siddharta Dikshit', entryDate: '02 Apr 2022' }
  ]);

  toggleSection(key: 'issueEntryDetails' | 'selectedItemDetails' | 'searchContents') {
    this.sections.update(prev => ({ ...prev, [key]: !prev[key] }));
  }

  updateForm(field: string, value: any) {
    this.formData.update(prev => ({ ...prev, [field]: value }));
  }

  updateSearch(field: string, value: any) {
    this.searchData.update(prev => ({ ...prev, [field]: value }));
  }

  handleSave() {
    console.log('Saving Issue Slip...', this.formData());
    alert('Issue Slip Saved Successfully!');
  }

  handleReset() {
    console.log('Resetting form');
  }

  handleSearch() {
    console.log('Searching Issue Slips...', this.searchData());
  }

  editRow(item: any) {
    console.log('Editing', item);
  }

  deleteRow(item: any) {
    console.log('Deleting', item);
  }
  
  viewDetails(item: any) {
    console.log('Viewing details', item);
  }
}
