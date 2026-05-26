import { Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  LucideAngularModule, 
  Search, FileText, CheckCircle, XCircle
} from 'lucide-angular';

import { ErpInputComponent } from '../shared/erp-input/erp-input.component';
import { ErpSelectComponent } from '../shared/erp-select/erp-select.component';
import { SectionHeaderComponent } from '../shared/section-header/section-header.component';

interface SearchForm {
  fromDate: string;
  toDate: string;
  company: string;
  ccCenter: string;
  entryBy: string;
  referenceNo: string;
}

@Component({
  selector: 'app-sales-order-approval',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    LucideAngularModule, 
    ErpInputComponent,
    ErpSelectComponent,
    SectionHeaderComponent
  ],
  templateUrl: './sales-order-approval.component.html',
  styleUrl: './sales-order-approval.component.css'
})
export class SalesOrderApprovalComponent {
  // Collapsible cards toggle states
  sections = signal({
    pendingApproval: true,
    processedApproval: true
  });

  // Search forms
  pendingSearchForm: WritableSignal<SearchForm> = signal({
    fromDate: '2026-05-25',
    toDate: '2026-05-25',
    company: 'ILICO SERVICES LTD.(vERP)',
    ccCenter: '',
    entryBy: '',
    referenceNo: ''
  });

  processedSearchForm: WritableSignal<SearchForm> = signal({
    fromDate: '2026-05-25',
    toDate: '2026-05-25',
    company: 'ILICO SERVICES LTD.(vERP)',
    ccCenter: '',
    entryBy: '',
    referenceNo: ''
  });

  // Icons
  readonly SearchIcon = Search;
  readonly FileTextIcon = FileText;
  readonly CheckCircleIcon = CheckCircle;
  readonly XCircleIcon = XCircle;

  // Options
  companyOptions = [
    { label: 'ILICO SERVICES LTD.(vERP)', value: 'ILICO SERVICES LTD.(vERP)' },
    { label: 'Warehouse Group Corp', value: 'Warehouse Group Corp' }
  ];

  ccCenterOptions = [
    { label: 'Select Branch', value: '' },
    { label: 'Bihar', value: 'Bihar' },
    { label: 'Delhi', value: 'Delhi' }
  ];

  employeeOptions = [
    { label: 'Select Employee', value: '' },
    { label: 'Admin', value: 'Admin' },
    { label: 'Sales Rep 1', value: 'Sales Rep 1' }
  ];

  toggleSection(key: 'pendingApproval' | 'processedApproval') {
    this.sections.update(prev => ({ ...prev, [key]: !prev[key] }));
  }

  updatePendingForm(field: keyof SearchForm, value: string) {
    this.pendingSearchForm.update(prev => ({ ...prev, [field]: value }));
  }

  updateProcessedForm(field: keyof SearchForm, value: string) {
    this.processedSearchForm.update(prev => ({ ...prev, [field]: value }));
  }

  handlePendingSearch() {
    console.log('Searching pending sales orders...', this.pendingSearchForm());
  }

  handleProcessedSearch() {
    console.log('Searching processed sales orders...', this.processedSearchForm());
  }
}
