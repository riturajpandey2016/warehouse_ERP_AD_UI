import { Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  LucideAngularModule, 
  Search, Filter, Download, Plus, Copy, History, Edit, Trash2 
} from 'lucide-angular';

export interface DesignationData {
  id: number;
  company: string;
  ccCenter: string;
  department: string;
  designation: string;
  isActive: boolean;
}

const mockDesignations: DesignationData[] = [
  { id: 1, company: 'Horeca Global', ccCenter: 'CC-01 North', department: 'Human Resources', designation: 'HR Manager', isActive: true },
  { id: 2, company: 'Horeca Global', ccCenter: 'CC-02 South', department: 'Finance', designation: 'Senior Accountant', isActive: true },
  { id: 3, company: 'Horeca USA Inc.', ccCenter: 'CC-NY-01', department: 'IT Support', designation: 'System Administrator', isActive: false },
  { id: 4, company: 'Horeca UAE LLC', ccCenter: 'CC-DXB-Main', department: 'Operations', designation: 'Operations Head', isActive: true },
];

@Component({
  selector: 'app-designation-table',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './designation-table.component.html',
  styleUrl: './designation-table.component.css'
})
export class DesignationTableComponent {
  data: WritableSignal<DesignationData[]> = signal(mockDesignations);

  readonly SearchIcon = Search;
  readonly FilterIcon = Filter;
  readonly PlusIcon = Plus;
  readonly DownloadIcon = Download;
  readonly EditIcon = Edit;
  readonly CopyIcon = Copy;
  readonly HistoryIcon = History;
  readonly Trash2Icon = Trash2;
}
