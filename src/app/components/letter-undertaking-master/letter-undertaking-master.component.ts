import { Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  LucideAngularModule, 
  Save, Edit, RotateCcw, FileSpreadsheet, Download, FileText
} from 'lucide-angular';

import { ErpInputComponent } from '../shared/erp-input/erp-input.component';
import { ErpSelectComponent } from '../shared/erp-select/erp-select.component';
import { ErpTextareaComponent } from '../shared/erp-textarea/erp-textarea.component';
import { SectionHeaderComponent } from '../shared/section-header/section-header.component';
import { LetterUndertakingTableComponent } from '../letter-undertaking-table/letter-undertaking-table.component';

interface LutForm {
  targetBranch: string;
  finSession: string;
  arnNo: string;
  description: string;
}

@Component({
  selector: 'app-letter-undertaking-master',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    LucideAngularModule, 
    ErpInputComponent, 
    ErpSelectComponent,
    ErpTextareaComponent,
    SectionHeaderComponent, 
    LetterUndertakingTableComponent
  ],
  templateUrl: './letter-undertaking-master.component.html',
  styleUrl: './letter-undertaking-master.component.css'
})
export class LetterUndertakingMasterComponent {
  sections = signal({
    info: true,
    table: true
  });

  formData: WritableSignal<LutForm> = signal({
    targetBranch: '',
    finSession: '',
    arnNo: '',
    description: '',
  });

  readonly SaveIcon = Save;
  readonly EditIcon = Edit;
  readonly RotateCcwIcon = RotateCcw;
  readonly FileSpreadsheetIcon = FileSpreadsheet;
  readonly DownloadIcon = Download;
  readonly FileTextIcon = FileText;

  branchOptions = [
    { label: '--Select--', value: '' },
    { label: 'HEAD OFFICE', value: 'HEAD OFFICE' },
    { label: 'WAREHOUSE A', value: 'WAREHOUSE A' },
    { label: 'FACTORY UNIT 1', value: 'FACTORY UNIT 1' }
  ];

  finSessionOptions = [
    { label: '--Select--', value: '' },
    { label: '2024-2025', value: '2024-2025' },
    { label: '2023-2024', value: '2023-2024' }
  ];

  toggleSection(key: 'info' | 'table') {
    this.sections.update(prev => ({ ...prev, [key]: !prev[key] }));
  }

  updateForm(field: keyof LutForm, value: string) {
    this.formData.update(prev => ({ ...prev, [field]: value }));
  }

  handleReset() {
    this.formData.set({
      targetBranch: '',
      finSession: '',
      arnNo: '',
      description: '',
    });
  }
}
