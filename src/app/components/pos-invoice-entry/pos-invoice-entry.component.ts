import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  LucideAngularModule, 
  PlusCircle, Calculator, CreditCard, ChevronLeft, ChevronRight, Image as ImageIcon
} from 'lucide-angular';

import { ErpSelectComponent } from '../shared/erp-select/erp-select.component';
import { SectionHeaderComponent } from '../shared/section-header/section-header.component';

@Component({
  selector: 'app-pos-invoice-entry',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    LucideAngularModule, 
    ErpSelectComponent,
    SectionHeaderComponent
  ],
  templateUrl: './pos-invoice-entry.component.html',
  styleUrl: './pos-invoice-entry.component.css'
})
export class PosInvoiceEntryComponent {
  // Icons
  readonly PlusCircleIcon = PlusCircle;
  readonly CalculatorIcon = Calculator;
  readonly CreditCardIcon = CreditCard;
  readonly ChevronLeftIcon = ChevronLeft;
  readonly ChevronRightIcon = ChevronRight;
  readonly ImageIcon = ImageIcon;

  // Left Side Form Data
  invoiceData = signal({
    date: '25 May 2026 03:29:56 PM',
    reference: 'ISLPOSIN26-27/00001',
    branch: 'Head Office',
    store: 'Kolkata Branch',
    customer: 'A N Enterprise',
    roundOffSign: '+',
    roundOffValue: ''
  });

  branchOptions = [
    { label: 'Head Office', value: 'Head Office' }
  ];

  storeOptions = [
    { label: 'Kolkata Branch', value: 'Kolkata Branch' }
  ];

  customerOptions = [
    { label: 'A N Enterprise', value: 'A N Enterprise' }
  ];

  chargesTable = signal([
    { slNo: 1, charge: 'Discount Received', sacCode: '', type: 'Deduction', taxType: 'Overall', isPercent: false, isAmount: false, value: '0', amount: '0', taxPercent: '0.00', taxAmount: '0' },
    { slNo: 2, charge: 'Packing and Forwarding Charges', sacCode: '5418588', type: 'Addition', taxType: 'Individual', isPercent: false, isAmount: false, value: '0', amount: '0', taxPercent: '18.00', taxAmount: '0' },
    { slNo: 3, charge: 'General Charges', sacCode: '00440245', type: 'Addition', taxType: 'Individual', isPercent: false, isAmount: false, value: '0', amount: '0', taxPercent: '28.00', taxAmount: '0' },
    { slNo: 4, charge: 'Processing Charges (Registered)', sacCode: '1005822', type: 'Addition', taxType: 'Individual', isPercent: false, isAmount: false, value: '0', amount: '0', taxPercent: '0.00', taxAmount: '0' }
  ]);

  // Right Side Data
  activeCategory = signal('FINISHED');
  productSearch = signal({
    name: '',
    code: ''
  });

  products = signal([
    { name: '1/4" Plug Nut(F0468)', price: '20.000', image: '' }
  ]);

  sections = signal({
    taxesDetails: true,
    paymentDetails: true
  });

  updateInvoiceField(field: string, value: any) {
    this.invoiceData.update(prev => ({ ...prev, [field]: value }));
  }

  updateProductSearch(field: string, value: any) {
    this.productSearch.update(prev => ({ ...prev, [field]: value }));
  }

  setCategory(cat: string) {
    this.activeCategory.set(cat);
  }

  toggleSection(key: 'taxesDetails' | 'paymentDetails') {
    this.sections.update(prev => ({ ...prev, [key]: !prev[key] }));
  }

  calculateTax() {
    console.log('Calculating tax...');
  }

  processPayment() {
    console.log('Processing payment...');
  }
}
