import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  LucideAngularModule, 
  ChevronDown, 
  ChevronUp, 
  Calendar,
  Search,
  Plus,
  Trash,
  Edit2,
  XCircle,
  Calculator,
  Filter
} from 'lucide-angular';

export interface PendingIssueSlip {
  id: string;
  selected: boolean;
  refNo: string;
  slipNo: string;
  unit: string;
  department: string;
  date: string;
  remarks: string;
}

export interface ReturnItem {
  id: string;
  itemCode: string;
  itemName: string;
  unit: string;
  rate: number;
  issueQty: number;
  returnQty: number;
  remarks: string;
}

export interface ReturnSlipRecord {
  id: string;
  returnNo: string;
  branch: string;
  refNo: string;
  department: string;
  unit: string;
  date: string;
}

@Component({
  selector: 'app-issue-return',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './issue-return.component.html',
  styleUrl: './issue-return.component.css'
})
export class IssueReturnComponent {
  readonly ChevronDownIcon = ChevronDown;
  readonly ChevronUpIcon = ChevronUp;
  readonly CalendarIcon = Calendar;
  readonly SearchIcon = Search;
  readonly PlusIcon = Plus;
  readonly TrashIcon = Trash;
  readonly EditIcon = Edit2;
  readonly DeleteIcon = XCircle;
  readonly SheetIcon = Calculator;
  readonly FilterIcon = Filter;

  // Signal state for accordion sections
  showEntryPanel = signal<boolean>(true);
  showSearchPanel = signal<boolean>(true);

  // Entry Form Fields
  selectedCompany = signal<string>('ILICO SERVICES LTD.(vERP)');
  selectedBranch = signal<string>('Head Office');
  issueReturnDate = signal<string>('2026-05-19');
  referenceNo = signal<string>('ISL26-27/00001');
  selectedDepartment = signal<string>('');
  selectedProductionUnit = signal<string>('');
  projectName = signal<string>('');
  projectCode = signal<string>('');
  projectDescription = signal<string>('');
  selectedEmployee = signal<string>('');
  remarks = signal<string>('');
  fromIssueDate = signal<string>('2026-05-01');
  toIssueDate = signal<string>('2026-05-19');

  // Searching Criteria Fields
  searchCompany = signal<string>('ILICO SERVICES LTD.(vERP)');
  searchBranch = signal<string>('Head Office');
  searchDepartment = signal<string>('');
  searchProductionUnit = signal<string>('');
  searchProjectName = signal<string>('');
  searchFromDate = signal<string>('2026-05-01');
  searchToDate = signal<string>('2026-05-19');
  searchRefNo = signal<string>('');

  // Table grid filters
  filterIssueRef = signal<string>('');
  filterIssueNo = signal<string>('');
  filterIssueDept = signal<string>('');

  filterReturnNo = signal<string>('');
  filterReturnRef = signal<string>('');
  filterReturnDept = signal<string>('');

  // Pending Issue Slips list (to check and pull products)
  pendingSlips = signal<PendingIssueSlip[]>([
    { id: '1', selected: false, refNo: 'ISLIS26-27/00001', slipNo: 'ISL1461', unit: 'Unit A', department: 'CANTEEN', date: '05 May 2026', remarks: 'Standard Canteen issue' },
    { id: '2', selected: false, refNo: 'ISLIS26-27/00002', slipNo: 'ISL1462', unit: 'Unit B', department: 'HR / FINANCE', date: '08 May 2026', remarks: 'Office supplies' }
  ]);

  filteredPendingSlips = signal<PendingIssueSlip[]>([
    { id: '1', selected: false, refNo: 'ISLIS26-27/00001', slipNo: 'ISL1461', unit: 'Unit A', department: 'CANTEEN', date: '05 May 2026', remarks: 'Standard Canteen issue' },
    { id: '2', selected: false, refNo: 'ISLIS26-27/00002', slipNo: 'ISL1462', unit: 'Unit B', department: 'HR / FINANCE', date: '08 May 2026', remarks: 'Office supplies' }
  ]);

  // Selected Return Items Grid
  returnItems = signal<ReturnItem[]>([
    { id: '1', itemCode: 'ITM-MARBLE-01', itemName: 'White Carrara Marble Slab', unit: 'SqFt', rate: 250, issueQty: 200, returnQty: 20, remarks: 'Excess slabs returned in good condition' },
    { id: '2', itemCode: 'ITM-GRANITE-02', itemName: 'Black Galaxy Granite 18mm', unit: 'SqFt', rate: 180, issueQty: 150, returnQty: 15, remarks: 'Leftover from lobby counter work' }
  ]);

