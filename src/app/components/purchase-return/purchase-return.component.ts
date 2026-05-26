import { Component, signal, WritableSignal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  LucideAngularModule, 
  LayoutGrid, ShoppingCart, ChevronRight, AlertCircle, Calendar, Search, Building2, 
  ClipboardList, Filter, RotateCcw, Save, Plus, Trash2, HelpCircle, Check, ChevronDown, ChevronUp, UserCheck, RefreshCw
} from 'lucide-angular';

import { FloatingInputComponent } from '../shared/floating-input/floating-input.component';
import { FloatingSelectComponent } from '../shared/floating-select/floating-select.component';
import { FloatingTextareaComponent } from '../shared/floating-textarea/floating-textarea.component';

interface ReturnItem {
  id: number;
  code: string;
  name: string;
  qty: number;
  rate: number;
  taxPercent: number;
  taxAmount: number;
  totalAmount: number;
}

interface HistoryReturn {
  id: number;
  refNo: string;
  date: string;
  company: string;
  department: string;
  ccCenter: string;
  amount: number;
}

@Component({
  selector: 'app-purchase-return',
  standalone: true,
  imports: [
    CommonModule, 
    LucideAngularModule, 
    FloatingInputComponent, 
    FloatingSelectComponent, 
    FloatingTextareaComponent
  ],
  templateUrl: './purchase-return.component.html',
  styleUrl: './purchase-return.component.css'
})
export class PurchaseReturnComponent {
  // Collapsible section toggles
  sectionsExpanded = signal({
    headerDetails: true,
    entryDetails: true,
    contactDetails: false,
    invoiceDetails: true,
    searchFilters: false
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

  // SECTION 1: Header / Purchase Return Entry Section
  returnType = signal<string>('Against Invoice');
  invoiceType = signal<string>('General');
  debitNoteNo = signal<string>('');
  debitNoteDate = signal<string>(new Date().toISOString().split('T')[0]);
  supplierRefNo = signal<string>('');
  supplierRefDate = signal<string>('2026-05-25');

  // SECTION 2: Purchase Return Entry Details
  company = signal<string>('ILICO SERVICES LTD.(vERP)');
  ccCenter = signal<string>('');
  department = signal<string>('');
  entryType = signal<string>('Purchase');
  entryRelation = signal<string>('Company');
  costCentreName = signal<string>('');

  supplierName = signal<string>('');
  inactiveSupplier = signal<boolean>(false);
  productionUnit = signal<string>('');
  purchaseType = signal<string>('');
  costCentreGroupName = signal<string>('');
  balance = signal<number>(0);

  // SECTION 3: Contact Person Details collapsible
  contactPerson = signal<string>('');
  contactDesignation = signal<string>('');
  contactPhone = signal<string>('');

  // SECTION 4: Invoice Details list
  items = signal<ReturnItem[]>([
    { id: 1, code: 'ITM-MARBLE-01', name: 'White Carrara Marble Slab', qty: 2, rate: 250, taxPercent: 18, taxAmount: 90, totalAmount: 590 },
    { id: 2, code: 'ITEM-042', name: 'Ergonomic Chair Pro', qty: 1, rate: 8400, taxPercent: 18, taxAmount: 1512, totalAmount: 9912 }
  ]);

  roundOff = signal<number>(0);

  // SECTION 5: Return / Debit Note Search Filters
  searchCompany = signal<string>('ILICO SERVICES LTD.(vERP)');
  searchDept = signal<string>('');
  searchRefNo = signal<string>('');
  searchAmtFrom = signal<string>('');
  searchFromDate = signal<string>('2026-05-01');
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
  historyReturns = signal<HistoryReturn[]>([
    { id: 1, refNo: 'RTN/2026/001', date: '2026-05-24', company: 'ILICO SERVICES LTD.(vERP)', department: 'Civil Department', ccCenter: 'Main Warehouse', amount: 10502 }
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
  readonly ChevronDownIcon = ChevronDown;
  readonly ChevronUpIcon = ChevronUp;
  readonly UserCheckIcon = UserCheck;
  readonly RefreshCwIcon = RefreshCw;

  toggleSection(section: 'headerDetails' | 'entryDetails' | 'contactDetails' | 'invoiceDetails' | 'searchFilters') {
    this.sectionsExpanded.update(prev => ({ ...prev, [section]: !prev[section] }));
  }

  // Workflows
  onAddProduct() {
    const codes = ['ITM-ST-001', 'ITEM-050', 'ITEM-011'];
    const names = ['Structural Steel Angle 50x50', 'Filing Cabinet 4-Drawer', 'Laser Printer Pro'];
    const rates = [3200, 7800, 18500];

    const randomIdx = Math.floor(Math.random() * codes.length);
    const newId = this.items().length > 0 ? Math.max(...this.items().map(i => i.id)) + 1 : 1;

    const baseAmount = rates[randomIdx] * 1;
    const tax = baseAmount * 0.18;

    const newItem: ReturnItem = {
      id: newId,
      code: codes[randomIdx],
      name: names[randomIdx],
      qty: 1,
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

  onSaveReturn() {
    if (!this.ccCenter() || !this.department() || !this.supplierName()) {
      alert('Please fill out all required fields: CC Center, Department, and Supplier.');
      return;
    }

    if (this.items().length === 0) {
      alert('Please add at least one item to save the Purchase Return (Debit Note).');
      return;
    }

    const nextId = this.historyReturns().length + 1;
    const newReturn: HistoryReturn = {
      id: nextId,
      refNo: `RTN/2026/00${nextId}`,
      date: this.debitNoteDate(),
      company: this.company(),
      department: this.department(),
      ccCenter: this.ccCenter(),
      amount: this.finalGrandTotal()
    };

    this.historyReturns.update(list => [newReturn, ...list]);
    alert('Purchase Return (Debit Note) saved successfully!');
    this.handleReset();
  }

  handleReset() {
    this.debitNoteDate.set(new Date().toISOString().split('T')[0]);
    this.debitNoteNo.set('');
    this.supplierRefDate.set('2026-05-25');
    this.supplierRefNo.set('');
    this.invoiceType.set('General');
    this.returnType.set('Against Invoice');
    this.ccCenter.set('');
    this.department.set('');
    this.costCentreName.set('');
    this.supplierName.set('');
    this.inactiveSupplier.set(false);
    this.productionUnit.set('');
    this.purchaseType.set('');
    this.costCentreGroupName.set('');
    this.balance.set(0);
    this.contactPerson.set('');
    this.contactDesignation.set('');
    this.contactPhone.set('');
    this.roundOff.set(0);
    this.items.set([
      { id: 1, code: 'ITM-MARBLE-01', name: 'White Carrara Marble Slab', qty: 2, rate: 250, taxPercent: 18, taxAmount: 90, totalAmount: 590 },
      { id: 2, code: 'ITEM-042', name: 'Ergonomic Chair Pro', qty: 1, rate: 8400, taxPercent: 18, taxAmount: 1512, totalAmount: 9912 }
    ]);
  }

  parseFloat(val: string): number {
    return parseFloat(val) || 0;
  }
}
