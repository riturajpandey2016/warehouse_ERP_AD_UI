import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Filter, Edit2 } from 'lucide-angular';

interface ProductDocumentData {
  id: string;
  productName: string;
  documentTitle: string;
  documentType: string;
  fileName: string;
}

@Component({
  selector: 'app-product-document-upload-table',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './product-document-upload-table.component.html',
  styleUrl: './product-document-upload-table.component.css'
})
export class ProductDocumentUploadTableComponent {
  // Icons
  readonly FilterIcon = Filter;
  readonly EditIcon = Edit2;

  // Mock data
  data = signal<ProductDocumentData[]>([
    { id: '1', productName: 'MAIN (MAN)', documentTitle: 'User Manual v1', documentType: 'User Manual', fileName: 'manual_v1.pdf' },
    { id: '2', productName: 'FINISHED (FNS)', documentTitle: 'Product Cover Image', documentType: 'Product Image', fileName: 'cover.png' }
  ]);
}
