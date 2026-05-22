import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  LucideAngularModule, 
  ChevronDown, 
  ChevronUp, 
  Calendar,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ThumbsUp,
  ThumbsDown
} from 'lucide-angular';

export interface PendingSlip {
  id: string;
  refNo: string;
  date: string;
  branch: string;
  department: string;
  unit: string;
  entryBy: string;
}

export interface ResolvedSlip {
  id: string;
  refNo: string;
  date: string;
  branch: string;
  department: string;
  unit: string;
  entryBy: string;
  resolvedBy: string;
  resolvedDate: string;
  status: 'APPROVED' | 'REJECTED';
}

@Component({
  selector: 'app-demand-slip-approval',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './demand-slip-approval.component.html',
  styleUrl: './demand-slip-approval.component.css'
})
export class DemandSlipApprovalComponent {
  // Lucide Icons
  readonly ChevronDownIcon = ChevronDown;
  readonly ChevronUpIcon = ChevronUp;
  readonly CalendarIcon = Calendar;
  readonly SearchIcon = Search;
  readonly FilterIcon = Filter;
  readonly CheckIcon = CheckCircle;
  readonly CancelIcon = XCircle;
  readonly ChevronLeftIcon = ChevronLeft;
  readonly ChevronRightIcon = ChevronRight;
  readonly ChevronsLeftIcon = ChevronsLeft;
  readonly ChevronsRightIcon = ChevronsRight;
  readonly ThumbsUpIcon = ThumbsUp;
  readonly ThumbsDownIcon = ThumbsDown;

  // Accordion Expand/Collapse states
  showPendingPanel = signal<boolean>(true);
  showResolvedPanel = signal<boolean>(true);

  // Search Fields - Pending Slips
  pendingFromDate = signal<string>('2026-05-19');
  pendingToDate = signal<string>('2026-05-19');
  pendingBranch = signal<string>('Head Office');
  pendingDept = signal<string>('');
  pendingUnit = signal<string>('');
  pendingEmployee = signal<string>('');
  pendingRefNo = signal<string>('');

  // Search Fields - Resolved Slips
  resolvedFromDate = signal<string>('2026-05-19');
  resolvedToDate = signal<string>('2026-05-19');
  resolvedBranch = signal<string>('Head Office');
  resolvedDept = signal<string>('');
  resolvedUnit = signal<string>('');
  resolvedEmployee = signal<string>('');
  resolvedRefNo = signal<string>('');

  // Grid filter fields
  filterPendingRef = signal<string>('');
  filterPendingDept = signal<string>('');
  filterPendingUnit = signal<string>('');

  filterResolvedRef = signal<string>('');
  filterResolvedDept = signal<string>('');
  filterResolvedUnit = signal<string>('');

  // Table lists
  pendingSlips = signal<PendingSlip[]>([
    { id: '1', refNo: 'DS-2026-004', date: '19 May 2026', branch: 'Head Office', department: 'Civil Department', unit: 'Stone Crushing Unit A', entryBy: 'Amit Sharma' },
    { id: '2', refNo: 'DS-2026-005', date: '19 May 2026', branch: 'Head Office', department: 'Production Dept', unit: 'Slab Cutting Unit 2', entryBy: 'Rahul Varma' },
    { id: '3', refNo: 'DS-2026-006', date: '18 May 2026', branch: 'Mumbai Hub', department: 'Civil Department', unit: 'Tiling Section 1', entryBy: 'Vijay Patel' }
  ]);

  filteredPendingSlips = signal<PendingSlip[]>([
    { id: '1', refNo: 'DS-2026-004', date: '19 May 2026', branch: 'Head Office', department: 'Civil Department', unit: 'Stone Crushing Unit A', entryBy: 'Amit Sharma' },
    { id: '2', refNo: 'DS-2026-005', date: '19 May 2026', branch: 'Head Office', department: 'Production Dept', unit: 'Slab Cutting Unit 2', entryBy: 'Rahul Varma' },
    { id: '3', refNo: 'DS-2026-006', date: '18 May 2026', branch: 'Mumbai Hub', department: 'Civil Department', unit: 'Tiling Section 1', entryBy: 'Vijay Patel' }
  ]);

