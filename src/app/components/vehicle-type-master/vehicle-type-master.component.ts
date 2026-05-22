import { Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  LucideAngularModule, 
  Save, RotateCcw, Car 
} from 'lucide-angular';

import { ErpInputComponent } from '../shared/erp-input/erp-input.component';
import { SectionHeaderComponent } from '../shared/section-header/section-header.component';
import { VehicleTypeTableComponent } from '../vehicle-type-table/vehicle-type-table.component';

interface VehicleTypeForm {
  vehicleType: string;
  desc: string;
  isActive: boolean;
}

@Component({
  selector: 'app-vehicle-type-master',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    LucideAngularModule, 
    ErpInputComponent, 
    SectionHeaderComponent, 
    VehicleTypeTableComponent
  ],
  templateUrl: './vehicle-type-master.component.html',
  styleUrl: './vehicle-type-master.component.css'
})
export class VehicleTypeMasterComponent {
  sections = signal({
    details: true,
    table: true
  });

  formData: WritableSignal<VehicleTypeForm> = signal({
    vehicleType: '',
    desc: '',
    isActive: true,
  });

  readonly CarIcon = Car;
  readonly SaveIcon = Save;
  readonly RotateCcwIcon = RotateCcw;

  toggleSection(key: 'details' | 'table') {
    this.sections.update(prev => ({ ...prev, [key]: !prev[key] }));
  }

  updateForm(field: keyof VehicleTypeForm, value: string | boolean) {
    this.formData.update(prev => ({ ...prev, [field]: value }));
  }

  handleReset() {
    this.formData.set({
      vehicleType: '',
      desc: '',
      isActive: true,
    });
  }
}
