import { Component, signal, WritableSignal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  LucideAngularModule, 
  LayoutGrid, ShoppingCart, ChevronRight, AlertCircle, Calendar, Search, Building2, 
  ClipboardList, Filter, RotateCcw, Save, Plus, Trash2, HelpCircle, Check, BookOpen, FileText, ChevronDown, ChevronUp, UserCheck, PhoneCall, PlusCircle, DollarSign, Layers
} from 'lucide-angular';

import { FloatingInputComponent } from '../shared/floating-input/floating-input.component';
import { FloatingSelectComponent } from '../shared/floating-select/floating-select.component';
import { FloatingTextareaComponent } from '../shared/floating-textarea/floating-textarea.component';

interface InvoiceItem {
  id: number;
  code: string;
  name: string;
  qty: number;
  rate: number;
  taxPercent: number;
  taxAmount: number;
  totalAmount: number;
}

interface HistoryInvoice {
  id: number;
  refNo: string;
  date: string;
  company: string;
  department: string;
  ccCenter: string;
  amount: number;
}

@Component({
  selector: 'app-purchase-invoice',
  standalone: true,
  imports: [
    CommonModule, 
    LucideAngularModule, 
    FloatingInputComponent, 
    FloatingSelectComponent, 
    FloatingTextareaComponent
  ],
  templateUrl: './purchase-invoice.component.html',
  styleUrl: './purchase-invoice.component.css'
})
export class PurchaseInvoiceComponent {
  // Collapsible section toggles
  sectionsExpanded = signal({
    grnSearch: false,
    supplierDetails: true,
    contactPersonDetails: false,
    contactDetailsEntry: false,
    itemSearch: true,
    itemDetails: true,
    termsConditions: true,
    invoiceFilters: false
  });

  // Options lists
  companyOptions = [
    { label: 'ILICO SERVICES LTD.(vERP)', value: 'ILICO SERVICES LTD.(vERP)' },
    { label: 'Global Distribution Ltd', value: 'Global Distribution Ltd' },
    { label: 'HORECA Solutions', value: 'HORECA Solutions' }
  ];

  ccCenterOptions = [
    { label: 'Select CC Center', value: '' },
    { label: 'Head Office', value: 'Head Office' },
    { label: 'Main Warehouse', value: 'Main Warehouse' },
    { label: 'Branch Office', value: 'Branch Office' }
  ];

  departmentOptions = [
    { label: 'Select Department', value: '' },
    { label: 'Procurement Dept', value: 'Procurement Dept' },
    { label: 'IT Department', value: 'IT Department' },
    { label: 'Civil Department', value: 'Civil Department' },
    { label: 'Production Dept', value: 'Production Dept' }
  ];

  projectNameOptions = [
    { label: 'Select Project Name', value: '' },
    { label: 'Warehouse Expansion 2026', value: 'Warehouse Expansion 2026' },
    { label: 'Office Refurbishment', value: 'Office Refurbishment' },
    { label: 'Building Block A', value: 'Building Block A' }
  ];

  productionUnitOptions = [
    { label: 'Select Production Unit', value: '' },
    { label: 'Main Facility', value: 'Main Facility' },
    { label: 'Stone Crushing Unit A', value: 'Stone Crushing Unit A' }
  ];

  purchaseTypeOptions = [
    { label: 'Select Purchase Account Name', value: '' },
    { label: 'Local Purchase Taxable', value: 'Local Purchase Taxable' },
    { label: 'Import Purchase', value: 'Import Purchase' },
    { label: 'Interstate Purchase', value: 'Interstate Purchase' }
  ];

  costCentreOptions = [
    { label: 'Select Cost Centre', value: '' },
    { label: 'Logistics Cost Centre', value: 'Logistics Cost Centre' },
    { label: 'Admin Cost Centre', value: 'Admin Cost Centre' }
  ];

  costCentreGroupOptions = [
    { label: 'Select Cost Centre Group', value: '' },
    { label: 'Operations Group', value: 'Operations Group' },
    { label: 'Support Group', value: 'Support Group' }
  ];

  itemTypeOptions = [
    { label: 'Select Product Type', value: '' },
    { label: 'Raw Materials', value: 'Raw Materials' },
    { label: 'Consumables', value: 'Consumables' },
    { label: 'Capital Assets', value: 'Capital Assets' }
  ];

  groupOptions = [
    { label: 'RAW MATERIALS', value: 'RAW MATERIALS' },
    { label: 'OFFICE SUPPLIES', value: 'OFFICE SUPPLIES' }
  ];

  // SECTION 1: Header / Invoice Entry
  receiveType = signal<string>('Direct');
  invoiceDate = signal<string>(new Date().toISOString().split('T')[0]);
  refNo = signal<string>('');
  supplierInvoiceDate = signal<string>('2026-05-25');
  supplierInvoiceNo = signal<string>('');
  invoiceType = signal<string>('General');

  // Purchase Order Receive (GRN) and QC Details search collapsible
  grnSearchNo = signal<string>('');
  grnSearchDate = signal<string>('');

