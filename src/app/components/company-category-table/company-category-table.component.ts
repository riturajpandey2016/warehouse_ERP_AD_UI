import { Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  LucideAngularModule, 
  Search, Filter, Download, Plus, Copy, History, Edit, Trash2 
} from 'lucide-angular';

export interface CompanyCategoryData {
  id: number;
  companyType: string;
  description: string;
  creationDate: string;
  isActive: boolean;
}

const mockCategories: CompanyCategoryData[] = [
  { id: 1, companyType: 'Manufacturing', description: 'Companies involved in production of goods', creationDate: '10-01-2024', isActive: true },
  { id: 2, companyType: 'Trading', description: 'Companies involved in buying and selling', creationDate: '15-02-2024', isActive: true },
  { id: 3, companyType: 'Services', description: 'Companies providing intangible services', creationDate: '20-03-2024', isActive: false },
  { id: 4, companyType: 'Logistics', description: 'Transportation and warehousing companies', creationDate: '05-04-2024', isActive: true },
];

@Component({
  selector: 'app-company-category-table',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './company-category-table.component.html',
  styleUrl: './company-category-table.component.css'
})
export class CompanyCategoryTableComponent {
  data: WritableSignal<CompanyCategoryData[]> = signal(mockCategories);

  readonly SearchIcon = Search;
  readonly FilterIcon = Filter;
  readonly PlusIcon = Plus;
  readonly DownloadIcon = Download;
  readonly EditIcon = Edit;
  readonly CopyIcon = Copy;
  readonly HistoryIcon = History;
  readonly Trash2Icon = Trash2;
}
