import { Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  LucideAngularModule, 
  Search, Filter, Plus, Download, Edit, Copy, History, Trash2 
} from 'lucide-angular';

export interface UnitRecord {
  id: number;
  unit: string;
  description: string;
  status: 'Active' | 'Inactive';
}

const mockData: UnitRecord[] = [
  { id: 1, unit: 'Kg', description: 'Kilogram', status: 'Active' },
  { id: 2, unit: 'Ltr', description: 'Litre', status: 'Active' },
  { id: 3, unit: 'Mtr', description: 'Miter', status: 'Active' },
  { id: 4, unit: 'Decimeter', description: 'Decimeter for nut and fork by akash', status: 'Active' },
  { id: 5, unit: 'GM', description: 'Gram in India For TSP', status: 'Active' },
  { id: 6, unit: 'Pcs', description: 'Pcs', status: 'Active' },
  { id: 7, unit: 'Set', description: 'Set', status: 'Active' },
  { id: 8, unit: 'Pkt', description: 'Pkt', status: 'Active' },
  { id: 9, unit: 'Roll', description: 'Roll', status: 'Active' },
  { id: 10, unit: 'Bft', description: 'Board Feet', status: 'Active' }
];

@Component({
  selector: 'app-unit-table',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './unit-table.component.html',
  styleUrl: './unit-table.component.css'
})
export class UnitTableComponent {
  data: WritableSignal<UnitRecord[]> = signal(mockData);

  readonly SearchIcon = Search;
  readonly FilterIcon = Filter;
  readonly PlusIcon = Plus;
  readonly DownloadIcon = Download;
  readonly EditIcon = Edit;
  readonly CopyIcon = Copy;
  readonly HistoryIcon = History;
  readonly Trash2Icon = Trash2;
}
