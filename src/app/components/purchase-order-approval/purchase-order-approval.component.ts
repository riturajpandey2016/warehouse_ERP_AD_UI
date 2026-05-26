import { Component, signal, WritableSignal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  LucideAngularModule, 
  LayoutGrid, ShoppingCart, ChevronRight, AlertCircle, Search, Calendar, Building2, 
  ChevronDown, ChevronUp, Check, X, Eye, Filter, ChevronsLeft, ChevronLeft, ChevronsRight, RotateCcw, ClipboardList
} from 'lucide-angular';

import { FloatingInputComponent } from '../shared/floating-input/floating-input.component';
import { FloatingSelectComponent } from '../shared/floating-select/floating-select.component';

interface PendingPO {
  id: number;
  refNo: string;
  date: string;
  ccCenter: string;
  department: string;
  productionUnit: string;
  entryBy: string;
}

interface HistoryPO {
  id: number;
  refNo: string;
  date: string;
  ccCenter: string;
  department: string;
  productionUnit: string;
  actionBy: string;
  actionDate: string;
  status: 'APPROVED' | 'REJECTED';
}

@Component({
  selector: 'app-purchase-order-approval',
  standalone: true,
  imports: [
    CommonModule, 
    LucideAngularModule, 
    FloatingInputComponent, 
    FloatingSelectComponent
  ],
  templateUrl: './purchase-order-approval.component.html',
  styleUrl: './purchase-order-approval.component.css'
})
export class PurchaseOrderApprovalComponent {
  // Collapsible section toggles
  sectionsExpanded = signal({
    pendingFilter: true,
    pendingGrid: true,
    historyFilter: true,
    historyGrid: true
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

  employeeOptions = [
    { label: 'Select Employee', value: '' },
    { label: 'John Doe', value: 'John Doe' },
    { label: 'Jane Smith', value: 'Jane Smith' },
    { label: 'Robert Johnson', value: 'Robert Johnson' },
    { label: 'Alice Brown', value: 'Alice Brown' }
  ];

  // SECTION 1: Pending PO Filters
  pendingCompany = signal<string>('ILICO SERVICES LTD.(vERP)');
  pendingCcCenter = signal<string>('');
  pendingDept = signal<string>('');
  pendingEntryBy = signal<string>('');
  pendingProjectName = signal<string>('');
  pendingProductionUnit = signal<string>('');
  pendingRefNo = signal<string>('');
  pendingFromDate = signal<string>('2026-05-25');
  pendingToDate = signal<string>('2026-05-25');

  // SECTION 3: History PO Filters
  historyCompany = signal<string>('ILICO SERVICES LTD.(vERP)');
  historyCcCenter = signal<string>('');
  historyDept = signal<string>('');
  historyEntryBy = signal<string>('');
  historyProjectName = signal<string>('');
  historyProductionUnit = signal<string>('');
  historyRefNo = signal<string>('');
  historyFromDate = signal<string>('2026-05-25');
  historyToDate = signal<string>('2026-05-25');

  // Inline filter column models for Pending Grid (Section 2)
  colPendingRefNo = signal<string>('');
  colPendingDate = signal<string>('');
  colPendingCcCenter = signal<string>('');
  colPendingDept = signal<string>('');
  colPendingProdUnit = signal<string>('');
  colPendingEntryBy = signal<string>('');

  // Inline filter column models for History Grid (Section 4)
  colHistoryRefNo = signal<string>('');
  colHistoryDate = signal<string>('');
  colHistoryCc = signal<string>('');
  colHistoryDept = signal<string>('');
  colHistoryProdUnit = signal<string>('');
  colHistoryActBy = signal<string>('');
  colHistoryActDate = signal<string>('');

  // Mock Databases
  pendingList = signal<PendingPO[]>([
    { id: 1, refNo: 'PO/2026/001', date: '2026-05-24', ccCenter: 'Main Warehouse', department: 'Civil Department', productionUnit: 'Main Facility', entryBy: 'John Doe' },
    { id: 2, refNo: 'PO/2026/003', date: '2026-05-23', ccCenter: 'Head Office', department: 'Procurement Dept', productionUnit: 'Main Facility', entryBy: 'Jane Smith' },
    { id: 3, refNo: 'PO/2026/004', date: '2026-05-22', ccCenter: 'Branch Office', department: 'IT Department', productionUnit: 'Main Facility', entryBy: 'Robert Johnson' }
  ]);

  historyList = signal<HistoryPO[]>([
    { id: 1, refNo: 'PO/2026/002', date: '2026-05-20', ccCenter: 'Head Office', department: 'Production Dept', productionUnit: 'Stone Crushing Unit A', actionBy: 'System Admin', actionDate: '2026-05-21', status: 'APPROVED' },
    { id: 2, refNo: 'PO/2026/005', date: '2026-05-18', ccCenter: 'Main Warehouse', department: 'Civil Department', productionUnit: 'Main Facility', actionBy: 'Manager Quality', actionDate: '2026-05-19', status: 'REJECTED' }
  ]);

  // Computed Lists
  filteredPendingList = computed(() => {
    return this.pendingList().filter(item => {
      // Top Search Filters
      const ccMatch = !this.pendingCcCenter() || item.ccCenter === this.pendingCcCenter();
      const deptMatch = !this.pendingDept() || item.department === this.pendingDept();
      const entryMatch = !this.pendingEntryBy() || item.entryBy === this.pendingEntryBy();
      const unitMatch = !this.pendingProductionUnit() || item.productionUnit === this.pendingProductionUnit();
      const refMatch = !this.pendingRefNo() || item.refNo.toLowerCase().includes(this.pendingRefNo().toLowerCase());

      // Inline Grid Filters
      const colRef = !this.colPendingRefNo() || item.refNo.toLowerCase().includes(this.colPendingRefNo().toLowerCase());
      const colDate = !this.colPendingDate() || item.date.includes(this.colPendingDate());
      const colCc = !this.colPendingCcCenter() || item.ccCenter.toLowerCase().includes(this.colPendingCcCenter().toLowerCase());
      const colDept = !this.colPendingDept() || item.department.toLowerCase().includes(this.colPendingDept().toLowerCase());
      const colUnit = !this.colPendingProdUnit() || item.productionUnit.toLowerCase().includes(this.colPendingProdUnit().toLowerCase());
      const colEntry = !this.colPendingEntryBy() || item.entryBy.toLowerCase().includes(this.colPendingEntryBy().toLowerCase());

      return ccMatch && deptMatch && entryMatch && unitMatch && refMatch && colRef && colDate && colCc && colDept && colUnit && colEntry;
    });
  });

  filteredHistoryList = computed(() => {
    return this.historyList().filter(item => {
      // Top Search Filters
      const ccMatch = !this.historyCcCenter() || item.ccCenter === this.historyCcCenter();
      const deptMatch = !this.historyDept() || item.department === this.historyDept();
      const entryMatch = !this.historyEntryBy() || item.actionBy === this.historyEntryBy(); // Mock
      const unitMatch = !this.historyProductionUnit() || item.productionUnit === this.historyProductionUnit();
      const refMatch = !this.historyRefNo() || item.refNo.toLowerCase().includes(this.historyRefNo().toLowerCase());

      // Inline Grid Filters
      const colRef = !this.colHistoryRefNo() || item.refNo.toLowerCase().includes(this.colHistoryRefNo().toLowerCase());
      const colDate = !this.colHistoryDate() || item.date.includes(this.colHistoryDate());
      const colCc = !this.colHistoryCc() || item.ccCenter.toLowerCase().includes(this.colHistoryCc().toLowerCase());
      const colDept = !this.colHistoryDept() || item.department.toLowerCase().includes(this.colHistoryDept().toLowerCase());
      const colUnit = !this.colHistoryProdUnit() || item.productionUnit.toLowerCase().includes(this.colHistoryProdUnit().toLowerCase());
      const colActBy = !this.colHistoryActBy() || item.actionBy.toLowerCase().includes(this.colHistoryActBy().toLowerCase());
      const colActDt = !this.colHistoryActDate() || item.actionDate.includes(this.colHistoryActDate());

      return ccMatch && deptMatch && entryMatch && unitMatch && refMatch && colRef && colDate && colCc && colDept && colUnit && colActBy && colActDt;
    });
  });

  // Icons
  readonly LayoutGridIcon = LayoutGrid;
  readonly ShoppingCartIcon = ShoppingCart;
  readonly ChevronRightIcon = ChevronRight;
  readonly AlertCircleIcon = AlertCircle;
  readonly SearchIcon = Search;
  readonly CalendarIcon = Calendar;
  readonly Building2Icon = Building2;
  readonly ChevronDownIcon = ChevronDown;
  readonly ChevronUpIcon = ChevronUp;
  readonly CheckIcon = Check;
  readonly XIcon = X;
  readonly EyeIcon = Eye;
  readonly FilterIcon = Filter;
  readonly ChevronsLeftIcon = ChevronsLeft;
  readonly ChevronLeftIcon = ChevronLeft;
  readonly ChevronsRightIcon = ChevronsRight;
  readonly RotateCcwIcon = RotateCcw;
  readonly ClipboardListIcon = ClipboardList;

  toggleSection(section: 'pendingFilter' | 'pendingGrid' | 'historyFilter' | 'historyGrid') {
    this.sectionsExpanded.update(prev => ({ ...prev, [section]: !prev[section] }));
  }

  // Workflows
  onApprove(po: PendingPO) {
    const confirmApprove = confirm(`Are you sure you want to APPROVE Purchase Order ${po.refNo}?`);
    if (confirmApprove) {
      // Remove from pending
      this.pendingList.update(list => list.filter(p => p.id !== po.id));
      // Add to history
      const newHistory: HistoryPO = {
        id: po.id,
        refNo: po.refNo,
        date: po.date,
        ccCenter: po.ccCenter,
        department: po.department,
        productionUnit: po.productionUnit,
        actionBy: 'Current User',
        actionDate: new Date().toISOString().split('T')[0],
        status: 'APPROVED'
      };
      this.historyList.update(list => [newHistory, ...list]);
      alert(`Purchase Order ${po.refNo} approved successfully!`);
    }
  }

  onReject(po: PendingPO) {
    const confirmReject = confirm(`Are you sure you want to REJECT Purchase Order ${po.refNo}?`);
    if (confirmReject) {
      // Remove from pending
      this.pendingList.update(list => list.filter(p => p.id !== po.id));
      // Add to history
      const newHistory: HistoryPO = {
        id: po.id,
        refNo: po.refNo,
        date: po.date,
        ccCenter: po.ccCenter,
        department: po.department,
        productionUnit: po.productionUnit,
        actionBy: 'Current User',
        actionDate: new Date().toISOString().split('T')[0],
        status: 'REJECTED'
      };
      this.historyList.update(list => [newHistory, ...list]);
      alert(`Purchase Order ${po.refNo} rejected successfully!`);
    }
  }

  onView(orderRef: string) {
    alert(`Viewing Details for Purchase Order: ${orderRef}`);
  }

  // Reset filters
  resetPendingFilters() {
    this.pendingCcCenter.set('');
    this.pendingDept.set('');
    this.pendingEntryBy.set('');
    this.pendingProjectName.set('');
    this.pendingProductionUnit.set('');
    this.pendingRefNo.set('');
    this.pendingFromDate.set('2026-05-25');
    this.pendingToDate.set('2026-05-25');
  }

  resetHistoryFilters() {
    this.historyCcCenter.set('');
    this.historyDept.set('');
    this.historyEntryBy.set('');
    this.historyProjectName.set('');
    this.historyProductionUnit.set('');
    this.historyRefNo.set('');
    this.historyFromDate.set('2026-05-25');
    this.historyToDate.set('2026-05-25');
  }
}