  // SECTION 2: Supplier Details
  company = signal<string>('ILICO SERVICES LTD.(vERP)');
  ccCenter = signal<string>('');
  department = signal<string>('');
  gstin = signal<string>('');
  entryType = signal<string>('Purchase');
  vendorCode = signal<string>('');
  deliveryAddress = signal<string>('');
  projectName = signal<string>('');
  projectDescription = signal<string>('');
  entryRelation = signal<string>('Company');
  costCentreName = signal<string>('');

  supplierName = signal<string>('');
  inactiveSupplier = signal<boolean>(false);
  productionUnit = signal<string>('');
  purchaseType = signal<string>('');
  supplierAddress = signal<string>('');
  remarks = signal<string>('');
  cashCredit = signal<string>('Credit');
  projectCode = signal<string>('');
  costCentreGroupName = signal<string>('');
  balance = signal<number>(0);

  // SECTION 3: Contact Person Details collapsible
  contactPerson = signal<string>('');
  contactDesignation = signal<string>('');
  contactPhone = signal<string>('');

  // SECTION 4: Contact Details Entry collapsible
  contactEmail = signal<string>('');
  contactAlternatePhone = signal<string>('');

  // SECTION 5: Item Details Search
  rateSelection = signal<string>('Normal');
  itemTypeFilter = signal<string>('');
  groupFilter = signal<string>('RAW MATERIALS');

  // SECTION 6: Item Details List
  items = signal<InvoiceItem[]>([
    { id: 1, code: 'ITM-MARBLE-01', name: 'White Carrara Marble Slab', qty: 50, rate: 250, taxPercent: 18, taxAmount: 2250, totalAmount: 14750 },
    { id: 2, code: 'ITEM-042', name: 'Ergonomic Chair Pro', qty: 2, rate: 8400, taxPercent: 18, taxAmount: 3024, totalAmount: 19824 }
  ]);

  roundOff = signal<number>(0);

  // SECTION 7: Terms & Conditions
  termPriceBasis = signal<string>('1. Price Basis: For, Ex');
  termPaymentTerms = signal<string>('2. Payment Terms: 30 days net');
  termPkgFwd = signal<string>('3. Packaging & Forwarding Charges: Inclusive');
  termTransportation = signal<string>('4. Transportation: By Road');
  termDeliveryTerms = signal<string>('5. Delivery Terms: Within 15 days');
  termErection = signal<string>('6. Erection/Supervision & Conditions: Not Applicable');
  termGuarantee = signal<string>('7. Guarantee & Warranty: 12 months standard warranty');
  termInspection = signal<string>('8. Inspection: At site');
  termRemarks = signal<string>('9. Remarks: Invoice check verified');

  // SECTION 8: Search / Filter Section
  searchCompany = signal<string>('ILICO SERVICES LTD.(vERP)');
  searchDept = signal<string>('');
  searchAmtFrom = signal<string>('');
  searchFromDate = signal<string>('2026-05-01');
  searchRefNo = signal<string>('');
  searchCcCenter = signal<string>('');
  searchProdUnit = signal<string>('');
  searchAmtTo = signal<string>('');
  searchToDate = signal<string>('2026-05-31');

  // Computeds
  subtotal = computed(() => {
    return this.items().reduce((sum, item) => sum + (item.qty * item.rate), 0);
  });

  totalTax = computed(() => {
    return this.items().reduce((sum, item) => sum + item.taxAmount, 0);
  });

  grandTotalBeforeRoundOff = computed(() => {
    return this.subtotal() + this.totalTax();
  });

  finalGrandTotal = computed(() => {
    return this.grandTotalBeforeRoundOff() + this.roundOff();
  });

  // History log database
  historyInvoices = signal<HistoryInvoice[]>([
    { id: 1, refNo: 'INV/2026/001', date: '2026-05-24', company: 'ILICO SERVICES LTD.(vERP)', department: 'Civil Department', ccCenter: 'Main Warehouse', amount: 34574 }
  ]);

  // Icons
  readonly LayoutGridIcon = LayoutGrid;
  readonly ShoppingCartIcon = ShoppingCart;
  readonly ChevronRightIcon = ChevronRight;
  readonly AlertCircleIcon = AlertCircle;
  readonly CalendarIcon = Calendar;
  readonly SearchIcon = Search;
  readonly Building2Icon = Building2;
  readonly ClipboardListIcon = ClipboardList;
  readonly FilterIcon = Filter;
  readonly RotateCcwIcon = RotateCcw;
  readonly SaveIcon = Save;
  readonly PlusIcon = Plus;
  readonly Trash2Icon = Trash2;
  readonly HelpCircleIcon = HelpCircle;
  readonly CheckIcon = Check;
  readonly BookOpenIcon = BookOpen;
  readonly FileTextIcon = FileText;
  readonly ChevronDownIcon = ChevronDown;
  readonly ChevronUpIcon = ChevronUp;
  readonly UserCheckIcon = UserCheck;
  readonly PhoneCallIcon = PhoneCall;
  readonly PlusCircleIcon = PlusCircle;
  readonly DollarSignIcon = DollarSign;
  readonly LayersIcon = Layers;

