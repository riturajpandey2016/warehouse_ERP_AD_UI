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

export interface PendingRequisition {
  id: string;
  refNo: string;
  date: string;
  branch: string;
  entryBy: string;
}

export interface ResolvedRequisition {
  id: string;
  refNo: string;
  date: string;
  branch: string;
  entryBy: string;
  resolvedBy: string;
  resolvedDate: string;
  status: 'APPROVED' | 'REJECTED';
}

@Component({
  selector: 'app-requisition-approval',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './requisition-approval.component.html',
  styleUrl: './requisition-approval.component.css'
})
export class RequisitionApprovalComponent {
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

  // Search Fields - Pending
  pendingDateFrom = signal<string>('2026-05-19');
  pendingDateTo = signal<string>('2026-05-19');
  pendingBranch = signal<string>('Head Office');
  pendingProjectName = signal<string>('');
  pendingEmployee = signal<string>('');
  pendingRefNo = signal<string>('');

  // Search Fields - Resolved
  resolvedDateFrom = signal<string>('2026-05-19');
  resolvedDateTo = signal<string>('2026-05-19');
  resolvedBranch = signal<string>('Head Office');
  resolvedProjectName = signal<string>('');
  resolvedEmployee = signal<string>('');
  resolvedRefNo = signal<string>('');

  // Grid filter fields
  filterPendingRef = signal<string>('');
  filterPendingBranch = signal<string>('');
  filterPendingEmployee = signal<string>('');

  filterResolvedRef = signal<string>('');
  filterResolvedBranch = signal<string>('');
  filterResolvedEmployee = signal<string>('');

  // Table lists
  pendingReqs = signal<PendingRequisition[]>([
    { id: '1', refNo: 'REQ-2026-004', date: '19 May 2026', branch: 'Head Office', entryBy: 'Amit Sharma' },
    { id: '2', refNo: 'REQ-2026-005', date: '19 May 2026', branch: 'Head Office', entryBy: 'Rahul Varma' },
    { id: '3', refNo: 'REQ-2026-006', date: '18 May 2026', branch: 'Mumbai Hub', entryBy: 'Vijay Patel' }
  ]);

  filteredPendingReqs = signal<PendingRequisition[]>([
    { id: '1', refNo: 'REQ-2026-004', date: '19 May 2026', branch: 'Head Office', entryBy: 'Amit Sharma' },
    { id: '2', refNo: 'REQ-2026-005', date: '19 May 2026', branch: 'Head Office', entryBy: 'Rahul Varma' },
    { id: '3', refNo: 'REQ-2026-006', date: '18 May 2026', branch: 'Mumbai Hub', entryBy: 'Vijay Patel' }
  ]);

  resolvedReqs = signal<ResolvedRequisition[]>([
    { id: '1', refNo: 'REQ-2026-001', date: '12 May 2026', branch: 'Head Office', entryBy: 'Amit Sharma', resolvedBy: 'Sanjay Dutt (Manager)', resolvedDate: '13 May 2026', status: 'APPROVED' },
    { id: '2', refNo: 'REQ-2026-002', date: '08 May 2026', branch: 'Head Office', entryBy: 'Rahul Varma', resolvedBy: 'Sanjay Dutt (Manager)', resolvedDate: '09 May 2026', status: 'REJECTED' }
  ]);

  filteredResolvedReqs = signal<ResolvedRequisition[]>([
    { id: '1', refNo: 'REQ-2026-001', date: '12 May 2026', branch: 'Head Office', entryBy: 'Amit Sharma', resolvedBy: 'Sanjay Dutt (Manager)', resolvedDate: '13 May 2026', status: 'APPROVED' },
    { id: '2', refNo: 'REQ-2026-002', date: '08 May 2026', branch: 'Head Office', entryBy: 'Rahul Varma', resolvedBy: 'Sanjay Dutt (Manager)', resolvedDate: '09 May 2026', status: 'REJECTED' }
  ]);

  togglePendingPanel() { this.showPendingPanel.update(v => !v); }
  toggleResolvedPanel() { this.showResolvedPanel.update(v => !v); }

  searchPending() {
    alert('Searching pending requisitions matching criteria...');
  }

  searchResolved() {
    alert('Searching approved/rejected requisitions matching criteria...');
  }

  approveReq(id: string) {
    const req = this.pendingReqs().find(r => r.id === id);
    if (!req) return;

    const approvedReq: ResolvedRequisition = {
      ...req,
      resolvedBy: 'Sanjay Dutt (Manager)',
      resolvedDate: '19 May 2026',
      status: 'APPROVED'
    };

    // Remove from pending, add to resolved
    this.pendingReqs.update(reqs => reqs.filter(r => r.id !== id));
    this.resolvedReqs.update(reqs => [approvedReq, ...reqs]);

    this.applyPendingFilters();
    this.applyResolvedFilters();

    alert(`Requisition ${req.refNo} has been APPROVED successfully!`);
  }

  rejectReq(id: string) {
    const req = this.pendingReqs().find(r => r.id === id);
    if (!req) return;

    const rejectedReq: ResolvedRequisition = {
      ...req,
      resolvedBy: 'Sanjay Dutt (Manager)',
      resolvedDate: '19 May 2026',
      status: 'REJECTED'
    };

    // Remove from pending, add to resolved
    this.pendingReqs.update(reqs => reqs.filter(r => r.id !== id));
    this.resolvedReqs.update(reqs => [rejectedReq, ...reqs]);

    this.applyPendingFilters();
    this.applyResolvedFilters();

    alert(`Requisition ${req.refNo} has been REJECTED!`);
  }

  onPendingFilterChange() {
    this.applyPendingFilters();
  }

  onResolvedFilterChange() {
    this.applyResolvedFilters();
  }

  applyPendingFilters() {
    let result = this.pendingReqs();
    if (this.filterPendingRef()) {
      result = result.filter(r => r.refNo.toLowerCase().includes(this.filterPendingRef().toLowerCase()));
    }
    if (this.filterPendingBranch()) {
      result = result.filter(r => r.branch.toLowerCase().includes(this.filterPendingBranch().toLowerCase()));
    }
    if (this.filterPendingEmployee()) {
      result = result.filter(r => r.entryBy.toLowerCase().includes(this.filterPendingEmployee().toLowerCase()));
    }
    this.filteredPendingReqs.set(result);
  }

  applyResolvedFilters() {
    let result = this.resolvedReqs();
    if (this.filterResolvedRef()) {
      result = result.filter(r => r.refNo.toLowerCase().includes(this.filterResolvedRef().toLowerCase()));
    }
    if (this.filterResolvedBranch()) {
      result = result.filter(r => r.branch.toLowerCase().includes(this.filterResolvedBranch().toLowerCase()));
    }
    if (this.filterResolvedEmployee()) {
      result = result.filter(r => r.entryBy.toLowerCase().includes(this.filterResolvedEmployee().toLowerCase()));
    }
    this.filteredResolvedReqs.set(result);
  }
}
