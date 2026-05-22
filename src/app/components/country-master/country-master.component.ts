import { Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  LucideAngularModule, 
  Save, RotateCcw, MapPin, Search
} from 'lucide-angular';

import { ErpInputComponent } from '../shared/erp-input/erp-input.component';
import { ErpSelectComponent } from '../shared/erp-select/erp-select.component';
import { ErpToggleComponent } from '../shared/erp-toggle/erp-toggle.component';
import { SectionHeaderComponent } from '../shared/section-header/section-header.component';
import { CountryTableComponent } from '../country-table/country-table.component';

interface CountryForm {
  countryName: string;
  countryCode: string;
  isoCode: string;
  shortName: string;
  nationality: string;
  dialCode: string;
  currency: string;
  isActive: boolean;
  isDefault: boolean;
}

@Component({
  selector: 'app-country-master',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    LucideAngularModule, 
    ErpInputComponent, 
    ErpSelectComponent,
    ErpToggleComponent,
    SectionHeaderComponent, 
    CountryTableComponent
  ],
  templateUrl: './country-master.component.html',
  styleUrl: './country-master.component.css'
})
export class CountryMasterComponent {
  sections = signal({
    countryEntry: true,
    search: true,
    table: true
  });

  formData: WritableSignal<CountryForm> = signal({
    countryName: '',
    countryCode: '',
    isoCode: '',
    shortName: '',
    nationality: '',
    dialCode: '',
    currency: '',
    isActive: true,
    isDefault: false
  });

  readonly SaveIcon = Save;
  readonly RotateCcwIcon = RotateCcw;
  readonly SearchIcon = Search;

  currencyOptions = [
    {label: 'Indian Rupee (INR)', value: 'INR'}, 
    {label: 'US Dollar (USD)', value: 'USD'}
  ];

  statusOptions = [
    {label: 'Active Only', value: 'Active'}, 
    {label: 'Inactive Only', value: 'Inactive'}
  ];

  toggleSection(key: 'countryEntry' | 'search' | 'table') {
    this.sections.update(prev => ({ ...prev, [key]: !prev[key] }));
  }

  updateForm(field: keyof CountryForm, value: string | boolean) {
    if ((field === 'countryCode' || field === 'isoCode') && typeof value === 'string') {
      value = value.toUpperCase();
    }
    this.formData.update(prev => ({ ...prev, [field]: value as never }));
  }

  handleReset() {
    this.formData.set({
      countryName: '',
      countryCode: '',
      isoCode: '',
      shortName: '',
      nationality: '',
      dialCode: '',
      currency: '',
      isActive: true,
      isDefault: false
    });
  }
}
