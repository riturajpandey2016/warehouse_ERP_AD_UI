import { Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  LucideAngularModule, 
  Save, RotateCcw, FolderTree
} from 'lucide-angular';

import { ProductCategoryTableComponent } from '../product-category-table/product-category-table.component';

interface ProductCategoryForm {
  itemCategory: string;
  description: string;
  mode: 'Active' | 'Inactive';
  entryDate: string;
}

@Component({
  selector: 'app-product-category-master',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    LucideAngularModule, 
    ProductCategoryTableComponent
  ],
  templateUrl: './product-category-master.component.html',
  styleUrl: './product-category-master.component.css'
})
export class ProductCategoryMasterComponent {
  formData: WritableSignal<ProductCategoryForm> = signal({
    itemCategory: '',
    description: '',
    mode: 'Active',
    entryDate: '19 May 2026'
  });

  readonly FolderTreeIcon = FolderTree;

  updateForm(field: keyof ProductCategoryForm, value: string) {
    this.formData.update(prev => ({ ...prev, [field]: value }));
  }

  handleReset() {
    this.formData.set({
      itemCategory: '',
      description: '',
      mode: 'Active',
      entryDate: '19 May 2026'
    });
  }
}
