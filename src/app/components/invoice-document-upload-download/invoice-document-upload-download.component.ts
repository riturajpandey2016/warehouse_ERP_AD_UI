import { Component, signal, WritableSignal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, LayoutGrid, ShoppingCart, ChevronRight, AlertCircle, Search, Upload, Eye } from 'lucide-angular';
import { FloatingInputComponent } from '../shared/floating-input/floating-input.component';
import { FloatingSelectComponent } from '../shared/floating-select/floating-select.component';

interface DocumentRecord {
  id: number;
  invoiceDate: string;
  refNo: string;
  supplier: string;
  grandTotal: number;
  fileUrl?: string;
}

@Component({
  selector: 'app-invoice-document-upload-download',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
    FloatingInputComponent,
    FloatingSelectComponent
  ],
  templateUrl: './invoice-document-upload-download.component.html',
  styleUrl: './invoice-document-upload-download.component.css'
})
export class InvoiceDocumentUploadDownloadComponent {
  // Icon references
  readonly LayoutGridIcon = LayoutGrid;
  readonly ShoppingCartIcon = ShoppingCart;
  readonly ChevronRightIcon = ChevronRight;
  readonly AlertCircleIcon = AlertCircle;
  readonly SearchIcon = Search;
  readonly UploadIcon = Upload;
  readonly EyeIcon = Eye;

  // Search controls
  readonly searchByOptions = [
    { label: 'Invoice Number', value: 'invoiceNumber' },
    { label: 'Reference No', value: 'referenceNo' },
    { label: 'Date Wise', value: 'dateWise' },
    { label: 'Select CC Center / Supplier', value: 'ccSupplier' }
  ];

  searchBy = signal<string>('invoiceNumber');
  searchQuery = signal<string>('');

  // Mock document data
  documentList = signal<DocumentRecord[]>([
    {
      id: 1,
      invoiceDate: '2026-05-20',
      refNo: 'INV/2026/001',
      supplier: 'ILICO SERVICES LTD.',
      grandTotal: 12500.00,
      fileUrl: ''
    },
    {
      id: 2,
      invoiceDate: '2026-05-22',
      refNo: 'INV/2026/002',
      supplier: 'Global Distribution Ltd',
      grandTotal: 8420.50,
      fileUrl: ''
    }
  ]);

  filteredDocuments = computed(() => {
    const by = this.searchBy();
    const query = this.searchQuery().toLowerCase();
    if (!query) return this.documentList();
    return this.documentList().filter(doc => {
      switch (by) {
        case 'invoiceNumber':
          return doc.refNo.toLowerCase().includes(query);
        case 'referenceNo':
          return doc.refNo.toLowerCase().includes(query);
        case 'dateWise':
          return doc.invoiceDate.includes(query);
        case 'ccSupplier':
          return doc.supplier.toLowerCase().includes(query);
        default:
          return true;
      }
    });
  });

  onSearch() {
    // No extra logic needed – the computed filter reacts automatically.
  }

  onUploadDocument(id: number, event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const url = URL.createObjectURL(input.files[0]);
      this.documentList.update(list =>
        list.map(doc => (doc.id === id ? { ...doc, fileUrl: url } : doc))
      );
      alert('File attached (preview only).');
    }
  }

  onViewDocument(id: number) {
    const doc = this.documentList().find(d => d.id === id);
    if (doc && doc.fileUrl) {
      window.open(doc.fileUrl, '_blank');
    } else {
      alert('No document uploaded for this record.');
    }
  }
}
