import { Component, signal, computed, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  LucideAngularModule, 
  Search, Filter, Download, Plus, Copy, History, Edit, Trash2 
} from 'lucide-angular';

export interface Company {
  id: number;
  baseCompany: string;
  name: string;
  address: string;
  pinCode: string;
  status: 'Active' | 'Inactive';
  createdDate: string;
}

const mockCompanies: Company[] = [
  { id: 1, baseCompany: 'Parent Company 1', name: 'Warehouse Logistics Inc.', address: '123 Supply Chain Blvd, Industrial Area', pinCode: '400001', status: 'Active', createdDate: '15 Jan 2024' },
  { id: 2, baseCompany: 'Parent Company 1', name: 'Global Supply Chain Ltd.', address: '45 Freight Road, Business Park', pinCode: '110020', status: 'Active', createdDate: '20 Feb 2024' },
  { id: 3, baseCompany: 'Parent Company 2', name: 'Metro Distribution Hub', address: '78 Logistics Tech Park, Sector 4', pinCode: '500081', status: 'Inactive', createdDate: '10 Mar 2024' },
  { id: 4, baseCompany: 'Parent Company 2', name: 'Express Cargo Services', address: '90 Swift Lane, Commercial Zone', pinCode: '600002', status: 'Active', createdDate: '05 Apr 2024' },
];

@Component({
  selector: 'app-company-table',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './company-table.component.html',
  styleUrl: './company-table.component.css'
})
export class CompanyTableComponent {
  companies: WritableSignal<Company[]> = signal(mockCompanies);
  selectedIds: WritableSignal<Set<number>> = signal(new Set());

  allSelected = computed(() => {
    return this.companies().length > 0 && this.selectedIds().size === this.companies().length;
  });

  readonly SearchIcon = Search;
  readonly FilterIcon = Filter;
  readonly PlusIcon = Plus;
  readonly DownloadIcon = Download;
  readonly EditIcon = Edit;
  readonly CopyIcon = Copy;
  readonly HistoryIcon = History;
  readonly Trash2Icon = Trash2;

  toggleSelectAll() {
    if (this.allSelected()) {
      this.selectedIds.set(new Set());
    } else {
      this.selectedIds.set(new Set(this.companies().map(c => c.id)));
    }
  }

  toggleSelect(id: number) {
    const newSet = new Set(this.selectedIds());
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    this.selectedIds.set(newSet);
  }

  isSelected(id: number): boolean {
    return this.selectedIds().has(id);
  }
}
