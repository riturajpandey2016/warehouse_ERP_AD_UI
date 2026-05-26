import { Component, signal, WritableSignal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  LucideAngularModule, 
  LayoutGrid, ShoppingCart, ChevronRight, AlertCircle, Calendar, Search, Building2, 
  ClipboardList, Filter, RotateCcw, Save, Plus, Trash2, HelpCircle, Check, BookOpen, FileText, ChevronDown, ChevronUp
} from 'lucide-angular';

import { FloatingInputComponent } from '../shared/floating-input/floating-input.component';
import { FloatingSelectComponent } from '../shared/floating-select/floating-select.component';
import { FloatingTextareaComponent } from '../shared/floating-textarea/floating-textarea.component';

interface OrderItem {
  id: number;
  code: string;
  name: string;
  unit: string;
  qty: number;
  rate: number;
  tax: number;
  total: number;
}

interface SavedOrder {
  id: number;
  date: string;
  orderNo: string;
  company: string;
  ccCenter: string;
  department: string;
  amount: number;
  status: string;
}

@Component({
  selector: 'app-purchase-order',
  standalone: true,
  imports: [
    CommonModule, 
    LucideAngularModule, 
    FloatingInputComponent, 
    FloatingSelectComponent, 
    FloatingTextareaComponent
  ],
  templateUrl: './purchase-order.component.html',
  styleUrl: './purchase-order.component.css'
})
export class PurchaseOrderComponent {
  // Collapsible section toggles
  sectionsExpanded = signal({
    requisitionSearch: false,
    supplierDetails: true,
    itemDetails: true,
    termsConditions: true,
    orderFilter: false
  });

  // Entry options lists
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

  groupOptions = [
    { label: 'RAW MATERIALS', value: 'RAW MATERIALS' },
    { label: 'FINISHED GOODS', value: 'FINISHED GOODS' },
    { label: 'SPARE PARTS', value: 'SPARE PARTS' }
  ];

  itemTypeOptions = [
    { label: 'Select Item Type', value: '' },
    { label: 'Hardware', value: 'Hardware' },
    { label: 'Software', value: 'Software' },
    { label: 'Stone', value: 'Stone' }
  ];

  purchaseTypeOptions = [
    { label: 'Select Purchase Account Name', value: '' },
    { label: 'Local Purchase Taxable', value: 'Local Purchase Taxable' },
    { label: 'Import Purchase', value: 'Import Purchase' },
    { label: 'Interstate Purchase', value: 'Interstate Purchase' }
  ];

  costCentreGroupOptions = [
    { label: 'Select Group Name', value: '' },
    { label: 'Construction Group', value: 'Construction Group' },
    { label: 'Administrative Group', value: 'Administrative Group' }
  ];

  // SECTION 1: Order Entry details
  orderType = signal<string>('Direct');
  date = signal<string>(new Date().toISOString().split('T')[0]);
  refNo = signal<string>('');

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
  ccGroupName1 = signal<string>('');
  ccGroupName2 = signal<string>('');
  supplierName = signal<string>('');
  inactiveSupplier = signal<boolean>(false);
  productionUnit = signal<string>('');
  purchaseType = signal<string>('');
  supplierAddress = signal<string>('');
  projectCode = signal<string>('');
  paymentType = signal<string>('None');
  balance = signal<number>(125000);
  leftAmount = signal<number>(0);

  // SECTION 3: Item Details Setup
  rateType = signal<string>('Normal');
  itemType = signal<string>('');
  group = signal<string>('RAW MATERIALS');

  // SECTION 4: Added Items grid
  items = signal<OrderItem[]>([
    { id: 1, code: 'ITM-MARBLE-01', name: 'White Carrara Marble Slab', unit: 'SqFt', qty: 100, rate: 250, tax: 18, total: 29500 },
    { id: 2, code: 'ITEM-042', name: 'Ergonomic Chair Pro', unit: 'Pcs', qty: 5, rate: 8400, tax: 18, total: 49560 }
  ]);

  // SECTION 5: Tax Details
  taxCalculated = signal<boolean>(false);

  // SECTION 6: Terms & Conditions Editor Toggles & Strings
  termPriceBasis = signal<string>('1. Price Basis: For, Ex');
  termPaymentTerms = signal<string>('2. Payment Terms: 30 days net from receipt of goods');
  termPkgFwd = signal<string>('3. Packaging & Forwarding Charges: Inclusive');
  termTransportation = signal<string>('4. Transportation: Customer Scope');
  termDeliveryTerms = signal<string>('5. Delivery Terms: Within 3 weeks from PO Date');
  termErection = signal<string>('6. Erection/Supervision & Conditions: Not Applicable');
  termGuarantee = signal<string>('7. Guarantee & Warranty: 12 months standard warranty against manufacturing defects');
  termInspection = signal<string>('8. Inspection: Pre-dispatch inspection at vendor site');
  termRemarks = signal<string>('9. Remarks: Quality certificate is mandatory with dispatch documents');

  // SECTION 7: Order Search / Filter Panel
  searchCompany = signal<string>('ILICO SERVICES LTD.(vERP)');
  searchCcCenter = signal<string>('');
  searchDept = signal<string>('');
  searchProdUnit = signal<string>('');
  searchAmtFrom = signal<string>('');
  searchAmtTo = signal<string>('');
  searchFromDate = signal<string>('2026-04-01');
  searchToDate = signal<string>('2026-08-31');

