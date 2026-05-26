import { Component, signal, WritableSignal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  LucideAngularModule, 
  LayoutGrid, ShoppingCart, ChevronRight, AlertCircle, Calendar, Search, Building2, 
  ClipboardList, Filter, RotateCcw, Save, Plus, Trash2, HelpCircle, Check, BookOpen, FileText, ChevronDown, ChevronUp, Truck, ShieldCheck, UserCheck
} from 'lucide-angular';

import { FloatingInputComponent } from '../shared/floating-input/floating-input.component';
import { FloatingSelectComponent } from '../shared/floating-select/floating-select.component';
import { FloatingTextareaComponent } from '../shared/floating-textarea/floating-textarea.component';

interface MRNItem {
  id: number;
  code: string;
  name: string;
  poQty: number;
  receivedQty: number;
  rejectedQty: number;
  acceptedQty: number;
  unit: string;
  rate: number;
  amount: number;
}

interface HistoryMRN {
  id: number;
  refNo: string;
  date: string;
  company: string;
  department: string;
  ccCenter: string;
  amount: number;
}

@Component({
  selector: 'app-purchase-order-receive-mrn',
  standalone: true,
  imports: [
    CommonModule, 
    LucideAngularModule, 
    FloatingInputComponent, 
    FloatingSelectComponent, 
    FloatingTextareaComponent
  ],
  templateUrl: './purchase-order-receive-mrn.component.html',
  styleUrl: './purchase-order-receive-mrn.component.css'
})
export class PurchaseOrderReceiveMrnComponent {
  // Collapsible section toggles
  sectionsExpanded = signal({
    poDetails: false,
    vehicleDetails: false,
    insuranceDetails: false,
    supplierDetails: true,
    contactDetails: false,
    itemDetails: true,
    termsConditions: true,
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

  // SECTION 1: Header / Receive Entry
  receiveType = signal<string>('Against Order');
  entryDate = signal<string>(new Date().toISOString().split('T')[0]);
  refNo = signal<string>('');

  // PO Details collapsible
  poNumber = signal<string>('');
  poDate = signal<string>('');

  // Vehicle details collapsible
  vehicleNo = signal<string>('');
  driverName = signal<string>('');
  gatePassNo = signal<string>('');
  transporterName = signal<string>('');

  // Insurance details collapsible
  insuranceCo = signal<string>('');
  policyNo = signal<string>('');
  insuranceValue = signal<number>(0);

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
  supplierName = signal<string>('');
  inactiveSupplier = signal<boolean>(false);
  productionUnit = signal<string>('');
  purchaseType = signal<string>('');
  supplierAddress = signal<string>('');
  remarks = signal<string>('');
  projectCode = signal<string>('');
  balance = signal<number>(0);

  // SECTION 3: Contact Person Details
  contactPerson = signal<string>('');
  contactDesignation = signal<string>('');
  contactPhone = signal<string>('');

  // SECTION 4: Received Item Details
  items = signal<MRNItem[]>([
    { id: 1, code: 'ITM-MARBLE-01', name: 'White Carrara Marble Slab', poQty: 100, receivedQty: 98, rejectedQty: 3, acceptedQty: 95, unit: 'SqFt', rate: 250, amount: 23750 },
    { id: 2, code: 'ITEM-042', name: 'Ergonomic Chair Pro', poQty: 5, receivedQty: 5, rejectedQty: 0, acceptedQty: 5, unit: 'Pcs', rate: 8400, amount: 42000 }
  ]);

  // SECTION 5: Terms & Conditions
  termPriceBasis = signal<string>('1. Price Basis: For, Ex');
  termPaymentTerms = signal<string>('2. Payment Terms: 30 days net');
  termPkgFwd = signal<string>('3. Packaging & Forwarding Charges: Inclusive');
  termTransportation = signal<string>('4. Transportation: By Road');
  termDeliveryTerms = signal<string>('5. Delivery Terms: Within 15 days');
  termErection = signal<string>('6. Erection/Supervision & Conditions: Not Applicable');
  termGuarantee = signal<string>('7. Guarantee & Warranty: 12 months standard warranty');
  termInspection = signal<string>('8. Inspection: At site');
  termRemarks = signal<string>('9. Remarks: Quality certificate is mandatory with dispatch documents');

  // SECTION 6: Order Receive Search / Filter Section
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
    return this.items().reduce((sum, item) => sum + item.amount, 0);
  });

