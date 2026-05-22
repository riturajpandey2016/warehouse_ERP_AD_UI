import { Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  LucideAngularModule, 
  Search, Filter, Download, Plus, Copy, History, Edit, Trash2 
} from 'lucide-angular';

export interface SalesSupplySubType {
  id: number;
  salesType: string;
  subType: string;
  description: string;
  entryBy: string;
  status: 'Active' | 'Inactive';
}

const mockData: SalesSupplySubType[] = [
  { id: 1, salesType: 'Export', subType: 'With Payment of Tax', description: 'Export with payment of IGST', entryBy: 'Admin User', status: 'Active' },
  { id: 2, salesType: 'Export', subType: 'Without Payment of Tax', description: 'Export under LUT/Bond', entryBy: 'Manager', status: 'Active' },
  { id: 3, salesType: 'Inter-State', subType: 'Business to Business', description: 'Registered tax payers', entryBy: 'System', status: 'Active' },
  { id: 4, salesType: 'Intra-State', subType: 'Consumer', description: 'Unregistered persons', entryBy: 'Admin User', status: 'Inactive' },
];

@Component({
  selector: 'app-sales-supply-sub-type-table',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './sales-supply-sub-type-table.component.html',
  styleUrl: './sales-supply-sub-type-table.component.css'
})
export class SalesSupplySubTypeTableComponent {
  data: WritableSignal<SalesSupplySubType[]> = signal(mockData);

  readonly SearchIcon = Search;
  readonly FilterIcon = Filter;
  readonly PlusIcon = Plus;
  readonly DownloadIcon = Download;
  readonly EditIcon = Edit;
  readonly CopyIcon = Copy;
  readonly HistoryIcon = History;
  readonly Trash2Icon = Trash2;
}
