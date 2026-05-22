import { Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  LucideAngularModule, 
  Search, Filter, Download, Plus, Copy, History, Edit, Trash2 
} from 'lucide-angular';

export interface TransportMode {
  id: number;
  transportType: string;
  description: string;
  entryBy: string;
  status: 'Active' | 'Inactive';
}

const mockData: TransportMode[] = [
  { id: 1, transportType: 'Road', description: 'Transportation via trucks and vehicles', entryBy: 'Admin User', status: 'Active' },
  { id: 2, transportType: 'Rail', description: 'Transportation via cargo trains', entryBy: 'Manager', status: 'Active' },
  { id: 3, transportType: 'Air', description: 'Fast transportation via cargo planes', entryBy: 'System', status: 'Active' },
  { id: 4, transportType: 'Sea', description: 'Transportation via shipping containers', entryBy: 'Admin User', status: 'Inactive' },
];

@Component({
  selector: 'app-transport-mode-table',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './transport-mode-table.component.html',
  styleUrl: './transport-mode-table.component.css'
})
export class TransportModeTableComponent {
  data: WritableSignal<TransportMode[]> = signal(mockData);

  readonly SearchIcon = Search;
  readonly FilterIcon = Filter;
  readonly PlusIcon = Plus;
  readonly DownloadIcon = Download;
  readonly EditIcon = Edit;
  readonly CopyIcon = Copy;
  readonly HistoryIcon = History;
  readonly Trash2Icon = Trash2;
}
