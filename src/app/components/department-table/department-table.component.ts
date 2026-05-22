import { Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  LucideAngularModule, 
  Search, Filter, Download, Plus, Copy, History, Edit, Trash2 
} from 'lucide-angular';

export interface DepartmentData {
  id: number;
  company: string;
  ccCenter: string;
  department: string;
  description: string;
  creationDate: string;
  isActive: boolean;
}

const mockDepartments: DepartmentData[] = [
  { id: 1, company: 'Horeca Global', ccCenter: 'CC-01 North', department: 'Human Resources', description: 'HR and Employee Relations', creationDate: '15-01-2024', isActive: true },
  { id: 2, company: 'Horeca Global', ccCenter: 'CC-02 South', department: 'Finance', description: 'Accounting and Financial Planning', creationDate: '20-02-2024', isActive: true },
  { id: 3, company: 'Horeca USA Inc.', ccCenter: 'CC-NY-01', department: 'IT Support', description: 'Information Technology Services', creationDate: '10-03-2024', isActive: false },
  { id: 4, company: 'Horeca UAE LLC', ccCenter: 'CC-DXB-Main', department: 'Operations', description: 'Core Business Operations', creationDate: '05-04-2024', isActive: true },
];

@Component({
  selector: 'app-department-table',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './department-table.component.html',
  styleUrl: './department-table.component.css'
})
export class DepartmentTableComponent {
  data: WritableSignal<DepartmentData[]> = signal(mockDepartments);

  readonly SearchIcon = Search;
  readonly FilterIcon = Filter;
  readonly PlusIcon = Plus;
  readonly DownloadIcon = Download;
  readonly EditIcon = Edit;
  readonly CopyIcon = Copy;
  readonly HistoryIcon = History;
  readonly Trash2Icon = Trash2;
}
