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
  Edit2
} from 'lucide-angular';

export interface ReqItem {
  id: string;
  itemCode: string;
  itemName: string;
  unit: string;
  rate: number;
  requiredQty: number;
}

export interface RequisitionRecord {
  id: string;
  date: string;
  reqNo: string;
  branch: string;
  department: string;
  type: 'Direct' | 'Against Demand';
  amount: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

@Component({
  selector: 'app-requisition',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './requisition.component.html',
  styleUrl: './requisition.component.css'
})
export class RequisitionComponent {
  readonly ChevronDownIcon = ChevronDown;
  readonly ChevronUpIcon = ChevronUp;
  readonly CalendarIcon = Calendar;
  readonly SearchIcon = Search;
  readonly PlusIcon = Plus;
  readonly TrashIcon = Trash;
  readonly EditIcon = Edit2;

  // Signal state for accordion sections
  showEntryPanel = signal<boolean>(true);
  showSearchPanel = signal<boolean>(true);

  // Type Selector
  reqType = signal<'Direct' | 'Against Demand'>('Direct');

  // Entry Form Fields
  requisitionDate = signal<string>('2026-05-19');
  referenceNo = signal<string>('');
  selectedCompany = signal<string>('ILICO SERVICES LTD.(vERP)');
  selectedBranch = signal<string>('');
  selectedDepartment = signal<string>('');
  selectedProductionUnit = signal<string>('');
  projectName = signal<string>('');
  projectCode = signal<string>('');
  projectDescription = signal<string>('');
  remarks = signal<string>('');

  // Searching Criteria Fields
  searchCompany = signal<string>('ILICO SERVICES LTD.(vERP)');
  searchBranch = signal<string>('');
  searchDepartment = signal<string>('');
  searchProductionUnit = signal<string>('');
  searchAmountFrom = signal<string>('');
  searchAmountTo = signal<string>('');
  searchFromDate = signal<string>('2026-04-01');
  searchToDate = signal<string>('2026-08-31');
  searchRefNo = signal<string>('');

  // Requisition Items List Table
  reqItems = signal<ReqItem[]>([
    { id: '1', itemCode: 'ITM-MARBLE-01', itemName: 'White Carrara Marble Slab', unit: 'SqFt', rate: 250, requiredQty: 300 },
    { id: '2', itemCode: 'ITM-GRANITE-02', itemName: 'Black Galaxy Granite 18mm', unit: 'SqFt', rate: 180, requiredQty: 500 }
  ]);

  // Saved Requisition Database Table
  requisitions = signal<RequisitionRecord[]>([
    { id: '1', date: '19 May 2026', reqNo: 'REQ-2026-003', branch: 'Main Warehouse', department: 'Civil Department', type: 'Direct', amount: 165000, status: 'PENDING' },
    { id: '2', date: '15 May 2026', reqNo: 'REQ-2026-002', branch: 'Head Office', department: 'Production Dept', type: 'Against Demand', amount: 75000, status: 'APPROVED' },
    { id: '3', date: '10 May 2026', reqNo: 'REQ-2026-001', branch: 'Head Office', department: 'Civil Department', type: 'Direct', amount: 220000, status: 'APPROVED' }
  ]);

  filteredRequisitions = signal<RequisitionRecord[]>([
    { id: '1', date: '19 May 2026', reqNo: 'REQ-2026-003', branch: 'Main Warehouse', department: 'Civil Department', type: 'Direct', amount: 165000, status: 'PENDING' },
    { id: '2', date: '15 May 2026', reqNo: 'REQ-2026-002', branch: 'Head Office', department: 'Production Dept', type: 'Against Demand', amount: 75000, status: 'APPROVED' },
    { id: '3', date: '10 May 2026', reqNo: 'REQ-2026-001', branch: 'Head Office', department: 'Civil Department', type: 'Direct', amount: 220000, status: 'APPROVED' }
  ]);

  // Computed Total Amount
  totalRequisitionAmount = computed(() => {
    return this.reqItems().reduce((sum, item) => sum + (item.rate * item.requiredQty), 0);
  });

  toggleEntryPanel() { this.showEntryPanel.update(v => !v); }
  toggleSearchPanel() { this.showSearchPanel.update(v => !v); }

  resetEntryForm() {
    this.requisitionDate.set('2026-05-19');
    this.referenceNo.set('');
    this.selectedBranch.set('');
    this.selectedDepartment.set('');
    this.selectedProductionUnit.set('');
    this.projectName.set('');
    this.projectCode.set('');
    this.projectDescription.set('');
    this.remarks.set('');
  }

  saveRequisition() {
    if (!this.selectedBranch() || !this.selectedDepartment() || !this.selectedProductionUnit()) {
      alert('Please fill out all required fields marked with * (Branch, Department, and Production Unit).');
      return;
    }

    if (this.reqItems().length === 0) {
      alert('Please add at least one item to requisition details table.');
      return;
    }

    const nextId = (this.requisitions().length + 1).toString();
    const newReq: RequisitionRecord = {
      id: nextId,
      date: '19 May 2026',
      reqNo: `REQ-2026-00${nextId}`,
      branch: this.selectedBranch(),
      department: this.selectedDepartment(),
      type: this.reqType(),
      amount: this.totalRequisitionAmount(),
      status: 'PENDING'
    };

    this.requisitions.update(reqs => [newReq, ...reqs]);
    this.filteredRequisitions.set(this.requisitions());
    this.resetEntryForm();
    alert('Requisition generated successfully and queued for approval.');
  }

  deleteReqItem(id: string) {
    this.reqItems.update(items => items.filter(itm => itm.id !== id));
  }

  searchRequisitions() {
    let result = this.requisitions();

    if (this.searchBranch()) {
      result = result.filter(r => r.branch.toLowerCase().includes(this.searchBranch().toLowerCase()));
    }
    if (this.searchDepartment()) {
      result = result.filter(r => r.department.toLowerCase().includes(this.searchDepartment().toLowerCase()));
    }
    if (this.searchRefNo()) {
      result = result.filter(r => r.reqNo.toLowerCase().includes(this.searchRefNo().toLowerCase()));
    }

    this.filteredRequisitions.set(result);
  }
}
