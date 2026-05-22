import { Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  LucideAngularModule, 
  Save, RotateCcw, ClipboardSignature, Search
} from 'lucide-angular';

import { ErpSelectComponent } from '../shared/erp-select/erp-select.component';
import { ErpTextareaComponent } from '../shared/erp-textarea/erp-textarea.component';
import { SectionHeaderComponent } from '../shared/section-header/section-header.component';
import { TermsConditionsTableComponent } from '../terms-conditions-table/terms-conditions-table.component';

interface TermsForm {
  moduleName: string;
  pageName: string;
  termsText: string;
}

@Component({
  selector: 'app-terms-conditions-master',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    LucideAngularModule, 
    ErpSelectComponent,
    ErpTextareaComponent,
    SectionHeaderComponent, 
    TermsConditionsTableComponent
  ],
  templateUrl: './terms-conditions-master.component.html',
  styleUrl: './terms-conditions-master.component.css'
})
export class TermsConditionsMasterComponent {
  sections = signal({
    info: true,
    table: true
  });

  formData: WritableSignal<TermsForm> = signal({
    moduleName: '',
    pageName: '',
    termsText: '',
  });

  readonly SaveIcon = Save;
  readonly RotateCcwIcon = RotateCcw;
  readonly ClipboardSignatureIcon = ClipboardSignature;
  readonly SearchIcon = Search;

  moduleOptions = [
    { label: 'Select Module', value: '' },
    { label: 'Sales', value: 'Sales' },
    { label: 'Purchase', value: 'Purchase' }
  ];

  pageOptions = [
    { label: 'Select Page', value: '' },
    { label: 'Sales Qutation Report', value: 'Sales Qutation Report' },
    { label: 'Forwarding Letter', value: 'Forwarding Letter' },
    { label: 'Purchase Job Order Report', value: 'Purchase Job Order Report' },
    { label: 'Delivery Challan Print', value: 'Delivery Challan Print' },
    { label: 'Debit Note', value: 'Debit Note' }
  ];

  toggleSection(key: 'info' | 'table') {
    this.sections.update(prev => ({ ...prev, [key]: !prev[key] }));
  }

  updateForm(field: keyof TermsForm, value: string) {
    this.formData.update(prev => ({ ...prev, [field]: value }));
  }

  handleReset() {
    this.formData.set({
      moduleName: '',
      pageName: '',
      termsText: '',
    });
  }
}
