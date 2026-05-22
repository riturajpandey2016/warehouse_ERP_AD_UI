import { Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  LucideAngularModule, 
  Save, RotateCcw, ShieldCheck, Search
} from 'lucide-angular';

import { ErpInputComponent } from '../shared/erp-input/erp-input.component';
import { ErpSelectComponent } from '../shared/erp-select/erp-select.component';
import { ErpTextareaComponent } from '../shared/erp-textarea/erp-textarea.component';
import { SectionHeaderComponent } from '../shared/section-header/section-header.component';
import { AdCodeTableComponent } from '../ad-code-table/ad-code-table.component';

interface AdForm {
  branch: string;
  adCode: string;
  description: string;
}

@Component({
  selector: 'app-ad-code-master',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    LucideAngularModule, 
    ErpInputComponent, 
    ErpSelectComponent,
    ErpTextareaComponent,
    SectionHeaderComponent, 
    AdCodeTableComponent
  ],
  templateUrl: './ad-code-master.component.html',
  styleUrl: './ad-code-master.component.css'
})
export class AdCodeMasterComponent {
  sections = signal({
    info: true,
    table: true
  });

  formData: WritableSignal<AdForm> = signal({
    branch: '',
    adCode: '',
    description: '',
  });

  readonly SaveIcon = Save;
  readonly RotateCcwIcon = RotateCcw;
  readonly ShieldCheckIcon = ShieldCheck;
  readonly SearchIcon = Search;

  branchOptions = [
    { label: '---Select Branch---', value: '' },
    { label: 'Head Office', value: 'Head Office' },
    { label: 'Warehouse A', value: 'Warehouse A' },
    { label: 'Factory Unit 1', value: 'Factory Unit 1' }
  ];

  toggleSection(key: 'info' | 'table') {
    this.sections.update(prev => ({ ...prev, [key]: !prev[key] }));
  }

  updateForm(field: keyof AdForm, value: string) {
    this.formData.update(prev => ({ ...prev, [field]: value }));
  }

  handleReset() {
    this.formData.set({
      branch: '',
      adCode: '',
      description: '',
    });
  }
}
