import { Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  LucideAngularModule, 
  Save, RotateCcw, Search, PlusCircle
} from 'lucide-angular';

import { ErpInputComponent } from '../shared/erp-input/erp-input.component';
import { ErpSelectComponent } from '../shared/erp-select/erp-select.component';
import { ErpTextareaComponent } from '../shared/erp-textarea/erp-textarea.component';
import { SectionHeaderComponent } from '../shared/section-header/section-header.component';

interface ChecklistForm {
  ccCenter: string;
  quotationNo: string;
  reviewDate: string;
  customerName: string;
  reviewerName: string;
  remarks: string;
}

@Component({
  selector: 'app-contrat-review-check-list-entry',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    LucideAngularModule, 
    ErpInputComponent,
    ErpSelectComponent,
    ErpTextareaComponent,
    SectionHeaderComponent
  ],
  templateUrl: './contrat-review-check-list-entry.component.html',
  styleUrl: './contrat-review-check-list-entry.component.css'
})
export class ContratReviewCheckListEntryComponent {
  sections = signal({
    form: true,
    list: true
  });

  formData: WritableSignal<ChecklistForm> = signal({
    ccCenter: '',
    quotationNo: '',
    reviewDate: new Date().toISOString().split('T')[0],
    customerName: '',
    reviewerName: '',
    remarks: ''
  });

  readonly SaveIcon = Save;
  readonly RotateCcwIcon = RotateCcw;
  readonly SearchIcon = Search;
  readonly PlusCircleIcon = PlusCircle;

  ccCenterOptions = [
    { label: 'Select Branch', value: '' },
    { label: 'Bihar', value: 'Bihar' },
    { label: 'Delhi', value: 'Delhi' },
    { label: 'Mumbai', value: 'Mumbai' }
  ];

  quotationOptions = [
    { label: 'Select Quotation', value: '' },
    { label: 'QTN-2026-001', value: 'QTN-2026-001' },
    { label: 'QTN-2026-002', value: 'QTN-2026-002' }
  ];

  toggleSection(key: 'form' | 'list') {
    this.sections.update(prev => ({ ...prev, [key]: !prev[key] }));
  }

  updateForm(field: keyof ChecklistForm, value: string) {
    this.formData.update(prev => ({ ...prev, [field]: value }));
  }

  handleSave() {
    console.log('Saving Contract Review...', this.formData());
    alert('Contract Review Checklist Saved Successfully!');
  }

  handleReset() {
    this.formData.set({
      ccCenter: '',
      quotationNo: '',
      reviewDate: new Date().toISOString().split('T')[0],
      customerName: '',
      reviewerName: '',
      remarks: ''
    });
  }
}
