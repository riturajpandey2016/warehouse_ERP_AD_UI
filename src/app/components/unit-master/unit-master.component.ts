import { Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  LucideAngularModule, 
  Save, RotateCcw, Scale
} from 'lucide-angular';

import { ErpInputComponent } from '../shared/erp-input/erp-input.component';
import { SectionHeaderComponent } from '../shared/section-header/section-header.component';
import { UnitTableComponent } from '../unit-table/unit-table.component';

interface UnitForm {
  unit: string;
  description: string;
}

@Component({
  selector: 'app-unit-master',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    LucideAngularModule, 
    ErpInputComponent, 
    SectionHeaderComponent, 
    UnitTableComponent
  ],
  templateUrl: './unit-master.component.html',
  styleUrl: './unit-master.component.css'
})
export class UnitMasterComponent {
  sections = signal({
    details: true,
    table: true
  });

  formData: WritableSignal<UnitForm> = signal({
    unit: '',
    description: ''
  });

  readonly SaveIcon = Save;
  readonly RotateCcwIcon = RotateCcw;
  readonly ScaleIcon = Scale;

  toggleSection(key: 'details' | 'table') {
    this.sections.update(prev => ({ ...prev, [key]: !prev[key] }));
  }

  updateForm(field: keyof UnitForm, value: string) {
    this.formData.update(prev => ({ ...prev, [field]: value }));
  }

  handleReset() {
    this.formData.set({
      unit: '',
      description: ''
    });
  }
}
