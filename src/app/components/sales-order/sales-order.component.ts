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
  selector: 'app-sales-order',
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
  templateUrl: './sales-order.component.html',
  styleUrl: './sales-order.component.css'
})
export class SalesOrderComponent {
  sections = signal({
    quotationDetails: true,
    orderEntry: true,
    shippingDetails: true,
    customerDetails: true,
    itemDetails: true,
    chargesTax: true,
    terms: true,
    searchOrders: false
  });

  orderType = signal('Direct Order');
  customerType = signal('Customer');
  rateType = signal('Normal');

  formData: WritableSignal<any> = signal({
    dateFrom: '',
    dateTo: '',
    company: 'ILICO SERVICES LTD.(vERP)',
    ccCenter: '',
    amountFrom: '',
    amountTo: '',
    referenceNo: '',

    orderDate: new Date().toISOString().split('T')[0],
    orderReferenceNo: '',
    
    wayBillNo: '',
    docketNo: '',
    courierName: '',
    courierDate: '',
    customerOrderNo: '',
    customerOrderDate: '',
    targetDespatchDate: '',
    targetDeliveryDate: '',

    customerCompany: 'ILICO SERVICES LTD.(vERP)',
    customerCcCenter: '',
    customerName: '',
    gstin: '',
    entryType: 'Sales',
    salesType: '',
    address: '',
    deliveryAddress: '',
    remarks: '',

    itemGroup: '',
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
    { label: '--Select Courier Name--', value: '' },
    { label: 'Blue Dart', value: 'Blue Dart' },
    { label: 'DTDC', value: 'DTDC' }
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
    console.log('Saving Sales Order...', this.formData());
    alert('Sales Order Saved Successfully!');
  }

  handleReset() {
    // Basic reset
    this.orderType.set('Direct Order');
  }

  handleSearchQuotation() {
    console.log('Searching Quotations...');
  }
}
