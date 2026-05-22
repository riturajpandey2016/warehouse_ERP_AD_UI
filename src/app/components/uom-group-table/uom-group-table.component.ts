import { Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  LucideAngularModule, 
  Search, Filter, Plus, Download, Edit, Copy, History, Trash2 
} from 'lucide-angular';

export interface UomGroupRecord {
  id: number;
  groupName: string;
  baseUom: string;
  description: string;
  status: 'Active' | 'Inactive';
}

const mockData: UomGroupRecord[] = [
  { id: 1, groupName: 'Weight Group', baseUom: 'Kg', description: 'Group for weight measurements', status: 'Active' },
  { id: 2, groupName: 'Volume Group', baseUom: 'Ltr', description: 'Group for liquid measurements', status: 'Active' },
  { id: 3, groupName: 'Length Group', baseUom: 'Mtr', description: 'Group for length measurements', status: 'Active' },
  { id: 4, groupName: 'Quantity Group', baseUom: 'Pcs', description: 'Group for discrete item counts', status: 'Active' },
  { id: 5, groupName: 'Packaging Group', baseUom: 'Pkt', description: 'Group for packet packages', status: 'Active' }
];

@Component({
  selector: 'app-uom-group-table',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './uom-group-table.component.html',
  styleUrl: './uom-group-table.component.css'
})
export class UomGroupTableComponent {
  data: WritableSignal<UomGroupRecord[]> = signal(mockData);

  readonly SearchIcon = Search;
  readonly FilterIcon = Filter;
  readonly PlusIcon = Plus;
  readonly DownloadIcon = Download;
  readonly EditIcon = Edit;
  readonly CopyIcon = Copy;
  readonly HistoryIcon = History;
  readonly Trash2Icon = Trash2;
}
