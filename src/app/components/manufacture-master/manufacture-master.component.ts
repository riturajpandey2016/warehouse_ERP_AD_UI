import { Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  LucideAngularModule, 
  Save, RotateCcw, Factory
} from 'lucide-angular';

import { ManufactureTableComponent } from '../manufacture-table/manufacture-table.component';

interface ManufactureForm {
  manufacturerCode: string;
  manufacturerName: string;
  contactPerson: string;
  address: string;
  phone: string;
  email: string;
  website: string;
}

@Component({
  selector: 'app-manufacture-master',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    LucideAngularModule, 
    ManufactureTableComponent
  ],
  templateUrl: './manufacture-master.component.html',
  styleUrl: './manufacture-master.component.css'
})
export class ManufactureMasterComponent {
  sections = signal({
    details: true,
    table: true
  });

  formData: WritableSignal<ManufactureForm> = signal({
    manufacturerCode: '',
    manufacturerName: '',
    contactPerson: '',
    address: '',
    phone: '',
    email: '',
    website: ''
  });

  readonly SaveIcon = Save;
  readonly RotateCcwIcon = RotateCcw;
  readonly FactoryIcon = Factory;

  toggleSection(key: 'details' | 'table') {
    this.sections.update(prev => ({ ...prev, [key]: !prev[key] }));
  }

  updateForm(field: keyof ManufactureForm, value: string) {
    this.formData.update(prev => ({ ...prev, [field]: value }));
  }

  handleReset() {
    this.formData.set({
      manufacturerCode: '',
      manufacturerName: '',
      contactPerson: '',
      address: '',
      phone: '',
      email: '',
      website: ''
    });
  }
}
