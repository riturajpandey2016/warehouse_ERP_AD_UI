import { Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  LucideAngularModule, 
  Save, RotateCcw, Search, PlusCircle, Calculator
} from 'lucide-angular';

import { ErpInputComponent } from '../shared/erp-input/erp-input.component';
import { ErpSelectComponent } from '../shared/erp-select/erp-select.component';
import { ErpTextareaComponent } from '../shared/erp-textarea/erp-textarea.component';
import { SectionHeaderComponent } from '../shared/section-header/section-header.component';

@Component({
  selector: 'app-sales-invoice',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    LucideAngularModule, 
    ErpInputComponent,
    ErpSelectComponent,
    ErpTextareaComponent,
    SectionHeaderComponent
  ],
  templateUrl: './sales-invoice.component.html',
  styleUrl: './sales-invoice.component.css'
})
export class SalesInvoiceComponent {
  sections = signal({
    challanSearch: true,
    invoiceEntry: true,
    shippingDetails: true,
    customerDetails: true,
    contactDetails: true,
    itemDetails: true,
    chargesTax: true,
    terms: true,
    invoiceSearch: false
  });

  invoiceType = signal('Direct Invoice');
  customerType = signal('Customer');
  invoiceCategoryType = signal('General');
  paymentType = signal('Cash');
  rateType = signal('Normal');

  formData: WritableSignal<any> = signal({
    // Challan Details Search
    dateFrom: '',
    dateTo: '',
    company: 'ILICO SERVICES LTD.(vERP)',
    ccCenter: '',
    amountFrom: '',
    amountTo: '',
    referenceNo: '',

    // Invoice Entry
    invoiceDate: new Date().toISOString().split('T')[0],
    invoiceReferenceNo: '',
    serialNumber: '',
    
    // Shipping Details
    wayBillNo: '',
    docketNo: '',
    courierName: '',
    courierDate: new Date().toISOString().split('T')[0],
    customerOrderNo: '',
    customerOrderDate: new Date().toISOString().split('T')[0],
    targetDespatchDate: new Date().toISOString().split('T')[0],
    targetDeliveryDate: new Date().toISOString().split('T')[0],
    salesExecutiveCode: '',
    nextStampingDate: '',
    paymentDate: '',
    paymentDays: '45',
    transportMode: '',
    vehicleNumber: '',
    approxDistance: '',
    supplyType: '',
    transactionType: '',
    portCode: '',
    shippingBillDate: '',
    shippingBillNo: '',

    // Customer
    customerCompany: 'ILICO SERVICES LTD.(vERP)',
    customerCcCenter: '',
    customerName: '',
    gstin: '',
    entryType: 'Sales',
    salesType: '',
    address: '',
    deliveryAddress: '',
    remarks: '',

    // Contact Details
    contactName: '',
    contactDesignation: '',
    contactAddress: '',
    contactPhone: '',
    contactMobile: '',
    contactEmail: '',

    // Item Search
    itemGroup: 'FINISHED',
    itemMaterialType: '',

    termsConditions: '1. Price Basis: For, Ex\n2. Payment Terms:\n3. Packaging & Forwarding Charges:\n4. Transportation:\n5. Delivery Terms:\n6. Erection, Supervision & Conditions:\n7. Grantee & Warranty:\n8. Inspection:\n9. Remarks:'
  });

  readonly SaveIcon = Save;
  readonly RotateCcwIcon = RotateCcw;
  readonly SearchIcon = Search;
  readonly PlusCircleIcon = PlusCircle;
  readonly CalculatorIcon = Calculator;

  companyOptions = [
    { label: 'ILICO SERVICES LTD.(vERP)', value: 'ILICO SERVICES LTD.(vERP)' },
    { label: 'Warehouse Group Corp', value: 'Warehouse Group Corp' }
  ];

  ccCenterOptions = [
    { label: 'Select Branch', value: '' },
    { label: 'Head Office', value: 'Head Office' },
    { label: 'Bihar', value: 'Bihar' },
    { label: 'Delhi', value: 'Delhi' }
  ];

  courierOptions = [
    { label: 'Select Courier Name', value: '' },
    { label: 'Blue Dart', value: 'Blue Dart' },
    { label: 'DTDC', value: 'DTDC' }
  ];

  employeeOptions = [
    { label: 'Select Employee', value: '' },
    { label: 'Admin', value: 'Admin' },
    { label: 'Sales Rep 1', value: 'Sales Rep 1' }
  ];

  transportModeOptions = [
    { label: 'Select Transport Mode', value: '' },
    { label: 'Road', value: 'Road' },
    { label: 'Air', value: 'Air' }
  ];

  supplyTypeOptions = [
    { label: 'Select Supply Type', value: '' },
    { label: 'Inter-State Supply', value: 'Inter-State Supply' },
    { label: 'Intra-State Supply', value: 'Intra-State Supply' }
  ];

  transactionTypeOptions = [
    { label: 'Select Transaction Type', value: '' },
    { label: 'Regular', value: 'Regular' },
    { label: 'Bill To - Ship To', value: 'Bill To - Ship To' }
  ];

  salesTypeOptions = [
    { label: 'Select Sales Account', value: '' },
    { label: 'Local Sales', value: 'Local Sales' },
    { label: 'Interstate Sales', value: 'Interstate Sales' }
  ];

  itemGroupOptions = [
    { label: 'FINISHED', value: 'FINISHED' },
    { label: 'RAW MATERIALS', value: 'RAW MATERIALS' }
  ];

  itemMaterialTypeOptions = [
    { label: 'Select Product Type', value: '' },
    { label: 'Type A', value: 'Type A' },
    { label: 'Type B', value: 'Type B' }
  ];

  toggleSection(key: keyof typeof this.sections.prototype) {
    this.sections.update(prev => ({ ...prev, [key as string]: !(prev as any)[key] }));
  }

  updateForm(field: string, value: any) {
    this.formData.update(prev => ({ ...prev, [field]: value }));
  }

  handleSave() {
    console.log('Saving Sales Invoice...', this.formData());
    alert('Sales Invoice Saved Successfully!');
  }

  handleReset() {
    this.invoiceType.set('Direct Invoice');
  }

  handleSearchChallan() {
    console.log('Searching Challan...');
  }
}
