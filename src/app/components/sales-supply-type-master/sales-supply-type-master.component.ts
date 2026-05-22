import { Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  LucideAngularModule, 
  Save, RotateCcw, Layers, Search 
} from 'lucide-angular';

import { ErpInputComponent } from '../shared/erp-input/erp-input.component';
import { ErpTextareaComponent } from '../shared/erp-textarea/erp-textarea.component';
import { SectionHeaderComponent } from '../shared/section-header/section-header.component';
import { SalesSupplyTypeTableComponent } from '../sales-supply-type-table/sales-supply-type-table.component';

interface TypeForm {
  salesType: string;
  description: string;
}

@Component({
  selector: 'app-sales-supply-type-master',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    LucideAngularModule, 
    ErpInputComponent, 
    ErpTextareaComponent,
    SectionHeaderComponent, 
    SalesSupplyTypeTableComponent
  ],
  templateUrl: './sales-supply-type-master.component.html',
  styleUrl: './sales-supply-type-master.component.css'
})
export class SalesSupplyTypeMasterComponent {
  sections = signal({
    info: true,
    search: true,
    table: true
  });

  formData: WritableSignal<TypeForm> = signal({
    salesType: '',
    description: '',
  });

  readonly SaveIcon = Save;
  readonly RotateCcwIcon = RotateCcw;
  readonly LayersIcon = Layers;
  readonly SearchIcon = Search;

  toggleSection(key: 'info' | 'search' | 'table') {
    this.sections.update(prev => ({ ...prev, [key]: !prev[key] }));
  }

  updateForm(field: keyof TypeForm, value: string) {
    this.formData.update(prev => ({ ...prev, [field]: value }));
  }

  handleReset() {
    this.formData.set({
      salesType: '',
      description: '',
    });
  }
}
