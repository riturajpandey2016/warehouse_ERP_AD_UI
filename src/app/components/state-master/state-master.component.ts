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
import { StateTableComponent } from '../state-table/state-table.component';

interface StateForm {
  country: string;
  zone: string;
  stateName: string;
  stateCode: string;
  stateShortName: string;
  stateTinNumber: string;
  isActive: boolean;
  taxRegionMapping: boolean;
}

@Component({
  selector: 'app-state-master',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    LucideAngularModule, 
    ErpInputComponent, 
    ErpSelectComponent,
    ErpToggleComponent,
    SectionHeaderComponent, 
    StateTableComponent
  ],
  templateUrl: './state-master.component.html',
  styleUrl: './state-master.component.css'
})
export class StateMasterComponent {
  sections = signal({
    stateEntry: true,
    configuration: true,
    search: true,
    table: true
  });

  formData: WritableSignal<StateForm> = signal({
    country: '',
    zone: '',
    stateName: '',
    stateCode: '',
    stateShortName: '',
    stateTinNumber: '',
    isActive: true,
    taxRegionMapping: true,
  });

  readonly SaveIcon = Save;
  readonly RotateCcwIcon = RotateCcw;
  readonly SearchIcon = Search;

  countryOptions = [{label: 'India', value: 'IND'}];
  zoneOptions = [{label: 'West Zone', value: 'WZ'}];

  toggleSection(key: 'stateEntry' | 'configuration' | 'search' | 'table') {
    this.sections.update(prev => ({ ...prev, [key]: !prev[key] }));
  }

  updateForm(field: keyof StateForm, value: string | boolean) {
    if (field === 'stateCode' && typeof value === 'string') {
      value = value.toUpperCase();
    }
    this.formData.update(prev => ({ ...prev, [field]: value as never }));
  }

  handleReset() {
    this.formData.set({
      country: '',
      zone: '',
      stateName: '',
      stateCode: '',
      stateShortName: '',
      stateTinNumber: '',
      isActive: true,
      taxRegionMapping: true,
    });
  }
}
