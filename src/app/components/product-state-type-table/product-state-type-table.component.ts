import { Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  LucideAngularModule, 
  Search, Filter, Plus, Download, Edit
} from 'lucide-angular';

export interface ProductStateTypeRecord {
  id: number;
  itemType: string;
  description: string;
  creationDate: string;
}

const mockData: ProductStateTypeRecord[] = [
  { id: 1, itemType: 'Inventory', description: 'Inventory', creationDate: '06 Jun 2014' },
  { id: 2, itemType: 'Non Inventory', description: 'Non Inventory', creationDate: '28 May 2014' }
];

@Component({
  selector: 'app-product-state-type-table',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './product-state-type-table.component.html',
  styleUrl: './product-state-type-table.component.css'
})
export class ProductStateTypeTableComponent {
  data: WritableSignal<ProductStateTypeRecord[]> = signal(mockData);

  readonly SearchIcon = Search;
  readonly FilterIcon = Filter;
  readonly PlusIcon = Plus;
  readonly DownloadIcon = Download;
  readonly EditIcon = Edit;
}
