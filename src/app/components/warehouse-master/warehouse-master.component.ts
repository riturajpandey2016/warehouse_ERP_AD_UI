import { Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  LucideAngularModule, 
  Save, RotateCcw
} from 'lucide-angular';

import { WarehouseTableComponent } from '../warehouse-table/warehouse-table.component';

interface WarehouseForm {
  branchLocation: string;
  warehouseName: string;
  warehouseCode: string;
}

@Component({
  selector: 'app-warehouse-master',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    LucideAngularModule, 
    WarehouseTableComponent
  ],
  templateUrl: './warehouse-master.component.html',
  styleUrl: './warehouse-master.component.css'
})
export class WarehouseMasterComponent {
  formData: WritableSignal<WarehouseForm> = signal({
    branchLocation: 'Select CC Center',
    warehouseName: '',
    warehouseCode: ''
  });

  updateForm(field: keyof WarehouseForm, value: string) {
    this.formData.update(prev => ({ ...prev, [field]: value }));
  }

  handleReset() {
    this.formData.set({
      branchLocation: 'Select CC Center',
      warehouseName: '',
      warehouseCode: ''
    });
  }
}
