import { Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ProductSetupForm {
  codeGeneration: string;
  codePrefix: string;
  valuationMethod: string;
  batchTracking: string;
  serialTracking: string;
  allowDuplicates: string;
}

@Component({
  selector: 'app-inventory-product-setup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inventory-product-setup.component.html',
  styleUrl: './inventory-product-setup.component.css'
})
export class InventoryProductSetupComponent {
  formData: WritableSignal<ProductSetupForm> = signal({
    codeGeneration: 'Automatic',
    codePrefix: 'PRD-',
    valuationMethod: 'FIFO',
    batchTracking: 'No',
    serialTracking: 'No',
    allowDuplicates: 'No'
  });

  updateForm(field: keyof ProductSetupForm, value: string) {
    this.formData.update(prev => ({ ...prev, [field]: value }));
  }

  handleReset() {
    this.formData.set({
      codeGeneration: 'Automatic',
      codePrefix: 'PRD-',
      valuationMethod: 'FIFO',
      batchTracking: 'No',
      serialTracking: 'No',
      allowDuplicates: 'No'
    });
  }
}
