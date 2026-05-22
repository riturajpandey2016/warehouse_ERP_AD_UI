import { Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  LucideAngularModule, 
  Search, Filter, Download, Plus, Copy, History, Edit, Trash2 
} from 'lucide-angular';

export interface TermsConditionsRow {
  id: number;
  moduleName: string;
  pageName: string;
  entryDate: string;
  status: 'Active' | 'Inactive';
}

const mockData: TermsConditionsRow[] = [
  { id: 1, moduleName: 'Sales', pageName: 'Sales Qutation Report', entryDate: '06/03/2017', status: 'Active' },
  { id: 2, moduleName: 'Sales', pageName: 'Forwarding Letter', entryDate: '08/09/2017', status: 'Inactive' },
  { id: 3, moduleName: 'Purchase', pageName: 'Purchase Job Order Report', entryDate: '08/09/2017', status: 'Active' },
  { id: 4, moduleName: 'Purchase', pageName: 'Delivery Challan Print', entryDate: '02/10/2017', status: 'Active' },
  { id: 5, moduleName: 'Purchase', pageName: 'Debit Note', entryDate: '08/05/2018', status: 'Active' }
];

@Component({
  selector: 'app-terms-conditions-table',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './terms-conditions-table.component.html',
  styleUrl: './terms-conditions-table.component.css'
})
export class TermsConditionsTableComponent {
  data: WritableSignal<TermsConditionsRow[]> = signal(mockData);

  readonly SearchIcon = Search;
  readonly FilterIcon = Filter;
  readonly PlusIcon = Plus;
  readonly DownloadIcon = Download;
  readonly EditIcon = Edit;
  readonly CopyIcon = Copy;
  readonly HistoryIcon = History;
  readonly Trash2Icon = Trash2;
}
