import { Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  LucideAngularModule, 
  Search, Filter, Download, Plus, Copy, History, Edit, Trash2 
} from 'lucide-angular';

export interface FinancialYear {
  id: number;
  company: string;
  fromDate: string;
  toDate: string;
  ay: string;
  terms: string;
  fyShort: string;
  status: 'Active' | 'Inactive';
}

const mockData: FinancialYear[] = [
  { id: 1, company: 'HORECA ERP Solutions', fromDate: '01 Apr 2024', toDate: '31 Mar 2025', ay: '2025-26', terms: 'FY 2024-25 Terms', fyShort: '24-25', status: 'Active' },
  { id: 2, company: 'Global Distribution Ltd', fromDate: '01 Apr 2024', toDate: '31 Mar 2025', ay: '2025-26', terms: 'FY 2024-25 Global Terms', fyShort: '24-25', status: 'Active' },
  { id: 3, company: 'HORECA ERP Solutions', fromDate: '01 Apr 2023', toDate: '31 Mar 2024', ay: '2024-25', terms: 'Previous Year Terms', fyShort: '23-24', status: 'Inactive' },
];

@Component({
  selector: 'app-financial-year-table',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './financial-year-table.component.html',
  styleUrl: './financial-year-table.component.css'
})
export class FinancialYearTableComponent {
  data: WritableSignal<FinancialYear[]> = signal(mockData);

  readonly SearchIcon = Search;
  readonly FilterIcon = Filter;
  readonly PlusIcon = Plus;
  readonly DownloadIcon = Download;
  readonly EditIcon = Edit;
  readonly CopyIcon = Copy;
  readonly HistoryIcon = History;
  readonly Trash2Icon = Trash2;
}