  // History MRNs list
  historyMRNs = signal<HistoryMRN[]>([
    { id: 1, refNo: 'MRN/2026/001', date: '2026-05-24', company: 'ILICO SERVICES LTD.(vERP)', department: 'Civil Department', ccCenter: 'Main Warehouse', amount: 65750 }
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
  readonly TruckIcon = Truck;
  readonly ShieldCheckIcon = ShieldCheck;
  readonly UserCheckIcon = UserCheck;

  toggleSection(section: 'poDetails' | 'vehicleDetails' | 'insuranceDetails' | 'supplierDetails' | 'contactDetails' | 'itemDetails' | 'termsConditions' | 'searchFilters') {
    this.sectionsExpanded.update(prev => ({ ...prev, [section]: !prev[section] }));
  }

  // Workflows
  onAddProduct() {
    const codes = ['ITM-ST-001', 'ITEM-050', 'ITEM-011'];
    const names = ['Structural Steel Angle 50x50', 'Filing Cabinet 4-Drawer', 'Laser Printer Pro'];
    const rates = [3200, 7800, 18500];
    const units = ['Pcs', 'Pcs', 'Pcs'];

    const randomIdx = Math.floor(Math.random() * codes.length);
    const newId = this.items().length > 0 ? Math.max(...this.items().map(i => i.id)) + 1 : 1;

    const newItem: MRNItem = {
      id: newId,
      code: codes[randomIdx],
      name: names[randomIdx],
      poQty: 10,
      receivedQty: 10,
      rejectedQty: 0,
      acceptedQty: 10,
      unit: units[randomIdx],
      rate: rates[randomIdx],
      amount: rates[randomIdx] * 10
    };

    this.items.update(list => [...list, newItem]);
  }

  onDeleteProduct(id: number) {
    this.items.update(list => list.filter(item => item.id !== id));
  }

  updateReceivedQty(id: number, val: string) {
    const qty = parseFloat(val) || 0;
    this.items.update(list => list.map(item => {
      if (item.id === id) {
        const accepted = Math.max(0, qty - item.rejectedQty);
        return { ...item, receivedQty: qty, acceptedQty: accepted, amount: accepted * item.rate };
      }
      return item;
    }));
  }

  updateRejectedQty(id: number, val: string) {
    const qty = parseFloat(val) || 0;
    this.items.update(list => list.map(item => {
      if (item.id === id) {
        const accepted = Math.max(0, item.receivedQty - qty);
        return { ...item, rejectedQty: qty, acceptedQty: accepted, amount: accepted * item.rate };
      }
      return item;
    }));
  }

  onSaveMRN() {
    if (!this.ccCenter() || !this.department() || !this.supplierName()) {
      alert('Please fill out all required fields: CC Center, Department, and Supplier Name.');
      return;
    }

    if (this.items().length === 0) {
      alert('Please add at least one item to receive.');
      return;
    }

    const nextId = this.historyMRNs().length + 1;
    const newMRN: HistoryMRN = {
      id: nextId,
      refNo: `MRN/2026/00${nextId}`,
      date: this.entryDate(),
      company: this.company(),
      department: this.department(),
      ccCenter: this.ccCenter(),
      amount: this.subtotal()
    };

    this.historyMRNs.update(list => [newMRN, ...list]);
    alert('Material Receipt Note (MRN) saved successfully!');
    this.handleReset();
  }

  handleReset() {
    this.entryDate.set(new Date().toISOString().split('T')[0]);
    this.refNo.set('');
    this.poNumber.set('');
    this.poDate.set('');
    this.vehicleNo.set('');
    this.driverName.set('');
    this.gatePassNo.set('');
    this.transporterName.set('');
    this.insuranceCo.set('');
    this.policyNo.set('');
    this.insuranceValue.set(0);
    this.ccCenter.set('');
    this.department.set('');
    this.gstin.set('');
    this.vendorCode.set('');
    this.deliveryAddress.set('');
    this.projectName.set('');
    this.projectDescription.set('');
    this.supplierName.set('');
    this.inactiveSupplier.set(false);
    this.productionUnit.set('');
    this.purchaseType.set('');
    this.supplierAddress.set('');
    this.remarks.set('');
    this.projectCode.set('');
    this.balance.set(0);
    this.contactPerson.set('');
    this.contactDesignation.set('');
    this.contactPhone.set('');
    this.items.set([
      { id: 1, code: 'ITM-MARBLE-01', name: 'White Carrara Marble Slab', poQty: 100, receivedQty: 98, rejectedQty: 3, acceptedQty: 95, unit: 'SqFt', rate: 250, amount: 23750 },
      { id: 2, code: 'ITEM-042', name: 'Ergonomic Chair Pro', poQty: 5, receivedQty: 5, rejectedQty: 0, acceptedQty: 5, unit: 'Pcs', rate: 8400, amount: 42000 }
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
