import { Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  LucideAngularModule, 
  Search, Filter, Plus, Download, Edit, Copy, History, Trash2 
} from 'lucide-angular';

export interface ManufactureRecord {
  id: number;
  code: string;
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  status: 'Active' | 'Inactive';
}

const mockData: ManufactureRecord[] = [
  { id: 1, code: 'NTR', name: 'NTR', contactPerson: 'SUKANTA NEOGI', phone: '9830046243', email: '', status: 'Active' },
  { id: 2, code: 'Basu Industries', name: 'Basu Industries', contactPerson: 'Payel Basu', phone: '789897067', email: '', status: 'Active' }
];

@Component({
  selector: 'app-manufacture-table',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './manufacture-table.component.html',
  styleUrl: './manufacture-table.component.css'
})
export class ManufactureTableComponent {
  data: WritableSignal<ManufactureRecord[]> = signal(mockData);

  readonly SearchIcon = Search;
  readonly FilterIcon = Filter;
  readonly PlusIcon = Plus;
  readonly DownloadIcon = Download;
  readonly EditIcon = Edit;
  readonly CopyIcon = Copy;
  readonly HistoryIcon = History;
  readonly Trash2Icon = Trash2;
}
