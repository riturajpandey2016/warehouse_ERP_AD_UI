import { Component, signal, WritableSignal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  LucideAngularModule, 
  Save, RotateCcw, ChevronRight, LayoutGrid, ShoppingCart, Calendar, Search, Plus, 
  Building2, Layers, ClipboardList, MapPin, FileText, AlertCircle, Trash2, ChevronDown, ChevronUp, Filter, Eye
} from 'lucide-angular';

import { FloatingInputComponent } from '../shared/floating-input/floating-input.component';
import { FloatingSelectComponent } from '../shared/floating-select/floating-select.component';
import { FloatingTextareaComponent } from '../shared/floating-textarea/floating-textarea.component';

interface FormData {
  date: string;
  refNo: string;
  company: string;
  ccCenter: string;
  department: string;
  projectName: string;
  projectDescription: string;
  entryType: string;
  group: string;
  deliveryAddress: string;
  productionUnit: string;
  projectCode: string;
  remarks: string;
  itemType: string;
}

interface Item {
  id: number;
  code: string;
  name: string;
  unit: string;
  qty: number;
  rate: number;
  tax: number;
  total: number;
}

interface RequisitionRecord {
  id: number;
  date: string;
  reqNo: string;
  branch: string;
  department: string;
  amount: number;
  status: string;
  items: { code: string; name: string; unit: string; qty: number; rate: number; tax: number; total: number; }[];
}

interface QuotationRecord {
  id: number;
  date: string;
  qtnNo: string;
  company: string;
  branch: string;
  department: string;
  amount: number;
  status: string;
}

@Component({
  selector: 'app-purchase-quotation',
  standalone: true,
  imports: [
    CommonModule, 
    LucideAngularModule, 
    FloatingInputComponent, 
    FloatingSelectComponent, 
    FloatingTextareaComponent
  ],
  templateUrl: './purchase-quotation.component.html',
  styleUrl: './purchase-quotation.component.css'
})
export class PurchaseQuotationComponent {
  // Navigation / Collapsible section signals
  sectionsExpanded = signal({
    supplier: true,
    items: true,
    requisitionSearch: true,
    addedQuotationsFilter: false
  });

  // Type Selector Signals
  quotationType: WritableSignal<string> = signal('Direct');
  rateType: WritableSignal<string> = signal('Normal');

  // Entry Form Data Signal
  formData: WritableSignal<FormData> = signal({
    date: new Date().toISOString().split('T')[0],
    refNo: '',
    company: 'ILICO SERVICES LTD.(vERP)',
    ccCenter: '',
    department: '',
    projectName: '',
    projectDescription: '',
    entryType: 'Purchase',
    group: 'FINISHED',
    deliveryAddress: '',
    productionUnit: '',
    projectCode: '',
    remarks: '',
    itemType: '',
  });

  // Items currently inside entry grid
  items: WritableSignal<Item[]> = signal([
    { id: 1, code: 'ITEM-001', name: 'Premium Office Desk', unit: 'Pcs', qty: 5, rate: 12500, tax: 18, total: 73750 },
    { id: 2, code: 'ITEM-042', name: 'Ergonomic Chair Pro', unit: 'Pcs', qty: 12, rate: 8400, tax: 18, total: 118944 }
  ]);

  // Dummy Requisitions Database
  requisitions: WritableSignal<RequisitionRecord[]> = signal([
    { 
      id: 1, 
      date: '2026-05-19', 
      reqNo: 'REQ-2026-003', 
      branch: 'Main Warehouse', 
      department: 'Civil Department', 
      amount: 165000, 
      status: 'APPROVED',
      items: [
        { code: 'ITM-MARBLE-01', name: 'White Carrara Marble Slab', unit: 'SqFt', qty: 300, rate: 250, tax: 18, total: 88500 },
        { code: 'ITM-GRANITE-02', name: 'Black Galaxy Granite 18mm', unit: 'SqFt', qty: 500, rate: 180, tax: 18, total: 106200 }
      ]
    },
    { 
      id: 2, 
      date: '2026-05-15', 
      reqNo: 'REQ-2026-002', 
      branch: 'Head Office', 
      department: 'Production Dept', 
      amount: 75000, 
      status: 'APPROVED',
      items: [
        { code: 'ITEM-001', name: 'Premium Office Desk', unit: 'Pcs', qty: 6, rate: 12500, tax: 18, total: 75000 }
      ]
    },
    { 
      id: 3, 
      date: '2026-05-10', 
      reqNo: 'REQ-2026-001', 
      branch: 'Head Office', 
      department: 'Civil Department', 
      amount: 220000, 
      status: 'APPROVED',
      items: [
        { code: 'ITM-MARBLE-01', name: 'White Carrara Marble Slab', unit: 'SqFt', qty: 500, rate: 250, tax: 18, total: 147500 },
        { code: 'ITEM-042', name: 'Ergonomic Chair Pro', unit: 'Pcs', qty: 10, rate: 8400, tax: 18, total: 99120 }
      ]
    }
  ]);

