import { Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  LucideAngularModule, 
  Save, RotateCcw, UserCircle2, Search
} from 'lucide-angular';

import { ErpInputComponent } from '../shared/erp-input/erp-input.component';
import { ErpSelectComponent } from '../shared/erp-select/erp-select.component';
import { ErpTextareaComponent } from '../shared/erp-textarea/erp-textarea.component';
import { SectionHeaderComponent } from '../shared/section-header/section-header.component';
import { DesignationTableComponent } from '../designation-table/designation-table.component';

interface DesignationForm {
  company: string;
  ccCenter: string;
  department: string;
  designation: string;
  description: string;
}

@Component({
  selector: 'app-designation-master',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    LucideAngularModule, 
    ErpInputComponent, 
    ErpSelectComponent,
    ErpTextareaComponent,
    SectionHeaderComponent, 
    DesignationTableComponent
  ],
  templateUrl: './designation-master.component.html',
  styleUrl: './designation-master.component.css'
})
export class DesignationMasterComponent {
  sections = signal({
    info: true,
    search: true,
    table: true
  });

  formData: WritableSignal<DesignationForm> = signal({
    company: '',
    ccCenter: '',
    department: '',
    designation: '',
    description: '',
  });

  readonly SaveIcon = Save;
  readonly RotateCcwIcon = RotateCcw;
  readonly SearchIcon = Search;

  companyOptions = [{label: 'Horeca Global', value: 'HORECA_GLB'}];
  ccCenterOptions = [{label: 'CC-01 North', value: 'CC-01'}];
  departmentOptions = [{label: 'Human Resources', value: 'HR'}];

  toggleSection(key: 'info' | 'search' | 'table') {
    this.sections.update(prev => ({ ...prev, [key]: !prev[key] }));
  }

  updateForm(field: keyof DesignationForm, value: string) {
    this.formData.update(prev => ({ ...prev, [field]: value }));
  }

  handleReset() {
    this.formData.set({
      company: '',
      ccCenter: '',
      department: '',
      designation: '',
      description: '',
    });
  }
}
