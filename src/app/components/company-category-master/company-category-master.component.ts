import { Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  LucideAngularModule, 
  Save, RotateCcw, Briefcase 
} from 'lucide-angular';

import { ErpInputComponent } from '../shared/erp-input/erp-input.component';
import { ErpTextareaComponent } from '../shared/erp-textarea/erp-textarea.component';
import { SectionHeaderComponent } from '../shared/section-header/section-header.component';
import { CompanyCategoryTableComponent } from '../company-category-table/company-category-table.component';

interface CompanyCategoryForm {
  companyCategory: string;
  description: string;
  entryDate: string;
}

@Component({
  selector: 'app-company-category-master',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    LucideAngularModule, 
    ErpInputComponent, 
    ErpTextareaComponent,
    SectionHeaderComponent, 
    CompanyCategoryTableComponent
  ],
  templateUrl: './company-category-master.component.html',
  styleUrl: './company-category-master.component.css'
})
export class CompanyCategoryMasterComponent {
  sections = signal({
    details: true,
    table: true
  });

  formData: WritableSignal<CompanyCategoryForm> = signal({
    companyCategory: '',
    description: '',
    entryDate: new Date().toISOString().split('T')[0],
  });

  readonly SaveIcon = Save;
  readonly RotateCcwIcon = RotateCcw;
  readonly BriefcaseIcon = Briefcase;

  toggleSection(key: 'details' | 'table') {
    this.sections.update(prev => ({ ...prev, [key]: !prev[key] }));
  }

  updateForm(field: keyof CompanyCategoryForm, value: string) {
    this.formData.update(prev => ({ ...prev, [field]: value }));
  }

  handleSave() {
    if (!this.formData().companyCategory.trim()) {
      alert('Company Category is required!');
      return;
    }
    console.log('Saving Company Category Data...', this.formData());
    alert('Company Category Saved Successfully!');
  }

  handleReset() {
    this.formData.set({
      companyCategory: '',
      description: '',
      entryDate: new Date().toISOString().split('T')[0],
    });
  }
}