  // Requisition Search Criteria Signals
  reqSearchBranch = signal<string>('');
  reqSearchDept = signal<string>('');
  reqSearchProductionUnit = signal<string>('');
  reqSearchRefNo = signal<string>('');
  reqSearchDateFrom = signal<string>('2026-04-01');
  reqSearchDateTo = signal<string>('2026-08-31');

  // Filtered Requisitions list based on search criteria
  filteredRequisitions = computed(() => {
    return this.requisitions().filter(req => {
      const branchMatch = !this.reqSearchBranch() || req.branch.toLowerCase().includes(this.reqSearchBranch().toLowerCase());
      const deptMatch = !this.reqSearchDept() || req.department.toLowerCase().includes(this.reqSearchDept().toLowerCase());
      const refMatch = !this.reqSearchRefNo() || req.reqNo.toLowerCase().includes(this.reqSearchRefNo().toLowerCase());
      const dateFromMatch = !this.reqSearchDateFrom() || req.date >= this.reqSearchDateFrom();
      const dateToMatch = !this.reqSearchDateTo() || req.date <= this.reqSearchDateTo();
      return branchMatch && deptMatch && refMatch && dateFromMatch && dateToMatch;
    });
  });

  // Dummy Saved Quotations Database
  addedQuotations: WritableSignal<QuotationRecord[]> = signal([
    { id: 1, date: '2026-05-24', qtnNo: 'QTN/2026/001', company: 'ILICO SERVICES LTD.(vERP)', branch: 'Main Warehouse', department: 'Civil Department', amount: 194700, status: 'PENDING' },
    { id: 2, date: '2026-05-20', qtnNo: 'QTN/2026/002', company: 'Global Distribution Ltd', branch: 'Head Office', department: 'Production Dept', amount: 88500, status: 'APPROVED' }
  ]);

  // Saved Quotations Filter Criteria Signals
  filterCompany = signal<string>('ILICO SERVICES LTD.(vERP)');
  filterDepartment = signal<string>('');
  filterRefNo = signal<string>('');
  filterFromDate = signal<string>('2026-04-01');
  filterToDate = signal<string>('2026-08-31');
  filterCcCenter = signal<string>('');
  filterProductionUnit = signal<string>('');

  // Filtered Saved Quotations list based on filter criteria
  filteredAddedQuotations = computed(() => {
    return this.addedQuotations().filter(qtn => {
      const compMatch = !this.filterCompany() || qtn.company.toLowerCase().includes(this.filterCompany().toLowerCase());
      const deptMatch = !this.filterDepartment() || qtn.department.toLowerCase().includes(this.filterDepartment().toLowerCase());
      const refMatch = !this.filterRefNo() || qtn.qtnNo.toLowerCase().includes(this.filterRefNo().toLowerCase());
      const ccMatch = !this.filterCcCenter() || qtn.branch.toLowerCase().includes(this.filterCcCenter().toLowerCase());
      const dateFromMatch = !this.filterFromDate() || qtn.date >= this.filterFromDate();
      const dateToMatch = !this.filterToDate() || qtn.date <= this.filterToDate();
      return compMatch && deptMatch && refMatch && ccMatch && dateFromMatch && dateToMatch;
    });
  });

  // Computed totals for current items table
  subtotal = computed(() => {
    return this.items().reduce((sum, item) => sum + (item.qty * item.rate), 0);
  });

  taxAmount = computed(() => {
    return this.items().reduce((sum, item) => sum + ((item.qty * item.rate) * (item.tax / 100)), 0);
  });

  grandTotal = computed(() => {
    return this.subtotal() + this.taxAmount();
  });

  totalQuotationsAmount = computed(() => {
    return this.addedQuotations().reduce((sum, q) => sum + q.amount, 0);
  });

  // Form options lists
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

  groupOptions = [
    { label: 'FINISHED', value: 'FINISHED' },
    { label: 'RAW MATERIALS', value: 'RAW MATERIALS' },
    { label: 'OFFICE SUPPLIES', value: 'OFFICE SUPPLIES' }
  ];

  productionUnitOptions = [
    { label: 'Select Production Unit', value: '' },
    { label: 'Main Facility', value: 'Main Facility' },
    { label: 'Stone Crushing Unit A', value: 'Stone Crushing Unit A' }
  ];

  itemTypeOptions = [
    { label: 'Select Item Type', value: '' },
    { label: 'Hardware', value: 'Hardware' },
    { label: 'Software', value: 'Software' },
    { label: 'Stone', value: 'Stone' },
    { label: 'Raw Material', value: 'Raw Material' }
  ];

  entryTypeOptions = [
    { label: 'Purchase', value: 'Purchase' },
    { label: 'Sales', value: 'Sales' },
    { label: 'Standard', value: 'Standard' }
  ];

