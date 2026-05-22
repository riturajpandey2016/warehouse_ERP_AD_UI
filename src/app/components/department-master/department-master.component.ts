import { Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  LucideAngularModule, 
  Save, RotateCcw, Building2, Search
} from 'lucide-angular';

import { ErpInputComponent } from '../shared/erp-input/erp-input.component';
import { ErpSelectComponent } from '../shared/erp-select/erp-select.component';
import { ErpTextareaComponent } from '../shared/erp-textarea/erp-textarea.component';
import { SectionHeaderComponent } from '../shared/section-header/section-header.component';
import { DepartmentTableComponent } from '../department-table/department-table.component';

interface DepartmentForm {
  company: string;
  ccCenter: string;
  departmentName: string;
  description: string;
  date: string;
}

@Component({
  selector: 'app-department-master',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    LucideAngularModule, 
    ErpInputComponent, 
    ErpSelectComponent,
    ErpTextareaComponent,
    SectionHeaderComponent, 
    DepartmentTableComponent
  ],
  templateUrl: './department-master.component.html',
  styleUrl: './department-master.component.css'
})
export class DepartmentMasterComponent {
  sections = signal({
    info: true,
    search: true,
    table: true
  });

  formData: WritableSignal<DepartmentForm> = signal({
    company: '',
    ccCenter: '',
    departmentName: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
  });

  readonly SaveIcon = Save;
  readonly RotateCcwIcon = RotateCcw;
  readonly SearchIcon = Search;

  companyOptions = [{label: 'Horeca Global', value: 'HORECA_GLB'}];
  ccCenterOptions = [{label: 'CC-01 North', value: 'CC-01'}];

  toggleSection(key: 'info' | 'search' | 'table') {
    this.sections.update(prev => ({ ...prev, [key]: !prev[key] }));
  }

  updateForm(field: keyof DepartmentForm, value: string) {
    this.formData.update(prev => ({ ...prev, [field]: value }));
  }

  handleReset() {
    this.formData.set({
      company: '',
      ccCenter: '',
      departmentName: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
    });
  }
}
