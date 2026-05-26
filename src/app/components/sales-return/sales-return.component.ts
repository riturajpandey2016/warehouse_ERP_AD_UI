import { Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  LucideAngularModule, 
  Save, RotateCcw, Search
} from 'lucide-angular';

import { ErpInputComponent } from '../shared/erp-input/erp-input.component';
import { ErpSelectComponent } from '../shared/erp-select/erp-select.component';
import { SectionHeaderComponent } from '../shared/section-header/section-header.component';

@Component({
  selector: 'app-sales-return',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    LucideAngularModule, 
    ErpInputComponent,
    ErpSelectComponent,
    SectionHeaderComponent
  ],
  templateUrl: './sales-return.component.html',
  styleUrl: './sales-return.component.css'
})
export class SalesReturnComponent {
  sections = signal({
    entryDetails: true,
    invoiceDetails: true,
    searchReturn: true,
    showSalesReturn: true
  });

  returnAgainst = signal('Return Against Invoice');
  customerRole = signal('Customer');
  invoiceType = signal('General');
  entryRelation = signal('Company');
  roundOffSign = signal('+');

  formData: WritableSignal<any> = signal({
    // Top Level
    creditNoteNo: '',
    creditNoteDate: '',
    customerRefNo: '',
    customerRefDate: new Date().toISOString().split('T')[0],

    // Entry Details
    company: 'ILICO SERVICES LTD.(vERP)',
    customer: '',
    customerInactive: false,
    ccCenter: '',
    salesType: '',
    entryType: 'Sales',
    profitCentreGroup: '',
    profitCentreName: '',

    // Invoice Details
    roundOffValue: '0.00',

    // Search Fields
    searchCompany: 'ILICO SERVICES LTD.(vERP)',
    searchCcCenter: '',
    searchCustomer: '',
    searchReferenceNo: '',
    searchAmountFrom: '',
    searchAmountTo: '',
    searchFromDate: '2026-04-01',
    searchToDate: '2026-08-31'
  });

  readonly SaveIcon = Save;
  readonly RotateCcwIcon = RotateCcw;
  readonly SearchIcon = Search;

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

  salesTypeOptions = [
    { label: 'Select Sales Account', value: '' },
    { label: 'Local Sales', value: 'Local Sales' },
    { label: 'Interstate Sales', value: 'Interstate Sales' }
  ];

  profitCentreGroupOptions = [
    { label: 'Select Group', value: '' },
    { label: 'Group A', value: 'Group A' }
  ];

  profitCentreNameOptions = [
    { label: 'Select Name', value: '' },
    { label: 'Centre 1', value: 'Centre 1' }
  ];

  toggleSection(key: keyof typeof this.sections.prototype) {
    this.sections.update(prev => ({ ...prev, [key as string]: !(prev as any)[key] }));
  }

  updateForm(field: string, value: any) {
    this.formData.update(prev => ({ ...prev, [field]: value }));
  }

  handleSave() {
    console.log('Saving Sales Return Credit Note...', this.formData());
    alert('Sales Return Saved Successfully!');
  }

  handleReset() {
    this.returnAgainst.set('Return Against Invoice');
  }

  handleSearchReturn() {
    console.log('Searching Sales Returns...');
  }
}
