import { Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  LucideAngularModule, 
  Save, RotateCcw
} from 'lucide-angular';

import { ProductMaterialTypeTableComponent } from '../product-material-type-table/product-material-type-table.component';

interface ProductMaterialTypeForm {
  itemMaterialType: string;
  itemMaterialCode: string;
  description: string;
  mode: 'Active' | 'Inactive';
  entryDate: string;
}

@Component({
  selector: 'app-product-material-type-master',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    LucideAngularModule, 
    ProductMaterialTypeTableComponent
  ],
  templateUrl: './product-material-type-master.component.html',
  styleUrl: './product-material-type-master.component.css'
})
export class ProductMaterialTypeMasterComponent {
  formData: WritableSignal<ProductMaterialTypeForm> = signal({
    itemMaterialType: '',
    itemMaterialCode: '',
    description: '',
    mode: 'Active',
    entryDate: '19 May 2026'
  });

  updateForm(field: keyof ProductMaterialTypeForm, value: string) {
    this.formData.update(prev => ({ ...prev, [field]: value }));
  }

  handleReset() {
    this.formData.set({
      itemMaterialType: '',
      itemMaterialCode: '',
      description: '',
      mode: 'Active',
      entryDate: '19 May 2026'
    });
  }
}
