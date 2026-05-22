import { Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  LucideAngularModule, 
  Search, Filter, Download, Plus, Copy, History, Edit, Trash2 
} from 'lucide-angular';

export interface LetterOfUndertaking {
  id: number;
  branch: string;
  finYear: string;
  arnNo: string;
  description: string;
  entryBy: string;
  entryDate: string;
  status: 'Active' | 'Inactive';
}

const mockData: LetterOfUndertaking[] = [
  { id: 1, branch: 'HEAD OFFICE', finYear: '2024-2025', arnNo: 'AD240324000123L', description: 'Annual LUT for exports', entryBy: 'ADMIN USER', entryDate: '01 APR 2024', status: 'Active' },
  { id: 2, branch: 'WAREHOUSE A', finYear: '2024-2025', arnNo: 'AD240324000456M', description: 'LUT for regional exports', entryBy: 'MANAGER', entryDate: '05 APR 2024', status: 'Active' },
  { id: 3, branch: 'FACTORY UNIT 1', finYear: '2023-2024', arnNo: 'AD230323000789K', description: 'Previous year LUT', entryBy: 'SYSTEM', entryDate: '01 APR 2023', status: 'Inactive' }
];

@Component({
  selector: 'app-letter-undertaking-table',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './letter-undertaking-table.component.html',
  styleUrl: './letter-undertaking-table.component.css'
})
export class LetterUndertakingTableComponent {
  data: WritableSignal<LetterOfUndertaking[]> = signal(mockData);

  readonly SearchIcon = Search;
  readonly FilterIcon = Filter;
  readonly PlusIcon = Plus;
  readonly DownloadIcon = Download;
  readonly EditIcon = Edit;
  readonly CopyIcon = Copy;
  readonly HistoryIcon = History;
  readonly Trash2Icon = Trash2;
}
