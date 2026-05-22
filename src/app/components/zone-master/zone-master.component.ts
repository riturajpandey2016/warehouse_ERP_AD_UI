import { Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  LucideAngularModule, 
  Save, RotateCcw, Search
} from 'lucide-angular';

import { ErpInputComponent } from '../shared/erp-input/erp-input.component';
import { ErpSelectComponent } from '../shared/erp-select/erp-select.component';
import { ErpTextareaComponent } from '../shared/erp-textarea/erp-textarea.component';
import { ErpToggleComponent } from '../shared/erp-toggle/erp-toggle.component';
import { SectionHeaderComponent } from '../shared/section-header/section-header.component';
import { ZoneTableComponent } from '../zone-table/zone-table.component';

interface ZoneForm {
  country: string;
  zoneName: string;
  zoneCode: string;
  zoneShortName: string;
  regionType: string;
  description: string;
  parentRegionMapping: string;
  operationalArea: string;
  isActive: boolean;
  isDefault: boolean;
  taxRegionMapping: boolean;
  deliveryZoneMapping: boolean;
}

@Component({
  selector: 'app-zone-master',
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
    ZoneTableComponent
  ],
  templateUrl: './zone-master.component.html',
  styleUrl: './zone-master.component.css'
})
export class ZoneMasterComponent {
  sections = signal({
    zoneEntry: true,
    configuration: true,
    search: true,
    table: true
  });

  formData: WritableSignal<ZoneForm> = signal({
    country: '',
    zoneName: '',
    zoneCode: '',
    zoneShortName: '',
    regionType: '',
    description: '',
    parentRegionMapping: '',
    operationalArea: '',
    isActive: true,
    isDefault: false,
    taxRegionMapping: true,
    deliveryZoneMapping: true,
  });

  readonly SaveIcon = Save;
  readonly RotateCcwIcon = RotateCcw;
  readonly SearchIcon = Search;

  countryOptions = [{label: 'India', value: 'IND'}];
  regionTypeOptions = [{label: 'Operational', value: 'Operational'}];
  parentRegionOptions = [{label: 'APAC', value: 'APAC'}];
  operationalAreaOptions = [{label: 'Domestic', value: 'Domestic'}];

  toggleSection(key: 'zoneEntry' | 'configuration' | 'search' | 'table') {
    this.sections.update(prev => ({ ...prev, [key]: !prev[key] }));
  }

  updateForm(field: keyof ZoneForm, value: string | boolean) {
    if (field === 'zoneCode' && typeof value === 'string') {
      value = value.toUpperCase();
    }
    this.formData.update(prev => ({ ...prev, [field]: value as never }));
  }

  handleSave() {
    // Placeholder save logic - currently logs form data to console.
    console.log('Saving zone data:', this.formData());
    // TODO: Integrate with backend service to persist zone information.
  }

  // Existing reset method
  handleReset() {
    this.formData.set({
      country: '',
      zoneName: '',
      zoneCode: '',
      zoneShortName: '',
      regionType: '',
      description: '',
      parentRegionMapping: '',
      operationalArea: '',
      isActive: true,
      isDefault: false,
      taxRegionMapping: true,
      deliveryZoneMapping: true,
    });
  }
}
