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

export interface IssuedItem {
  id: string;
  itemCode: string;
  itemName: string;
  unit: string;
  rate: number;
  availableStock: number;
  issueQty: number;
  remarks: string;
}

export interface IssueSlipRecord {
  id: string;
  date: string;
  issueNo: string;
  ccCenter: string;
  department: string;
  type: 'Direct' | 'Against Demand';
  amount: number;
}

@Component({
  selector: 'app-issue-slip',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './issue-slip.component.html',
  styleUrl: './issue-slip.component.css'
})
export class IssueSlipComponent {
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
  issueType = signal<'Direct' | 'Against Demand'>('Direct');

  // Entry Form Fields
  issueDate = signal<string>('2026-05-19');
  referenceNo = signal<string>('ISLIS26-27/00001');
  selectedCompany = signal<string>('ILICO SERVICES LTD.(vERP)');
  selectedBranch = signal<string>('');
  selectedDepartment = signal<string>('');
  selectedProductionUnit = signal<string>('');
  selectedEmployee = signal<string>('');
  projectName = signal<string>('');
  projectCode = signal<string>('');
  projectDescription = signal<string>('');
  remarks = signal<string>('');

  // Searching Criteria Fields
  searchCompany = signal<string>('ILICO SERVICES LTD.(vERP)');
  searchBranch = signal<string>('');
  searchDepartment = signal<string>('');
  searchProductionUnit = signal<string>('');
  searchProjectName = signal<string>('');
  searchFromDate = signal<string>('2026-05-01');
  searchToDate = signal<string>('2026-05-19');
  searchRefNo = signal<string>('');

  // Issued Items List Table
  issuedItems = signal<IssuedItem[]>([
    { id: '1', itemCode: 'ITM-MARBLE-01', itemName: 'White Carrara Marble Slab', unit: 'SqFt', rate: 250, availableStock: 1200, issueQty: 200, remarks: 'Issued for floor leveling' },
    { id: '2', itemCode: 'ITM-GRANITE-02', itemName: 'Black Galaxy Granite 18mm', unit: 'SqFt', rate: 180, availableStock: 850, issueQty: 150, remarks: 'For main lobby counter' }
  ]);

  // Saved Slips Table
  slips = signal<IssueSlipRecord[]>([
    { id: '1', date: '19 May 2026', issueNo: 'ISLIS26-27/00001', ccCenter: 'Main Warehouse', department: 'Civil Department', type: 'Direct', amount: 77000 },
    { id: '2', date: '12 May 2026', issueNo: 'ISLIS26-27/00002', ccCenter: 'Head Office', department: 'Production Dept', type: 'Against Demand', amount: 54000 }
  ]);

  filteredSlips = signal<IssueSlipRecord[]>([
    { id: '1', date: '19 May 2026', issueNo: 'ISLIS26-27/00001', ccCenter: 'Main Warehouse', department: 'Civil Department', type: 'Direct', amount: 77000 },
    { id: '2', date: '12 May 2026', issueNo: 'ISLIS26-27/00002', ccCenter: 'Head Office', department: 'Production Dept', type: 'Against Demand', amount: 54000 }
  ]);

  // Computed Total Amount
  totalIssueAmount = computed(() => {
    return this.issuedItems().reduce((sum, item) => sum + (item.rate * item.issueQty), 0);
  });

  toggleEntryPanel() { this.showEntryPanel.update(v => !v); }
  toggleSearchPanel() { this.showSearchPanel.update(v => !v); }

  resetEntryForm() {
    this.issueDate.set('2026-05-19');
    this.selectedBranch.set('');
    this.selectedDepartment.set('');
    this.selectedProductionUnit.set('');
    this.selectedEmployee.set('');
    this.projectName.set('');
    this.projectCode.set('');
    this.projectDescription.set('');
    this.remarks.set('');
  }

  saveIssueSlip() {
    if (!this.selectedBranch() || !this.selectedDepartment()) {
      alert('Please fill out all required fields marked with * (Branch and Department).');
      return;
    }

    if (this.issuedItems().length === 0) {
      alert('Please add at least one item to issue details table.');
      return;
    }

    const nextId = (this.slips().length + 1).toString();
    const newSlip: IssueSlipRecord = {
      id: nextId,
      date: '19 May 2026',
      issueNo: `ISLIS26-27/0000${nextId}`,
      ccCenter: this.selectedBranch(),
      department: this.selectedDepartment(),
      type: this.issueType(),
      amount: this.totalIssueAmount()
    };

    this.slips.update(slipsList => [newSlip, ...slipsList]);
    this.filteredSlips.set(this.slips());
    this.resetEntryForm();
    alert('Issue Slip saved successfully!');
  }

  deleteIssueItem(id: string) {
    this.issuedItems.update(items => items.filter(itm => itm.id !== id));
  }

  searchSlips() {
    let result = this.slips();

    if (this.searchBranch()) {
      result = result.filter(r => r.ccCenter.toLowerCase().includes(this.searchBranch().toLowerCase()));
    }
    if (this.searchDepartment()) {
      result = result.filter(r => r.department.toLowerCase().includes(this.searchDepartment().toLowerCase()));
    }
    if (this.searchRefNo()) {
      result = result.filter(r => r.issueNo.toLowerCase().includes(this.searchRefNo().toLowerCase()));
    }

    this.filteredSlips.set(result);
  }
}
