import { Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  LucideAngularModule, 
  Save, RotateCcw, BookOpen
} from 'lucide-angular';

import { ErpInputComponent } from '../shared/erp-input/erp-input.component';
import { ErpSelectComponent } from '../shared/erp-select/erp-select.component';
import { ErpTextareaComponent } from '../shared/erp-textarea/erp-textarea.component';
import { SectionHeaderComponent } from '../shared/section-header/section-header.component';
import { HsnTableComponent } from '../hsn-table/hsn-table.component';

interface HsnForm {
  hsnCode: string;
  description: string;
  taxPercentageType: string;
  taxPercentage: string;
  type: string;
}

@Component({
  selector: 'app-hsn-master',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    LucideAngularModule, 
    ErpInputComponent, 
    ErpSelectComponent,
    ErpTextareaComponent,
    SectionHeaderComponent, 
    HsnTableComponent
  ],
  templateUrl: './hsn-master.component.html',
  styleUrl: './hsn-master.component.css'
})
export class HsnMasterComponent {
  sections = signal({
    details: true,
    table: true
  });

  formData: WritableSignal<HsnForm> = signal({
    hsnCode: '',
    description: '',
    taxPercentageType: '',
    taxPercentage: '',
    type: ''
  });

  readonly SaveIcon = Save;
  readonly RotateCcwIcon = RotateCcw;
  readonly BookOpenIcon = BookOpen;

  taxTypeOptions = [
    { label: 'Non Zero Rated', value: 'Non Zero Rated' },
    { label: 'Zero Rated', value: 'Zero Rated' },
    { label: 'Exempted', value: 'Exempted' }
  ];

  typeOptions = [
    { label: 'HSN', value: 'HSN' },
    { label: 'SAC', value: 'SAC' }
  ];

  toggleSection(key: 'details' | 'table') {
    this.sections.update(prev => ({ ...prev, [key]: !prev[key] }));
  }

  updateForm(field: keyof HsnForm, value: string) {
    this.formData.update(prev => ({ ...prev, [field]: value }));
  }

  handleReset() {
    this.formData.set({
      hsnCode: '',
      description: '',
      taxPercentageType: '',
      taxPercentage: '',
      type: ''
    });
  }
}