  // Saved Slips database
  slips = signal<ReturnSlipRecord[]>([
    { id: '1', returnNo: 'ISLR3', branch: 'Head Office', refNo: 'ISL25-26/00001', department: 'HR / FINANCE & ACCOUNTING', unit: 'Unit 10', date: '13 Oct 2025' },
    { id: '2', returnNo: 'ISLR4', branch: 'Head Office', refNo: 'ISL25-26/00002', department: 'HR / FINANCE & ACCOUNTING', unit: 'Unit 10', date: '13 Oct 2025' },
    { id: '3', returnNo: 'ISLR1', branch: 'Head Office', refNo: 'ISL/HO/2020-2021/0001', department: 'MANAGEMENT', unit: 'Unit 10', date: '05 Mar 2021' },
    { id: '4', returnNo: 'ISLR2', branch: 'Head Office', refNo: 'ISL/HO/2020-2021/0002', department: 'MANAGEMENT', unit: 'Unit 10', date: '05 Mar 2021' }
  ]);

  filteredSlips = signal<ReturnSlipRecord[]>([
    { id: '1', returnNo: 'ISLR3', branch: 'Head Office', refNo: 'ISL25-26/00001', department: 'HR / FINANCE & ACCOUNTING', unit: 'Unit 10', date: '13 Oct 2025' },
    { id: '2', returnNo: 'ISLR4', branch: 'Head Office', refNo: 'ISL25-26/00002', department: 'HR / FINANCE & ACCOUNTING', unit: 'Unit 10', date: '13 Oct 2025' },
    { id: '3', returnNo: 'ISLR1', branch: 'Head Office', refNo: 'ISL/HO/2020-2021/0001', department: 'MANAGEMENT', unit: 'Unit 10', date: '05 Mar 2021' },
    { id: '4', returnNo: 'ISLR2', branch: 'Head Office', refNo: 'ISL/HO/2020-2021/0002', department: 'MANAGEMENT', unit: 'Unit 10', date: '05 Mar 2021' }
  ]);

  // Computed Total Amount
  totalReturnAmount = computed(() => {
    return this.returnItems().reduce((sum, item) => sum + (item.rate * item.returnQty), 0);
  });

  toggleEntryPanel() { this.showEntryPanel.update(v => !v); }
  toggleSearchPanel() { this.showSearchPanel.update(v => !v); }

  resetEntryForm() {
    this.selectedDepartment.set('');
    this.selectedProductionUnit.set('');
    this.projectName.set('');
    this.projectCode.set('');
    this.projectDescription.set('');
    this.selectedEmployee.set('');
    this.remarks.set('');
  }

  saveReturnSlip() {
    if (!this.selectedBranch() || !this.selectedDepartment()) {
      alert('Please fill out all required fields marked with * (CC Center and Department).');
      return;
    }

    if (this.returnItems().length === 0) {
      alert('Please add at least one product in selected return list.');
      return;
    }

    const nextId = (this.slips().length + 1).toString();
    const newRecord: ReturnSlipRecord = {
      id: nextId,
      returnNo: `ISLR${nextId}`,
      branch: this.selectedBranch(),
      refNo: this.referenceNo(),
      department: this.selectedDepartment() || 'CANTEEN',
      unit: this.selectedProductionUnit() || 'Unit 10',
      date: '19 May 2026'
    };

    this.slips.update(records => [newRecord, ...records]);
    this.filteredSlips.set(this.slips());
    this.resetEntryForm();
    alert('Return Slip saved successfully!');
  }

  deleteReturnItem(id: string) {
    this.returnItems.update(items => items.filter(itm => itm.id !== id));
  }

  searchSlips() {
    alert('Searching pending slips matching criteria...');
  }

  searchReturnRecords() {
    let result = this.slips();

    if (this.searchBranch()) {
      result = result.filter(r => r.branch.toLowerCase().includes(this.searchBranch().toLowerCase()));
    }
    if (this.searchDepartment()) {
      result = result.filter(r => r.department.toLowerCase().includes(this.searchDepartment().toLowerCase()));
    }
    if (this.searchRefNo()) {
      result = result.filter(r => r.refNo.toLowerCase().includes(this.searchRefNo().toLowerCase()));
    }

    this.filteredSlips.set(result);
  }

  onPendingFilterChange() {
    let result = this.pendingSlips();
    if (this.filterIssueRef()) {
      result = result.filter(s => s.refNo.toLowerCase().includes(this.filterIssueRef().toLowerCase()));
    }
    if (this.filterIssueNo()) {
      result = result.filter(s => s.slipNo.toLowerCase().includes(this.filterIssueNo().toLowerCase()));
    }
    if (this.filterIssueDept()) {
      result = result.filter(s => s.department.toLowerCase().includes(this.filterIssueDept().toLowerCase()));
    }
    this.filteredPendingSlips.set(result);
  }

  onResolvedFilterChange() {
    let result = this.slips();
    if (this.filterReturnNo()) {
      result = result.filter(s => s.returnNo.toLowerCase().includes(this.filterReturnNo().toLowerCase()));
    }
    if (this.filterReturnRef()) {
      result = result.filter(s => s.refNo.toLowerCase().includes(this.filterReturnRef().toLowerCase()));
    }
    if (this.filterReturnDept()) {
      result = result.filter(s => s.department.toLowerCase().includes(this.filterReturnDept().toLowerCase()));
    }
    this.filteredSlips.set(result);
  }
}