  toggleSection(section: 'grnSearch' | 'supplierDetails' | 'contactPersonDetails' | 'contactDetailsEntry' | 'itemSearch' | 'itemDetails' | 'termsConditions' | 'invoiceFilters') {
    this.sectionsExpanded.update(prev => ({ ...prev, [section]: !prev[section] }));
  }

  // Workflows
  onAddProduct() {
    const codes = ['ITM-ST-001', 'ITEM-050', 'ITEM-011'];
    const names = ['Structural Steel Angle 50x50', 'Filing Cabinet 4-Drawer', 'Laser Printer Pro'];
    const rates = [3200, 7800, 18500];

    const randomIdx = Math.floor(Math.random() * codes.length);
    const newId = this.items().length > 0 ? Math.max(...this.items().map(i => i.id)) + 1 : 1;

    const baseAmount = rates[randomIdx] * 5;
    const tax = baseAmount * 0.18;

    const newItem: InvoiceItem = {
      id: newId,
      code: codes[randomIdx],
      name: names[randomIdx],
      qty: 5,
      rate: rates[randomIdx],
      taxPercent: 18,
      taxAmount: tax,
      totalAmount: baseAmount + tax
    };

    this.items.update(list => [...list, newItem]);
  }

  onDeleteProduct(id: number) {
    this.items.update(list => list.filter(item => item.id !== id));
  }

  updateQty(id: number, val: string) {
    const qty = parseFloat(val) || 0;
    this.items.update(list => list.map(item => {
      if (item.id === id) {
        const baseAmount = qty * item.rate;
        const tax = baseAmount * (item.taxPercent / 100);
        return { 
          ...item, 
          qty: qty, 
          taxAmount: tax, 
          totalAmount: baseAmount + tax 
        };
      }
      return item;
    }));
  }

  updateTaxPercent(id: number, val: string) {
    const taxP = parseFloat(val) || 0;
    this.items.update(list => list.map(item => {
      if (item.id === id) {
        const baseAmount = item.qty * item.rate;
        const tax = baseAmount * (taxP / 100);
        return { 
          ...item, 
          taxPercent: taxP, 
          taxAmount: tax, 
          totalAmount: baseAmount + tax 
        };
      }
      return item;
    }));
  }

  onSaveInvoice() {
    if (!this.ccCenter() || !this.department() || !this.supplierName()) {
      alert('Please fill out all required fields: CC Center, Department, and Supplier Name.');
      return;
    }

    if (this.items().length === 0) {
      alert('Please add at least one item to save the Invoice.');
      return;
    }

    const nextId = this.historyInvoices().length + 1;
    const newInvoice: HistoryInvoice = {
      id: nextId,
      refNo: `INV/2026/00${nextId}`,
      date: this.invoiceDate(),
      company: this.company(),
      department: this.department(),
      ccCenter: this.ccCenter(),
      amount: this.finalGrandTotal()
    };

    this.historyInvoices.update(list => [newInvoice, ...list]);
    alert('Purchase Invoice saved successfully!');
    this.handleReset();
  }

  handleReset() {
    this.invoiceDate.set(new Date().toISOString().split('T')[0]);
    this.refNo.set('');
    this.supplierInvoiceDate.set('2026-05-25');
    this.supplierInvoiceNo.set('');
    this.invoiceType.set('General');
    this.grnSearchNo.set('');
    this.grnSearchDate.set('');
    this.ccCenter.set('');
    this.department.set('');
    this.gstin.set('');
    this.vendorCode.set('');
    this.deliveryAddress.set('');
    this.projectName.set('');
    this.projectDescription.set('');
    this.entryRelation.set('Company');
    this.costCentreName.set('');
    this.supplierName.set('');
    this.inactiveSupplier.set(false);
    this.productionUnit.set('');
    this.purchaseType.set('');
    this.supplierAddress.set('');
    this.remarks.set('');
    this.cashCredit.set('Credit');
    this.projectCode.set('');
    this.costCentreGroupName.set('');
    this.balance.set(0);
    this.contactPerson.set('');
    this.contactDesignation.set('');
    this.contactPhone.set('');
    this.contactEmail.set('');
    this.contactAlternatePhone.set('');
    this.roundOff.set(0);
    this.items.set([
      { id: 1, code: 'ITM-MARBLE-01', name: 'White Carrara Marble Slab', qty: 50, rate: 250, taxPercent: 18, taxAmount: 2250, totalAmount: 14750 },
      { id: 2, code: 'ITEM-042', name: 'Ergonomic Chair Pro', qty: 2, rate: 8400, taxPercent: 18, taxAmount: 3024, totalAmount: 19824 }
    ]);
  }

  parseFloat(val: string): number {
    return parseFloat(val) || 0;
  }
}
