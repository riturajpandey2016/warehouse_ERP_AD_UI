import { Component, signal, WritableSignal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  LucideAngularModule, 
  LayoutGrid, ShoppingCart, ChevronRight, AlertCircle, Search, Calendar, Building2, 
  ChevronDown, ChevronUp, Check, X, Eye, Filter, ChevronsLeft, ChevronLeft, ChevronsRight, RotateCcw, ClipboardList
} from 'lucide-angular';

import { FloatingInputComponent } from '../shared/floating-input/floating-input.component';
import { FloatingSelectComponent } from '../shared/floating-select/floating-select.component';

interface PendingMRN {
  id: number;
  refNo: string;
  date: string;
  branch: string;
  entryBy: string;
}

interface HistoryMRN {
  id: number;
  refNo: string;
  date: string;
  branch: string;
  entryBy: string;
  actionBy: string;
  actionDate: string;
  status: 'APPROVED' | 'REJECTED';
}

@Component({
  selector: 'app-purchase-order-receive-mrn-approval',
  standalone: true,
  imports: [
    CommonModule, 
    LucideAngularModule, 
    FloatingInputComponent, 
    FloatingSelectComponent
  ],
  templateUrl: './purchase-order-receive-mrn-approval.component.html',
  styleUrl: './purchase-order-receive-mrn-approval.component.css'
})
export class PurchaseOrderReceiveMrnApprovalComponent {
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

  branchOptions = [
    { label: 'Select Branch', value: '' },
    { label: 'Head Office', value: 'Head Office' },
    { label: 'Main Warehouse', value: 'Main Warehouse' },
    { label: 'Branch Office', value: 'Branch Office' }
  ];

  employeeOptions = [
    { label: 'Select Employee', value: '' },
    { label: 'John Doe', value: 'John Doe' },
    { label: 'Jane Smith', value: 'Jane Smith' },
    { label: 'Robert Johnson', value: 'Robert Johnson' },
    { label: 'Alice Brown', value: 'Alice Brown' }
  ];

  projectNameOptions = [
    { label: 'Select Project Name', value: '' },
    { label: 'Warehouse Expansion 2026', value: 'Warehouse Expansion 2026' },
    { label: 'Office Refurbishment', value: 'Office Refurbishment' },
    { label: 'Building Block A', value: 'Building Block A' }
  ];

  // SECTION 1: Pending MRN Filters
  pendingFromDate = signal<string>('2026-05-25');
  pendingToDate = signal<string>('2026-05-25');
  pendingBranch = signal<string>('');
  pendingEntryBy = signal<string>('');
  pendingProjectName = signal<string>('');
  pendingRefNo = signal<string>('');

  // SECTION 3: History MRN Filters
  historyFromDate = signal<string>('2026-05-25');
  historyToDate = signal<string>('2026-05-25');
  historyBranch = signal<string>('');
  historyEntryBy = signal<string>('');
  historyProjectName = signal<string>('');
  historyRefNo = signal<string>('');

  // Inline filter column models for Pending Grid (Section 2)
  colPendingRefNo = signal<string>('');
  colPendingDate = signal<string>('');
  colPendingBranch = signal<string>('');
  colPendingEntry = signal<string>('');

  // Inline filter column models for History Grid (Section 4)
  colHistoryRefNo = signal<string>('');
  colHistoryDate = signal<string>('');
  colHistoryBranch = signal<string>('');
  colHistoryEntry = signal<string>('');
  colHistoryActBy = signal<string>('');
  colHistoryActDate = signal<string>('');

  // Mock Databases
  pendingList = signal<PendingMRN[]>([
    { id: 1, refNo: 'MRN/2026/001', date: '2026-05-24', branch: 'Main Warehouse', entryBy: 'John Doe' },
    { id: 2, refNo: 'MRN/2026/003', date: '2026-05-23', branch: 'Head Office', entryBy: 'Jane Smith' }
  ]);

  historyList = signal<HistoryMRN[]>([
    { id: 1, refNo: 'MRN/2026/002', date: '2026-05-20', branch: 'Branch Office', entryBy: 'Robert Johnson', actionBy: 'System Admin', actionDate: '2026-05-21', status: 'APPROVED' },
    { id: 2, refNo: 'MRN/2026/004', date: '2026-05-18', branch: 'Main Warehouse', entryBy: 'Alice Brown', actionBy: 'Manager Quality', actionDate: '2026-05-19', status: 'REJECTED' }
  ]);

