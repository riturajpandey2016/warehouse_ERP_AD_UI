import { Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  LucideAngularModule, 
  Search, FileText
} from 'lucide-angular';

import { ErpInputComponent } from '../shared/erp-input/erp-input.component';
import { ErpSelectComponent } from '../shared/erp-select/erp-select.component';
import { SectionHeaderComponent } from '../shared/section-header/section-header.component';

interface SearchForm {
  searchByMode: string;
  ccCenter: string;
  customer: string;
  fromDate: string;
  toDate: string;
}

@Component({
  selector: 'app-sales-despatch',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    LucideAngularModule, 
    ErpInputComponent,
    ErpSelectComponent,
    SectionHeaderComponent
  ],
  templateUrl: './sales-despatch.component.html',
  styleUrl: './sales-despatch.component.css'
})
export class SalesDespatchComponent {
  // Collapsible cards toggle states
  sections = signal({
    searchFilters: true
  });

  // Search form
  searchForm: WritableSignal<SearchForm> = signal({
    searchByMode: 'Select CC Center / Customer',
    ccCenter: 'Head Office',
    customer: '',
    fromDate: '2026-05-01',
    toDate: '2026-05-31'
  });

  // Icons
  readonly SearchIcon = Search;
  readonly FileTextIcon = FileText;

  // Options
  searchByOptions = [
    { label: 'Select CC Center / Customer', value: 'Select CC Center / Customer' },
    { label: 'By Invoice', value: 'By Invoice' }
  ];

  ccCenterOptions = [
    { label: 'Select Branch', value: '' },
    { label: 'Head Office', value: 'Head Office' },
    { label: 'Bihar', value: 'Bihar' },
    { label: 'Delhi', value: 'Delhi' }
  ];

  customerOptions = [
    { label: 'Select Customer', value: '' },
    { label: 'Customer A', value: 'Customer A' },
    { label: 'Customer B', value: 'Customer B' }
  ];

  toggleSection(key: 'searchFilters') {
    this.sections.update(prev => ({ ...prev, [key]: !prev[key] }));
  }

  updateForm(field: keyof SearchForm, value: string) {
    this.searchForm.update(prev => ({ ...prev, [field]: value }));
  }

  handleSearch() {
    console.log('Searching Sales Despatch...', this.searchForm());
  }
}
