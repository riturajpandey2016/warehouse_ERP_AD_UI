import { Component, signal } from '@angular/core';
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

export interface DemandItem {
  id: string;
  itemCode: string;
  itemName: string;
  unit: string;
  availableStock: number;
  demandQty: number;
  remarks: string;
}

export interface DemandSlipRecord {
  id: string;
  demandDate: string;
  demandNo: string;
  ccCenter: string;
  department: string;
  projectName: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

@Component({
  selector: 'app-demand-slip',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './demand-slip.component.html',
  styleUrl: './demand-slip.component.css'
})
export class DemandSlipComponent {
  readonly ChevronDownIcon = ChevronDown;
  readonly ChevronUpIcon = ChevronUp;
  readonly CalendarIcon = Calendar;
  readonly SearchIcon = Search;
  readonly PlusIcon = Plus;
  readonly TrashIcon = Trash;
  readonly EditIcon = Edit2;

  // Signal state for accordions
  showSlip = signal<boolean>(true);
  showItems = signal<boolean>(true);
  showSearch = signal<boolean>(true);
  showDetails = signal<boolean>(true);

  // Demand Slip Fields
  demandDate = signal<string>('2026-05-19');
  selectedCcCenter = signal<string>('');
  projectName = signal<string>('');
  remarks = signal<string>('');
  referenceNo = signal<string>('');
  selectedDepartment = signal<string>('');
  projectCode = signal<string>('');
  selectedCompany = signal<string>('ILICO SERVICES LTD.(vERP)');
  selectedProductionUnit = signal<string>('');
  projectDescription = signal<string>('');

  // Item Searching Criteria
  selectedGroup = signal<string>('RAW MATERIALS');
  selectedItemType = signal<string>('Stone');

  // Demand Searching Criteria
  searchFromDate = signal<string>('2026-04-01');
  searchToDate = signal<string>('2026-08-31');
  searchCompany = signal<string>('ILICO SERVICES LTD.(vERP)');
  searchCcCenter = signal<string>('');
  searchDepartment = signal<string>('');
  searchProductionUnit = signal<string>('');
  searchReferenceNo = signal<string>('');

  // Tables Signal States
  demandItems = signal<DemandItem[]>([
    { id: '1', itemCode: 'ITM001', itemName: 'Red Granite Stone 20mm', unit: 'SqFt', availableStock: 2500, demandQty: 500, remarks: 'Immediate production requirement' },
    { id: '2', itemCode: 'ITM002', itemName: 'White Marble Slab', unit: 'SqFt', availableStock: 1200, demandQty: 200, remarks: 'Lobby flooring' }
  ]);

  demandSlips = signal<DemandSlipRecord[]>([
    { id: '1', demandDate: '12 May 2026', demandNo: 'DS-2026-001', ccCenter: 'Mumbai Central', department: 'Civil Department', projectName: 'Building Block A', status: 'PENDING' },
    { id: '2', demandDate: '08 May 2026', demandNo: 'DS-2026-002', ccCenter: 'New Delhi Hub', department: 'Production Dept', projectName: 'Slab Polishing Line', status: 'APPROVED' }
  ]);

  filteredDemandSlips = signal<DemandSlipRecord[]>([
    { id: '1', demandDate: '12 May 2026', demandNo: 'DS-2026-001', ccCenter: 'Mumbai Central', department: 'Civil Department', projectName: 'Building Block A', status: 'PENDING' },
    { id: '2', demandDate: '08 May 2026', demandNo: 'DS-2026-002', ccCenter: 'New Delhi Hub', department: 'Production Dept', projectName: 'Slab Polishing Line', status: 'APPROVED' }
  ]);

  toggleSlip() { this.showSlip.update(v => !v); }
  toggleItems() { this.showItems.update(v => !v); }
  toggleSearch() { this.showSearch.update(v => !v); }
  toggleDetails() { this.showDetails.update(v => !v); }

  resetSlipForm() {
    this.demandDate.set('2026-05-19');
    this.selectedCcCenter.set('');
    this.projectName.set('');
    this.remarks.set('');
    this.referenceNo.set('');
    this.selectedDepartment.set('');
    this.projectCode.set('');
    this.selectedProductionUnit.set('');
    this.projectDescription.set('');
  }

  saveDemandSlip() {
    if (!this.selectedCcCenter() || !this.selectedDepartment() || !this.selectedProductionUnit()) {
      alert('Please fill out all required fields marked with * (CC Center, Department, and Production Unit).');
      return;
    }

    const nextId = (this.demandSlips().length + 1).toString();
    const newSlip: DemandSlipRecord = {
      id: nextId,
      demandDate: '19 May 2026',
      demandNo: `DS-2026-00${nextId}`,
      ccCenter: this.selectedCcCenter(),
      department: this.selectedDepartment(),
      projectName: this.projectName() || 'Unassigned Project',
      status: 'PENDING'
    };

    this.demandSlips.update(slips => [newSlip, ...slips]);
    this.filteredDemandSlips.set(this.demandSlips());
    this.resetSlipForm();
    alert('Demand Slip submitted successfully for approval.');
  }

  searchItems() {
    alert(`Searching items in Group: ${this.selectedGroup()} and Type: ${this.selectedItemType()}`);
  }

  searchDemandSlips() {
    let result = this.demandSlips();

    if (this.searchCcCenter()) {
      result = result.filter(s => s.ccCenter.toLowerCase().includes(this.searchCcCenter().toLowerCase()));
    }
    if (this.searchDepartment()) {
      result = result.filter(s => s.department.toLowerCase().includes(this.searchDepartment().toLowerCase()));
    }
    if (this.searchReferenceNo()) {
      result = result.filter(s => s.demandNo.toLowerCase().includes(this.searchReferenceNo().toLowerCase()));
    }

    this.filteredDemandSlips.set(result);
  }

  deleteDemandItem(id: string) {
    this.demandItems.update(items => items.filter(itm => itm.id !== id));
  }
}
