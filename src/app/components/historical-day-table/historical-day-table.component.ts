import { Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  LucideAngularModule, 
  Search, Filter, Download, Plus, Copy, History, Edit, Trash2 
} from 'lucide-angular';

export interface HistoricalDay {
  id: number;
  country: string;
  date: string;
  header: string;
  description: string;
  entryBy: string;
  entryDate: string;
  status: 'Active' | 'Inactive';
}

const mockData: HistoricalDay[] = [
  { id: 1, country: 'India', date: '01 Dec 2025', header: 'World AIDS Day', description: 'World AIDS Day', entryBy: 'Siddharta Dikshit', entryDate: '02 Dec 2025', status: 'Active' },
  { id: 2, country: 'India', date: '12 Jul 2021', header: 'National Simplicity Day', description: 'National Simplicity Day', entryBy: 'Siddharta Dikshit', entryDate: '06 Jul 2022', status: 'Active' },
  { id: 3, country: 'India', date: '01 Jun 2021', header: 'GLOBAL PARENTS DAY', description: 'GLOBAL PARENTS DAY', entryBy: 'Siddharta Dikshit', entryDate: '06 Jul 2022', status: 'Active' }
];

@Component({
  selector: 'app-historical-day-table',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './historical-day-table.component.html',
  styleUrl: './historical-day-table.component.css'
})
export class HistoricalDayTableComponent {
  data: WritableSignal<HistoricalDay[]> = signal(mockData);

  readonly SearchIcon = Search;
  readonly FilterIcon = Filter;
  readonly PlusIcon = Plus;
  readonly DownloadIcon = Download;
  readonly EditIcon = Edit;
  readonly CopyIcon = Copy;
  readonly HistoryIcon = History;
  readonly Trash2Icon = Trash2;
}
