import { Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  LucideAngularModule, 
  Search, Filter, Download, Plus, Copy, History, Edit, Trash2 
} from 'lucide-angular';

export interface AuthorisedDealerCode {
  id: number;
  branch: string;
  adCode: string;
  description: string;
  entryBy: string;
  entryDate: string;
  status: 'Active' | 'Inactive';
}

const mockData: AuthorisedDealerCode[] = [
  { id: 1, branch: 'Head Office', adCode: '0004450-1023009', description: 'SBI', entryBy: 'Siddharta Dikshit', entryDate: '10 Apr 2026', status: 'Active' },
  { id: 2, branch: 'Head Office', adCode: '0580756-1076265', description: 'KOTAK', entryBy: 'Siddharta Dikshit', entryDate: '10 Apr 2026', status: 'Active' }
];

@Component({
  selector: 'app-ad-code-table',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './ad-code-table.component.html',
  styleUrl: './ad-code-table.component.css'
})
export class AdCodeTableComponent {
  data: WritableSignal<AuthorisedDealerCode[]> = signal(mockData);

  readonly SearchIcon = Search;
  readonly FilterIcon = Filter;
  readonly PlusIcon = Plus;
  readonly DownloadIcon = Download;
  readonly EditIcon = Edit;
  readonly CopyIcon = Copy;
  readonly HistoryIcon = History;
  readonly Trash2Icon = Trash2;
}
