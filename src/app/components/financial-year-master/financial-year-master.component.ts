import { Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  LucideAngularModule, 
  Save, RotateCcw, CalendarClock, Search 
} from 'lucide-angular';

import { ErpInputComponent } from '../shared/erp-input/erp-input.component';
import { ErpSelectComponent } from '../shared/erp-select/erp-select.component';
import { SectionHeaderComponent } from '../shared/section-header/section-header.component';
import { FinancialYearTableComponent } from '../financial-year-table/financial-year-table.component';

interface FinancialYearForm {
  company: string;
  terms: string;
  isActive: boolean;
}

@Component({
  selector: 'app-financial-year-master',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    LucideAngularModule, 
    ErpInputComponent, 
    ErpSelectComponent,
    SectionHeaderComponent, 
    FinancialYearTableComponent
  ],
  templateUrl: './financial-year-master.component.html',
  styleUrl: './financial-year-master.component.css'
})
export class FinancialYearMasterComponent {
  sections = signal({
    config: true,
    search: true,
    table: true
  });

  formData: WritableSignal<FinancialYearForm> = signal({
    company: '',
    terms: '',
    isActive: true,
  });

  readonly SaveIcon = Save;
  readonly RotateCcwIcon = RotateCcw;
  readonly SearchIcon = Search;

  // Options for Company Select
  companyOptions = [
    { label: 'HORECA ERP Solutions', value: 'HORECA' }, 
    { label: 'Global Distribution Ltd', value: 'Global' }
  ];

  toggleSection(key: 'config' | 'search' | 'table') {
    this.sections.update(prev => ({ ...prev, [key]: !prev[key] }));
  }

  updateForm(field: keyof FinancialYearForm, value: string | boolean) {
    this.formData.update(prev => ({ ...prev, [field]: value }));
  }

  handleReset() {
    this.formData.set({
      company: '',
      terms: '',
      isActive: true,
    });
  }
}
