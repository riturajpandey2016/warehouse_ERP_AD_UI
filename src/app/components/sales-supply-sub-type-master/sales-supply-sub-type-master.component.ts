import { Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  LucideAngularModule, 
  Save, RotateCcw, Layers, Search 
} from 'lucide-angular';

import { ErpInputComponent } from '../shared/erp-input/erp-input.component';
import { ErpSelectComponent } from '../shared/erp-select/erp-select.component';
import { ErpTextareaComponent } from '../shared/erp-textarea/erp-textarea.component';
import { SectionHeaderComponent } from '../shared/section-header/section-header.component';
import { SalesSupplySubTypeTableComponent } from '../sales-supply-sub-type-table/sales-supply-sub-type-table.component';

interface SubTypeForm {
  supplyType: string;
  subType: string;
  description: string;
}

@Component({
  selector: 'app-sales-supply-sub-type-master',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    LucideAngularModule, 
    ErpInputComponent, 
    ErpSelectComponent,
    ErpTextareaComponent,
    SectionHeaderComponent, 
    SalesSupplySubTypeTableComponent
  ],
  templateUrl: './sales-supply-sub-type-master.component.html',
  styleUrl: './sales-supply-sub-type-master.component.css'
})
export class SalesSupplySubTypeMasterComponent {
  sections = signal({
    info: true,
    search: true,
    table: true
  });

  formData: WritableSignal<SubTypeForm> = signal({
    supplyType: '',
    subType: '',
    description: '',
  });

  readonly SaveIcon = Save;
  readonly RotateCcwIcon = RotateCcw;
  readonly LayersIcon = Layers;
  readonly SearchIcon = Search;

  supplyTypeOptions = [
    { label: '--Select--', value: '' },
    { label: 'Export', value: 'Export' }, 
    { label: 'Inter-State', value: 'Inter-State' },
    { label: 'Intra-State', value: 'Intra-State' }
  ];

  toggleSection(key: 'info' | 'search' | 'table') {
    this.sections.update(prev => ({ ...prev, [key]: !prev[key] }));
  }

  updateForm(field: keyof SubTypeForm, value: string) {
    this.formData.update(prev => ({ ...prev, [field]: value }));
  }

  handleReset() {
    this.formData.set({
      supplyType: '',
      subType: '',
      description: '',
    });
  }
}
