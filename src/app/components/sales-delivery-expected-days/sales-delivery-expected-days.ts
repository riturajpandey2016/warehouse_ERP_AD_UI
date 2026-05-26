import { Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  LucideAngularModule, 
  Save, RotateCcw
} from 'lucide-angular';

import { ErpSelectComponent } from '../shared/erp-select/erp-select.component';
import { SectionHeaderComponent } from '../shared/section-header/section-header.component';

interface SalesDeliveryExpectedDaysForm {
  ccCenter: string;
  country: string;
}

@Component({
  selector: 'app-sales-delivery-expected-days',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    LucideAngularModule, 
    ErpSelectComponent,
    SectionHeaderComponent
  ],
  templateUrl: './sales-delivery-expected-days.html',
  styleUrl: './sales-delivery-expected-days.css'
})
export class SalesDeliveryExpectedDaysComponent {
  sections = signal({
    form: true
  });

  formData: WritableSignal<SalesDeliveryExpectedDaysForm> = signal({
    ccCenter: 'Bihar',
    country: ''
  });

  readonly SaveIcon = Save;
  readonly RotateCcwIcon = RotateCcw;

  ccCenterOptions = [
    { label: 'Bihar', value: 'Bihar' },
    { label: 'Delhi', value: 'Delhi' },
    { label: 'Mumbai', value: 'Mumbai' }
  ];

  countryOptions = [
    { label: 'India', value: 'India' },
    { label: 'USA', value: 'USA' },
    { label: 'UK', value: 'UK' }
  ];

  toggleSection(key: 'form') {
    this.sections.update(prev => ({ ...prev, [key]: !prev[key] }));
  }

  updateForm(field: keyof SalesDeliveryExpectedDaysForm, value: string) {
    this.formData.update(prev => ({ ...prev, [field]: value }));
  }

  handleSave() {
    console.log('Saving Data...', this.formData());
    alert('Data Saved Successfully!');
  }

  handleReset() {
    this.formData.set({
      ccCenter: '',
      country: ''
    });
  }
}
