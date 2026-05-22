import { Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProductDocumentUploadTableComponent } from '../product-document-upload-table/product-document-upload-table.component';

interface DocumentUploadForm {
  product: string;
  documentTitle: string;
  documentType: string;
  description: string;
}

@Component({
  selector: 'app-product-document-upload',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    ProductDocumentUploadTableComponent
  ],
  templateUrl: './product-document-upload.component.html',
  styleUrl: './product-document-upload.component.css'
})
export class ProductDocumentUploadComponent {
  formData: WritableSignal<DocumentUploadForm> = signal({
    product: 'Select Product',
    documentTitle: '',
    documentType: 'Select Type',
    description: ''
  });

  selectedFile: File | null = null;

  updateForm(field: keyof DocumentUploadForm, value: string) {
    this.formData.update(prev => ({ ...prev, [field]: value }));
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  handleReset() {
    this.formData.set({
      product: 'Select Product',
      documentTitle: '',
      documentType: 'Select Type',
      description: ''
    });
    this.selectedFile = null;
  }
}