  resolvedSlips = signal<ResolvedSlip[]>([
    { id: '1', refNo: 'DS-2026-001', date: '12 May 2026', branch: 'Head Office', department: 'Civil Department', unit: 'Stone Crushing Unit A', entryBy: 'Amit Sharma', resolvedBy: 'Sanjay Dutt (Manager)', resolvedDate: '13 May 2026', status: 'APPROVED' },
    { id: '2', refNo: 'DS-2026-002', date: '08 May 2026', branch: 'Head Office', department: 'Production Dept', unit: 'Slab Cutting Unit 2', entryBy: 'Rahul Varma', resolvedBy: 'Sanjay Dutt (Manager)', resolvedDate: '09 May 2026', status: 'REJECTED' }
  ]);

  filteredResolvedSlips = signal<ResolvedSlip[]>([
    { id: '1', refNo: 'DS-2026-001', date: '12 May 2026', branch: 'Head Office', department: 'Civil Department', unit: 'Stone Crushing Unit A', entryBy: 'Amit Sharma', resolvedBy: 'Sanjay Dutt (Manager)', resolvedDate: '13 May 2026', status: 'APPROVED' },
    { id: '2', refNo: 'DS-2026-002', date: '08 May 2026', branch: 'Head Office', department: 'Production Dept', unit: 'Slab Cutting Unit 2', entryBy: 'Rahul Varma', resolvedBy: 'Sanjay Dutt (Manager)', resolvedDate: '09 May 2026', status: 'REJECTED' }
  ]);

  togglePendingPanel() { this.showPendingPanel.update(v => !v); }
  toggleResolvedPanel() { this.showResolvedPanel.update(v => !v); }

  searchPending() {
    alert('Searching pending slips matching criteria...');
  }

  searchResolved() {
    alert('Searching approved/rejected slips matching criteria...');
  }

  approveSlip(id: string) {
    const slip = this.pendingSlips().find(s => s.id === id);
    if (!slip) return;

    const approvedSlip: ResolvedSlip = {
      ...slip,
      resolvedBy: 'Sanjay Dutt (Manager)',
      resolvedDate: '19 May 2026',
      status: 'APPROVED'
    };

    // Remove from pending, add to resolved
    this.pendingSlips.update(slips => slips.filter(s => s.id !== id));
    this.resolvedSlips.update(slips => [approvedSlip, ...slips]);

    this.applyPendingFilters();
    this.applyResolvedFilters();

    alert(`Demand Slip ${slip.refNo} has been APPROVED successfully!`);
  }

  rejectSlip(id: string) {
    const slip = this.pendingSlips().find(s => s.id === id);
    if (!slip) return;

    const rejectedSlip: ResolvedSlip = {
      ...slip,
      resolvedBy: 'Sanjay Dutt (Manager)',
      resolvedDate: '19 May 2026',
      status: 'REJECTED'
    };

    // Remove from pending, add to resolved
    this.pendingSlips.update(slips => slips.filter(s => s.id !== id));
    this.resolvedSlips.update(slips => [rejectedSlip, ...slips]);

    this.applyPendingFilters();
    this.applyResolvedFilters();

    alert(`Demand Slip ${slip.refNo} has been REJECTED!`);
  }

  onPendingFilterChange() {
    this.applyPendingFilters();
  }

  onResolvedFilterChange() {
    this.applyResolvedFilters();
  }

  applyPendingFilters() {
    let result = this.pendingSlips();
    if (this.filterPendingRef()) {
      result = result.filter(s => s.refNo.toLowerCase().includes(this.filterPendingRef().toLowerCase()));
    }
    if (this.filterPendingDept()) {
      result = result.filter(s => s.department.toLowerCase().includes(this.filterPendingDept().toLowerCase()));
    }
    if (this.filterPendingUnit()) {
      result = result.filter(s => s.unit.toLowerCase().includes(this.filterPendingUnit().toLowerCase()));
    }
    this.filteredPendingSlips.set(result);
  }

  applyResolvedFilters() {
    let result = this.resolvedSlips();
    if (this.filterResolvedRef()) {
      result = result.filter(s => s.refNo.toLowerCase().includes(this.filterResolvedRef().toLowerCase()));
    }
    if (this.filterResolvedDept()) {
      result = result.filter(s => s.department.toLowerCase().includes(this.filterResolvedDept().toLowerCase()));
    }
    if (this.filterResolvedUnit()) {
      result = result.filter(s => s.unit.toLowerCase().includes(this.filterResolvedUnit().toLowerCase()));
    }
    this.filteredResolvedSlips.set(result);
  }
}
