import { Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  LucideAngularModule, 
  Save, RotateCcw, Layers
} from 'lucide-angular';

import { ErpInputComponent } from '../shared/erp-input/erp-input.component';
import { ErpSelectComponent } from '../shared/erp-select/erp-select.component';
import { SectionHeaderComponent } from '../shared/section-header/section-header.component';
import { UomGroupTableComponent } from '../uom-group-table/uom-group-table.component';

interface UomGroupForm {
  groupName: string;
  baseUom: string;
  description: string;
}

@Component({
  selector: 'app-uom-group-setup',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    LucideAngularModule, 
    ErpInputComponent, 
    ErpSelectComponent,
    SectionHeaderComponent, 
    UomGroupTableComponent
  ],
  templateUrl: './uom-group-setup.component.html',
  styleUrl: './uom-group-setup.component.css'
})
export class UomGroupSetupComponent {
  sections = signal({
    details: true,
    table: true
  });

  formData: WritableSignal<UomGroupForm> = signal({
    groupName: '',
    baseUom: '',
    description: ''
  });

  readonly SaveIcon = Save;
  readonly RotateCcwIcon = RotateCcw;
  readonly LayersIcon = Layers;

  uomOptions = [
    { label: 'Kg', value: 'Kg' },
    { label: 'Ltr', value: 'Ltr' },
    { label: 'Mtr', value: 'Mtr' },
    { label: 'Pcs', value: 'Pcs' },
    { label: 'Set', value: 'Set' },
    { label: 'Pkt', value: 'Pkt' },
    { label: 'Roll', value: 'Roll' }
  ];

  toggleSection(key: 'details' | 'table') {
    this.sections.update(prev => ({ ...prev, [key]: !prev[key] }));
  }

  updateForm(field: keyof UomGroupForm, value: string) {
    this.formData.update(prev => ({ ...prev, [field]: value }));
  }

  handleReset() {
    this.formData.set({
      groupName: '',
      baseUom: '',
      description: ''
    });
  }
}