  // Computed Lists
  filteredPendingList = computed(() => {
    return this.pendingList().filter(item => {
      // Top Search Filters
      const branchMatch = !this.pendingBranch() || item.branch === this.pendingBranch();
      const entryMatch = !this.pendingEntryBy() || item.entryBy === this.pendingEntryBy();
      const refMatch = !this.pendingRefNo() || item.refNo.toLowerCase().includes(this.pendingRefNo().toLowerCase());

      // Inline Grid Filters
      const colRef = !this.colPendingRefNo() || item.refNo.toLowerCase().includes(this.colPendingRefNo().toLowerCase());
      const colDate = !this.colPendingDate() || item.date.includes(this.colPendingDate());
      const colBranch = !this.colPendingBranch() || item.branch.toLowerCase().includes(this.colPendingBranch().toLowerCase());
      const colEntry = !this.colPendingEntry() || item.entryBy.toLowerCase().includes(this.colPendingEntry().toLowerCase());

      return branchMatch && entryMatch && refMatch && colRef && colDate && colBranch && colEntry;
    });
  });

  filteredHistoryList = computed(() => {
    return this.historyList().filter(item => {
      // Top Search Filters
      const branchMatch = !this.historyBranch() || item.branch === this.historyBranch();
      const entryMatch = !this.historyEntryBy() || item.entryBy === this.historyEntryBy();
      const refMatch = !this.historyRefNo() || item.refNo.toLowerCase().includes(this.historyRefNo().toLowerCase());

      // Inline Grid Filters
      const colRef = !this.colHistoryRefNo() || item.refNo.toLowerCase().includes(this.colHistoryRefNo().toLowerCase());
      const colDate = !this.colHistoryDate() || item.date.includes(this.colHistoryDate());
      const colBranch = !this.colHistoryBranch() || item.branch.toLowerCase().includes(this.colHistoryBranch().toLowerCase());
      const colEntry = !this.colHistoryEntry() || item.entryBy.toLowerCase().includes(this.colHistoryEntry().toLowerCase());
      const colActBy = !this.colHistoryActBy() || item.actionBy.toLowerCase().includes(this.colHistoryActBy().toLowerCase());
      const colActDt = !this.colHistoryActDate() || item.actionDate.includes(this.colHistoryActDate());

      return branchMatch && entryMatch && refMatch && colRef && colDate && colBranch && colEntry && colActBy && colActDt;
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
  onApprove(mrn: PendingMRN) {
    const confirmApprove = confirm(`Are you sure you want to APPROVE Material Receipt Note ${mrn.refNo}?`);
    if (confirmApprove) {
      // Remove from pending
      this.pendingList.update(list => list.filter(p => p.id !== mrn.id));
      // Add to history
      const newHistory: HistoryMRN = {
        id: mrn.id,
        refNo: mrn.refNo,
        date: mrn.date,
        branch: mrn.branch,
        entryBy: mrn.entryBy,
        actionBy: 'Current User',
        actionDate: new Date().toISOString().split('T')[0],
        status: 'APPROVED'
      };
      this.historyList.update(list => [newHistory, ...list]);
      alert(`MRN ${mrn.refNo} approved successfully!`);
    }
  }

  onReject(mrn: PendingMRN) {
    const confirmReject = confirm(`Are you sure you want to REJECT Material Receipt Note ${mrn.refNo}?`);
    if (confirmReject) {
      // Remove from pending
      this.pendingList.update(list => list.filter(p => p.id !== mrn.id));
      // Add to history
      const newHistory: HistoryMRN = {
        id: mrn.id,
        refNo: mrn.refNo,
        date: mrn.date,
        branch: mrn.branch,
        entryBy: mrn.entryBy,
        actionBy: 'Current User',
        actionDate: new Date().toISOString().split('T')[0],
        status: 'REJECTED'
      };
      this.historyList.update(list => [newHistory, ...list]);
      alert(`MRN ${mrn.refNo} rejected successfully!`);
    }
  }

  onView(orderRef: string) {
    alert(`Viewing Details for Material Receipt Note: ${orderRef}`);
  }

  // Reset filters
  resetPendingFilters() {
    this.pendingBranch.set('');
    this.pendingEntryBy.set('');
    this.pendingProjectName.set('');
    this.pendingRefNo.set('');
    this.pendingFromDate.set('2026-05-25');
    this.pendingToDate.set('2026-05-25');
  }

  resetHistoryFilters() {
    this.historyBranch.set('');
    this.historyEntryBy.set('');
    this.historyProjectName.set('');
    this.historyRefNo.set('');
    this.historyFromDate.set('2026-05-25');
    this.historyToDate.set('2026-05-25');
  }
}
