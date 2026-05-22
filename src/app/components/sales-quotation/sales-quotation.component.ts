import { Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  LucideAngularModule, 
  Search, Save, RotateCcw, Calculator 
} from 'lucide-angular';

import { ErpInputComponent } from '../shared/erp-input/erp-input.component';
import { ErpSelectComponent } from '../shared/erp-select/erp-select.component';
import { ErpTextareaComponent } from '../shared/erp-textarea/erp-textarea.component';
import { SectionHeaderComponent } from '../shared/section-header/section-header.component';

@Component({
  selector: 'app-sales-quotation',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    LucideAngularModule, 
    ErpInputComponent, 
    ErpSelectComponent,
    ErpTextareaComponent,
    SectionHeaderComponent
  ],
  templateUrl: './sales-quotation.component.html',
  styleUrl: './sales-quotation.component.css'
})
export class SalesQuotationComponent {
  sections = signal({
    entry: true,
    shipping: true,
    customer: true,
    itemSearch: true,
    items: true,
    charges: false,
    tax: true,
    summary: true,
    terms: true,
    search: false
  });

  readonly SearchIcon = Search;
  readonly SaveIcon = Save;
  readonly RotateCcwIcon = RotateCcw;
  readonly CalculatorIcon = Calculator;

  toggleSection(key: keyof ReturnType<typeof this.sections>) {
    this.sections.update(prev => ({ ...prev, [key]: !prev[key] }));
  }
}
