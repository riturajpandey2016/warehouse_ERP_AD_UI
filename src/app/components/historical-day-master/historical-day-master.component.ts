import { Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  LucideAngularModule, 
  Save, RotateCcw, Calendar, Globe 
} from 'lucide-angular';

import { ErpInputComponent } from '../shared/erp-input/erp-input.component';
import { ErpSelectComponent } from '../shared/erp-select/erp-select.component';
import { ErpTextareaComponent } from '../shared/erp-textarea/erp-textarea.component';
import { SectionHeaderComponent } from '../shared/section-header/section-header.component';
import { HistoricalDayTableComponent } from '../historical-day-table/historical-day-table.component';

interface HistoricalDayForm {
  country: string;
  date: string;
  header: string;
  description: string;
  isActive: boolean;
}

@Component({
  selector: 'app-historical-day-master',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    LucideAngularModule, 
    ErpInputComponent, 
    ErpSelectComponent,
    ErpTextareaComponent,
    SectionHeaderComponent, 
    HistoricalDayTableComponent
  ],
  templateUrl: './historical-day-master.component.html',
  styleUrl: './historical-day-master.component.css'
})
export class HistoricalDayMasterComponent {
  sections = signal({
    details: true,
    table: true
  });

  formData: WritableSignal<HistoricalDayForm> = signal({
    country: '',
    date: '',
    header: '',
    description: '',
    isActive: true,
  });

  readonly SaveIcon = Save;
  readonly RotateCcwIcon = RotateCcw;
  readonly GlobeIcon = Globe;
  readonly CalendarIcon = Calendar;

  countryOptions = [
    { label: 'India', value: 'IN' }, 
    { label: 'United States', value: 'US' },
    { label: 'United Kingdom', value: 'UK' },
    { label: 'United Arab Emirates', value: 'UAE' }
  ];

  toggleSection(key: 'details' | 'table') {
    this.sections.update(prev => ({ ...prev, [key]: !prev[key] }));
  }

  updateForm(field: keyof HistoricalDayForm, value: string | boolean) {
    this.formData.update(prev => ({ ...prev, [field]: value }));
  }

  handleReset() {
    this.formData.set({
      country: '',
      date: '',
      header: '',
      description: '',
      isActive: true,
    });
  }
}
