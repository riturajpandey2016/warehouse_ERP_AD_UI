import { Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  LucideAngularModule, 
  Save, RotateCcw, MapPin, Search
} from 'lucide-angular';

import { ErpInputComponent } from '../shared/erp-input/erp-input.component';
import { ErpSelectComponent } from '../shared/erp-select/erp-select.component';
import { ErpTextareaComponent } from '../shared/erp-textarea/erp-textarea.component';
import { ErpToggleComponent } from '../shared/erp-toggle/erp-toggle.component';
import { SectionHeaderComponent } from '../shared/section-header/section-header.component';
import { DistrictTableComponent } from '../district-table/district-table.component';

interface DistrictForm {
  country: string;
  zone: string;
  state: string;
  districtName: string;
  districtCode: string;
  districtShortName: string;
  regionType: string;
  deliveryArea: string;
  operationalTerritory: string;
  description: string;
  isActive: boolean;
  isDefault: boolean;
  warehouseServiceMapping: boolean;
  deliveryZoneMapping: boolean;
}

@Component({
  selector: 'app-district-master',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    LucideAngularModule, 
    ErpInputComponent, 
    ErpSelectComponent,
    ErpTextareaComponent,
    ErpToggleComponent,
    SectionHeaderComponent, 
    DistrictTableComponent
  ],
  templateUrl: './district-master.component.html',
  styleUrl: './district-master.component.css'
})
export class DistrictMasterComponent {
  sections = signal({
    basicInfo: true,
    configuration: true,
    search: true,
    table: true
  });

  formData: WritableSignal<DistrictForm> = signal({
    country: '',
    zone: '',
    state: '',
    districtName: '',
    districtCode: '',
    districtShortName: '',
    regionType: '',
    deliveryArea: '',
    operationalTerritory: '',
    description: '',
    isActive: true,
    isDefault: false,
    warehouseServiceMapping: true,
    deliveryZoneMapping: true,
  });

  readonly SaveIcon = Save;
  readonly RotateCcwIcon = RotateCcw;
  readonly SearchIcon = Search;

  countryOptions = [{label: 'India', value: 'IND'}];
  zoneOptions = [{label: 'North Zone', value: 'NZ-IND'}];
  stateOptions = [{label: 'Delhi', value: 'DL'}];
  regionTypeOptions = [{label: 'Urban', value: 'Urban'}, {label: 'Rural', value: 'Rural'}];
  deliveryAreaOptions = [{label: 'Tier 1 Metro', value: 'Tier 1 Metro'}];
  territoryOptions = [{label: 'Central', value: 'Central'}];

  toggleSection(key: 'basicInfo' | 'configuration' | 'search' | 'table') {
    this.sections.update(prev => ({ ...prev, [key]: !prev[key] }));
  }

  updateForm(field: keyof DistrictForm, value: string | boolean) {
    if (field === 'districtCode' && typeof value === 'string') {
      value = value.toUpperCase();
    }
    this.formData.update(prev => ({ ...prev, [field]: value as never }));
  }

  handleReset() {
    this.formData.set({
      country: '',
      zone: '',
      state: '',
      districtName: '',
      districtCode: '',
      districtShortName: '',
      regionType: '',
      deliveryArea: '',
      operationalTerritory: '',
      description: '',
      isActive: true,
      isDefault: false,
      warehouseServiceMapping: true,
      deliveryZoneMapping: true,
    });
  }
}
