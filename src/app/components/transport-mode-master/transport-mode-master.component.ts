import { Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  LucideAngularModule, 
  Save, RotateCcw, Truck 
} from 'lucide-angular';

import { ErpInputComponent } from '../shared/erp-input/erp-input.component';
import { SectionHeaderComponent } from '../shared/section-header/section-header.component';
import { TransportModeTableComponent } from '../transport-mode-table/transport-mode-table.component';

interface TransportModeForm {
  transportName: string;
  transportDescription: string;
  isActive: boolean;
}

@Component({
  selector: 'app-transport-mode-master',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    LucideAngularModule, 
    ErpInputComponent, 
    SectionHeaderComponent, 
    TransportModeTableComponent
  ],
  templateUrl: './transport-mode-master.component.html',
  styleUrl: './transport-mode-master.component.css'
})
export class TransportModeMasterComponent {
  sections = signal({
    details: true,
    table: true
  });

  formData: WritableSignal<TransportModeForm> = signal({
    transportName: '',
    transportDescription: '',
    isActive: true,
  });

  readonly TruckIcon = Truck;
  readonly SaveIcon = Save;
  readonly RotateCcwIcon = RotateCcw;

  toggleSection(key: 'details' | 'table') {
    this.sections.update(prev => ({ ...prev, [key]: !prev[key] }));
  }

  updateForm(field: keyof TransportModeForm, value: string | boolean) {
    this.formData.update(prev => ({ ...prev, [field]: value }));
  }

  handleReset() {
    this.formData.set({
      transportName: '',
      transportDescription: '',
      isActive: true,
    });
  }
}