  // Icons
  readonly LayoutGridIcon = LayoutGrid;
  readonly ChevronRightIcon = ChevronRight;
  readonly ShoppingCartIcon = ShoppingCart;
  readonly SaveIcon = Save;
  readonly RotateCcwIcon = RotateCcw;
  readonly CalendarIcon = Calendar;
  readonly LayersIcon = Layers;
  readonly FileTextIcon = FileText;
  readonly ClipboardListIcon = ClipboardList;
  readonly Building2Icon = Building2;
  readonly ChevronDownIcon = ChevronDown;
  readonly ChevronUpIcon = ChevronUp;
  readonly SearchIcon = Search;
  readonly PlusIcon = Plus;
  readonly Trash2Icon = Trash2;
  readonly AlertCircleIcon = AlertCircle;
  readonly MapPinIcon = MapPin;
  readonly FilterIcon = Filter;
  readonly EyeIcon = Eye;

  toggleSection(section: 'supplier' | 'items' | 'requisitionSearch' | 'addedQuotationsFilter') {
    this.sectionsExpanded.update(prev => ({ ...prev, [section]: !prev[section] }));
  }

  handleInputChange(field: keyof FormData, value: string) {
    this.formData.update(prev => ({ ...prev, [field]: value }));
  }

  setQuotationType(type: string) {
    this.quotationType.set(type);
  }

  setRateType(type: string) {
    this.rateType.set(type);
  }

  handleReset() {
    this.formData.set({
      date: new Date().toISOString().split('T')[0],
      refNo: '',
      company: 'ILICO SERVICES LTD.(vERP)',
      ccCenter: '',
      department: '',
      projectName: '',
      projectDescription: '',
      entryType: 'Purchase',
      group: 'FINISHED',
      deliveryAddress: '',
      productionUnit: '',
      projectCode: '',
      remarks: '',
      itemType: '',
    });
    this.items.set([
      { id: 1, code: 'ITEM-001', name: 'Premium Office Desk', unit: 'Pcs', qty: 5, rate: 12500, tax: 18, total: 73750 },
      { id: 2, code: 'ITEM-042', name: 'Ergonomic Chair Pro', unit: 'Pcs', qty: 12, rate: 8400, tax: 18, total: 118944 }
    ]);
    this.quotationType.set('Direct');
    this.rateType.set('Normal');
  }

  onAddProduct() {
    const newId = this.items().length > 0 ? Math.max(...this.items().map(i => i.id)) + 1 : 1;
    const codes = ['ITEM-020', 'ITEM-112', 'ITEM-095', 'ITEM-003'];
    const names = ['Steel Support Beam 6m', 'Heavy Duty Caster Wheels', 'Premium Concrete Mix 50kg', 'Power Drill Industrial'];
    const units = ['Pcs', 'Pcs', 'Bags', 'Pcs'];
    const rates = [4500, 1200, 650, 8900];

    const randomIdx = Math.floor(Math.random() * codes.length);
    const newItem: Item = {
      id: newId,
      code: codes[randomIdx],
      name: names[randomIdx],
      unit: units[randomIdx],
      qty: 1,
      rate: rates[randomIdx],
      tax: 18,
      total: rates[randomIdx] * 1.18
    };

    this.items.update(list => [...list, newItem]);
  }

  onDeleteProduct(id: number) {
    this.items.update(list => list.filter(i => i.id !== id));
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

  selectRequisition(req: RequisitionRecord) {
    const loadedItems: Item[] = req.items.map((item, idx) => ({
      id: idx + 1,
      code: item.code,
      name: item.name,
      unit: item.unit,
      qty: item.qty,
      rate: item.rate,
      tax: item.tax,
      total: item.total
    }));

    this.items.set(loadedItems);
    this.formData.update(prev => ({
      ...prev,
      ccCenter: req.branch,
      department: req.department
    }));
    
    // Collapse search section to show details
    this.sectionsExpanded.update(prev => ({ ...prev, requisitionSearch: false }));
    alert(`Loaded ${loadedItems.length} items from Requisition ${req.reqNo}`);
  }

  saveQuotation() {
    if (!this.formData().ccCenter || !this.formData().department) {
      alert('Please fill out all required fields marked with * (CC Center and Department).');
      return;
    }

    if (this.items().length === 0) {
      alert('Please add at least one item to quotation list.');
      return;
    }

    const nextId = this.addedQuotations().length + 1;
    const newQtn: QuotationRecord = {
      id: nextId,
      date: this.formData().date,
      qtnNo: `QTN/2026/00${nextId}`,
      company: this.formData().company,
      branch: this.formData().ccCenter,
      department: this.formData().department,
      amount: this.grandTotal(),
      status: 'PENDING'
    };

    this.addedQuotations.update(list => [newQtn, ...list]);
    alert('Quotation saved successfully!');
    this.handleReset();
  }

  deleteQuotation(id: number) {
    if (confirm('Are you sure you want to delete this Quotation?')) {
      this.addedQuotations.update(list => list.filter(q => q.id !== id));
    }
  }
}
