import { Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  LucideAngularModule, 
  Search, Filter, Download, Plus, Copy, History, Edit, Trash2 
} from 'lucide-angular';

export interface SalesSupplyType {
  id: number;
  salesType: string;
  description: string;
  entryBy: string;
  status: 'Active' | 'Inactive';
}

const mockData: SalesSupplyType[] = [
  { id: 1, salesType: 'Export', description: 'Out of country sales', entryBy: 'Admin User', status: 'Active' },
  { id: 2, salesType: 'Inter-State', description: 'Sales between different states', entryBy: 'Manager', status: 'Active' },
  { id: 3, salesType: 'Intra-State', description: 'Sales within the same state', entryBy: 'System', status: 'Active' },
  { id: 4, salesType: 'Exempt', description: 'Non-taxable sales supply', entryBy: 'Admin User', status: 'Inactive' },
];

@Component({
  selector: 'app-sales-supply-type-table',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './sales-supply-type-table.component.html',
  styleUrl: './sales-supply-type-table.component.css'
})
export class SalesSupplyTypeTableComponent {
  data: WritableSignal<SalesSupplyType[]> = signal(mockData);

  readonly SearchIcon = Search;
  readonly FilterIcon = Filter;
  readonly PlusIcon = Plus;
  readonly DownloadIcon = Download;
  readonly EditIcon = Edit;
  readonly CopyIcon = Copy;
  readonly HistoryIcon = History;
  readonly Trash2Icon = Trash2;
}
