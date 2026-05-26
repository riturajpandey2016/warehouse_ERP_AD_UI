import { Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  LucideAngularModule, 
  Search, Upload, FileText, Eye, Download
} from 'lucide-angular';

import { ErpSelectComponent } from '../shared/erp-select/erp-select.component';
import { SectionHeaderComponent } from '../shared/section-header/section-header.component';

@Component({
  selector: 'app-invoice-document-upload-download',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    LucideAngularModule, 
    ErpSelectComponent,
    SectionHeaderComponent
  ],
  templateUrl: './invoice-document-upload-download.component.html',
  styleUrl: './invoice-document-upload-download.component.css'
})
export class InvoiceDocumentUploadDownloadComponent {
  sections = signal({
    searchFilters: true
  });

  searchBy = signal('Select All');

  readonly SearchIcon = Search;
  readonly UploadIcon = Upload;
  readonly FileTextIcon = FileText;
  readonly EyeIcon = Eye;
  readonly DownloadIcon = Download;

  searchByOptions = [
    { label: 'Select All', value: 'Select All' },
    { label: 'Pending Uploads', value: 'Pending Uploads' },
    { label: 'Uploaded', value: 'Uploaded' }
  ];

  // Mock data representing the table contents
  tableData = signal([
    { serial: 1, invoiceDate: '29 Apr 2026', refNo: 'ISLSINV26-27/00002', custName: 'A.T.Godhrawala & Co.', custCode: 'A.T.Godhrawala & Co.', address: '135A,Biplabi Rash Behari Basu Road,Kolkata-1', hasDoc: false },
    { serial: 2, invoiceDate: '16 Apr 2026', refNo: 'ISLSINV26-27/00001', custName: 'A N Enterprise', custCode: 'A N Enterprise', address: 'Gabardanga, North 24 parganas', hasDoc: false },
    { serial: 3, invoiceDate: '12 Nov 2025', refNo: 'ISLSINV25-26/00007', custName: 'P C Associates', custCode: 'P C Associates', address: '302, Nimesh Industrial Estate, Vidyalaya Marg, Mulund (East), Mumbai - 400 081.', hasDoc: false },
    { serial: 4, invoiceDate: '08 Oct 2025', refNo: 'ISLSINV25-26/00006', custName: 'P C Associates', custCode: 'P C Associates', address: '302, Nimesh Industrial Estate, Vidyalaya Marg, Mulund (East), Mumbai - 400 081.', hasDoc: false },
    { serial: 5, invoiceDate: '06 Oct 2025', refNo: 'ISLSINV25-26/00004', custName: 'P C Associates', custCode: 'P C Associates', address: '302, Nimesh Industrial Estate, Vidyalaya Marg, Mulund (East), Mumbai - 400 081.', hasDoc: false },
    { serial: 6, invoiceDate: '05 Oct 2025', refNo: 'ISLSINV25-26/00005', custName: 'P C Associates', custCode: 'P C Associates', address: '302, Nimesh Industrial Estate, Vidyalaya Marg, Mulund (East), Mumbai - 400 081.', hasDoc: false },
    { serial: 7, invoiceDate: '18 Sep 2025', refNo: 'ISLSINV25-26/00003', custName: 'P C Associates', custCode: 'P C Associates', address: '302, Nimesh Industrial Estate, Vidyalaya Marg, Mulund (East), Mumbai - 400 081.', hasDoc: false },
    { serial: 8, invoiceDate: '01 Sep 2025', refNo: 'ISLSINV25-26/00002', custName: 'P C Associates', custCode: 'P C Associates', address: '302, Nimesh Industrial Estate, Vidyalaya Marg, Mulund (East), Mumbai - 400 081.', hasDoc: false },
    { serial: 9, invoiceDate: '01 Sep 2025', refNo: 'ISLSINV25-26/00001', custName: 'The South Point', custCode: 'The South Point', address: '2, Kumarpara Road, Rajpur, Kolkata 700149', hasDoc: false },
    { serial: 10, invoiceDate: '14 Jul 2025', refNo: 'ISLSINV24-25/00006', custName: 'P C Associates', custCode: 'P C Associates', address: '302, Nimesh Industrial Estate, Vidyalaya Marg, Mulund (East), Mumbai - 400 081.', hasDoc: false }
  ]);

  toggleSection(key: 'searchFilters') {
    this.sections.update(prev => ({ ...prev, [key]: !prev[key] }));
  }

  handleSearch() {
    console.log('Searching by:', this.searchBy());
  }

  handleUpload(serial: number) {
    console.log('Uploading document for serial:', serial);
    // Mock setting document status
    this.tableData.update(items => items.map(item => item.serial === serial ? { ...item, hasDoc: true } : item));
    alert(`Document uploaded for Record #${serial}`);
  }
}
