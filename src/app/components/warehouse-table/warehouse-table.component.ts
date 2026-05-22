import { Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  LucideAngularModule, 
  Search, Filter, Plus, Download, Edit, Trash2
} from 'lucide-angular';

export interface WarehouseRecord {
  id: number;
  warehouseName: string;
  warehouseCode: string;
  branch: string;
  entryDate: string;
}

const mockData: WarehouseRecord[] = [
  { id: 1, warehouseName: 'WareHouse1', warehouseCode: 'WareHouse1', branch: 'Head Office', entryDate: '02/09/2020' }
];

@Component({
  selector: 'app-warehouse-table',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './warehouse-table.component.html',
  styleUrl: './warehouse-table.component.css'
})
export class WarehouseTableComponent {
  data: WritableSignal<WarehouseRecord[]> = signal(mockData);

  readonly SearchIcon = Search;
  readonly FilterIcon = Filter;
  readonly PlusIcon = Plus;
  readonly DownloadIcon = Download;
  readonly EditIcon = Edit;
  readonly Trash2Icon = Trash2;
}
