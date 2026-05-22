import { Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  LucideAngularModule, 
  Save, RotateCcw
} from 'lucide-angular';

import { ProductStateTypeTableComponent } from '../product-state-type-table/product-state-type-table.component';

interface ProductStateTypeForm {
  itemType: string;
  description: string;
  mode: 'Active' | 'Inactive';
  entryDate: string;
}

@Component({
  selector: 'app-product-state-type-master',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    LucideAngularModule, 
    ProductStateTypeTableComponent
  ],
  templateUrl: './product-state-type-master.component.html',
  styleUrl: './product-state-type-master.component.css'
})
export class ProductStateTypeMasterComponent {
  formData: WritableSignal<ProductStateTypeForm> = signal({
    itemType: '',
    description: '',
    mode: 'Active',
    entryDate: '19 May 2026'
  });

  updateForm(field: keyof ProductStateTypeForm, value: string) {
    this.formData.update(prev => ({ ...prev, [field]: value }));
  }

  handleReset() {
    this.formData.set({
      itemType: '',
      description: '',
      mode: 'Active',
      entryDate: '19 May 2026'
    });
  }
}
