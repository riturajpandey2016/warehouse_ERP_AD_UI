import { Component, signal, computed, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  LucideAngularModule, 
  Search, Filter, Download, Plus, Copy, History, Edit, Trash2, Lock 
} from 'lucide-angular';

export interface RoleData {
  id: number;
  name: string;
  code: string;
  isAdmin: boolean;
  status: 'Active' | 'Inactive';
}

const mockRoles: RoleData[] = [
  { id: 1, name: 'System Administrator', code: 'ADMIN', isAdmin: true, status: 'Active' },
  { id: 2, name: 'Purchase Manager', code: 'PUR_MGR', isAdmin: false, status: 'Active' },
  { id: 3, name: 'Store Operator', code: 'STORE_OP', isAdmin: false, status: 'Active' },
];

@Component({
  selector: 'app-role-table',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './role-table.component.html',
  styleUrl: './role-table.component.css'
})
export class RoleTableComponent {
  roles: WritableSignal<RoleData[]> = signal(mockRoles);

  readonly SearchIcon = Search;
  readonly FilterIcon = Filter;
  readonly PlusIcon = Plus;
  readonly DownloadIcon = Download;
  readonly EditIcon = Edit;
  readonly CopyIcon = Copy;
  readonly HistoryIcon = History;
  readonly Trash2Icon = Trash2;
  readonly LockIcon = Lock;
}
