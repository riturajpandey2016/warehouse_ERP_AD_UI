import { Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  LucideAngularModule, 
  Search, Filter, Download, Plus, Copy, History, Edit, Trash2 
} from 'lucide-angular';

export interface CompanyEvent {
  id: number;
  companyName: string;
  deptName: string;
  ccCenter: string;
  eventDate: string;
  announcement: string;
  status: 'Active' | 'Inactive';
}

const mockData: CompanyEvent[] = [
  { id: 1, companyName: 'HORECA ERP SOLUTIONS', deptName: 'HUMAN RESOURCES', ccCenter: 'MAIN OFFICE', eventDate: '20 MAY 2024', announcement: 'Annual General Meeting and Strategy Presentation for FY 2024-25.', status: 'Active' },
  { id: 2, companyName: 'GLOBAL DISTRIBUTION LTD', deptName: 'OPERATIONS', ccCenter: 'REGIONAL HUB', eventDate: '25 MAY 2024', announcement: 'System maintenance scheduled for the main warehouse server.', status: 'Active' },
  { id: 3, companyName: 'HORECA ERP SOLUTIONS', deptName: 'IT & INFRASTRUCTURE', ccCenter: 'MAIN OFFICE', eventDate: '15 MAY 2024', announcement: 'Legacy database migration completed successfully.', status: 'Inactive' }
];

@Component({
  selector: 'app-news-events-table',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './news-events-table.component.html',
  styleUrl: './news-events-table.component.css'
})
export class NewsEventsTableComponent {
  data: WritableSignal<CompanyEvent[]> = signal(mockData);

  readonly SearchIcon = Search;
  readonly FilterIcon = Filter;
  readonly PlusIcon = Plus;
  readonly DownloadIcon = Download;
  readonly EditIcon = Edit;
  readonly CopyIcon = Copy;
  readonly HistoryIcon = History;
  readonly Trash2Icon = Trash2;
}
