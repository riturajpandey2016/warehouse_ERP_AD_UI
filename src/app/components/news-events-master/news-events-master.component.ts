import { Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  LucideAngularModule, 
  Save, RotateCcw, Megaphone, Search, Filter
} from 'lucide-angular';

import { ErpInputComponent } from '../shared/erp-input/erp-input.component';
import { ErpSelectComponent } from '../shared/erp-select/erp-select.component';
import { ErpTextareaComponent } from '../shared/erp-textarea/erp-textarea.component';
import { SectionHeaderComponent } from '../shared/section-header/section-header.component';
import { NewsEventsTableComponent } from '../news-events-table/news-events-table.component';

interface NewsForm {
  company: string;
  eventDate: string;
  ccCenter: string;
  department: string;
  announcement: string;
}

interface FilterForm {
  company: string;
  ccCenter: string;
  date: string;
}

@Component({
  selector: 'app-news-events-master',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    LucideAngularModule, 
    ErpInputComponent, 
    ErpSelectComponent,
    ErpTextareaComponent,
    SectionHeaderComponent, 
    NewsEventsTableComponent
  ],
  templateUrl: './news-events-master.component.html',
  styleUrl: './news-events-master.component.css'
})
export class NewsEventsMasterComponent {
  sections = signal({
    info: true,
    filter: true,
    table: true
  });

  formData: WritableSignal<NewsForm> = signal({
    company: '',
    eventDate: '',
    ccCenter: '',
    department: '',
    announcement: '',
  });

  filterData: WritableSignal<FilterForm> = signal({
    company: '',
    ccCenter: '',
    date: ''
  });

  readonly SaveIcon = Save;
  readonly RotateCcwIcon = RotateCcw;
  readonly MegaphoneIcon = Megaphone;
  readonly SearchIcon = Search;
  readonly FilterIcon = Filter;

  companyOptions = [
    { label: '--Select--', value: '' },
    { label: 'HORECA ERP SOLUTIONS', value: 'HORECA ERP SOLUTIONS' },
    { label: 'GLOBAL DISTRIBUTION LTD', value: 'GLOBAL DISTRIBUTION LTD' }
  ];

  ccCenterOptions = [
    { label: '--Select--', value: '' },
    { label: 'MAIN OFFICE', value: 'MAIN OFFICE' },
    { label: 'REGIONAL HUB', value: 'REGIONAL HUB' }
  ];

  departmentOptions = [
    { label: '--Select--', value: '' },
    { label: 'HUMAN RESOURCES', value: 'HUMAN RESOURCES' },
    { label: 'OPERATIONS', value: 'OPERATIONS' },
    { label: 'IT & INFRASTRUCTURE', value: 'IT & INFRASTRUCTURE' }
  ];

  toggleSection(key: 'info' | 'filter' | 'table') {
    this.sections.update(prev => ({ ...prev, [key]: !prev[key] }));
  }

  updateForm(field: keyof NewsForm, value: string) {
    this.formData.update(prev => ({ ...prev, [field]: value }));
  }

  updateFilter(field: keyof FilterForm, value: string) {
    this.filterData.update(prev => ({ ...prev, [field]: value }));
  }

  handleReset() {
    this.formData.set({
      company: '',
      eventDate: '',
      ccCenter: '',
      department: '',
      announcement: '',
    });
  }
}