  // Computed Totals
  subtotal = computed(() => {
    return this.items().reduce((sum, item) => sum + (item.qty * item.rate), 0);
  });

  taxAmount = computed(() => {
    return this.items().reduce((sum, item) => sum + ((item.qty * item.rate) * (item.tax / 100)), 0);
  });

  grandTotal = computed(() => {
    return this.subtotal() + this.taxAmount();
  });

  // Saved Orders Database
  savedOrders = signal<SavedOrder[]>([
    { id: 1, date: '2026-05-24', orderNo: 'PO/2026/001', company: 'ILICO SERVICES LTD.(vERP)', ccCenter: 'Main Warehouse', department: 'Civil Department', amount: 79060, status: 'OPEN' }
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

  toggleSection(section: 'requisitionSearch' | 'supplierDetails' | 'itemDetails' | 'termsConditions' | 'orderFilter') {
    this.sectionsExpanded.update(prev => ({ ...prev, [section]: !prev[section] }));
  }

  // Workflows
  onCalculateTax() {
    this.taxCalculated.set(true);
    alert('GST / Tax breakdown calculated successfully!');
  }

  onAddProduct() {
    const codes = ['ITM-ST-001', 'ITEM-050', 'ITEM-011'];
    const names = ['Structural Steel Angle 50x50', 'Filing Cabinet 4-Drawer', 'Laser Printer Pro'];
    const units = ['Pcs', 'Pcs', 'Pcs'];
    const rates = [3200, 7800, 18500];

    const randomIdx = Math.floor(Math.random() * codes.length);
    const newId = this.items().length > 0 ? Math.max(...this.items().map(i => i.id)) + 1 : 1;
    
    const newItem: OrderItem = {
      id: newId,
      code: codes[randomIdx],
      name: names[randomIdx],
      unit: units[randomIdx],
      qty: 10,
      rate: rates[randomIdx],
      tax: 18,
      total: rates[randomIdx] * 10 * 1.18
    };

    this.items.update(list => [...list, newItem]);
  }

  onDeleteProduct(id: number) {
    this.items.update(list => list.filter(item => item.id !== id));
  }

  updateItemQty(id: number, value: string) {
    const num = parseFloat(value) || 0;
    this.items.update(list => list.map(item => {
      if (item.id === id) {
        const total = num * item.rate * (1 + item.tax / 100);
        return { ...item, qty: num, total };
      }
      return item;
    }));
  }

  updateItemRate(id: number, value: string) {
    const num = parseFloat(value) || 0;
    this.items.update(list => list.map(item => {
      if (item.id === id) {
        const total = item.qty * num * (1 + item.tax / 100);
        return { ...item, rate: num, total };
      }
      return item;
    }));
  }

  saveOrder() {
    if (!this.ccCenter() || !this.department() || !this.supplierName()) {
      alert('Please fill out all required fields: CC Center, Department, and Supplier Name.');
      return;
    }

    if (this.items().length === 0) {
      alert('Please add at least one item to the Purchase Order.');
      return;
    }

    const nextId = this.savedOrders().length + 1;
    const newOrder: SavedOrder = {
      id: nextId,
      date: this.date(),
      orderNo: `PO/2026/00${nextId}`,
      company: this.company(),
      ccCenter: this.ccCenter(),
      department: this.department(),
      amount: this.grandTotal(),
      status: 'OPEN'
    };

    this.savedOrders.update(list => [newOrder, ...list]);
    alert('Purchase Order saved successfully!');
    this.handleReset();
  }

  handleReset() {
    this.orderType.set('Direct');
    this.date.set(new Date().toISOString().split('T')[0]);
    this.refNo.set('');
    this.ccCenter.set('');
    this.department.set('');
    this.gstin.set('');
    this.vendorCode.set('');
    this.deliveryAddress.set('');
    this.projectName.set('');
    this.projectDescription.set('');
    this.entryRelation.set('Company');
    this.ccGroupName1.set('');
    this.ccGroupName2.set('');
    this.supplierName.set('');
    this.inactiveSupplier.set(false);
    this.productionUnit.set('');
    this.purchaseType.set('');
    this.supplierAddress.set('');
    this.projectCode.set('');
    this.paymentType.set('None');
    this.balance.set(125000);
    this.leftAmount.set(0);
    this.rateType.set('Normal');
    this.itemType.set('');
    this.group.set('RAW MATERIALS');
    this.taxCalculated.set(false);
    this.items.set([
      { id: 1, code: 'ITM-MARBLE-01', name: 'White Carrara Marble Slab', unit: 'SqFt', qty: 100, rate: 250, tax: 18, total: 29500 },
      { id: 2, code: 'ITEM-042', name: 'Ergonomic Chair Pro', unit: 'Pcs', qty: 5, rate: 8400, tax: 18, total: 49560 }
    ]);
  }

  onAddSupplier() {
    alert('Trigger Add Supplier Dialog / Overlay');
  }

  onViewSupplierDetails() {
    alert(`Viewing Details for Supplier: ${this.supplierName() || 'None Selected'}`);
  }

  parseFloat(val: string): number {
    return parseFloat(val) || 0;
  }
}
