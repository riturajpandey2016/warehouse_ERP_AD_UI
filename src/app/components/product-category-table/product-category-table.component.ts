import { Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  LucideAngularModule, 
  Search, Filter, Plus, Download, Edit
} from 'lucide-angular';

export interface ProductCategoryRecord {
  id: number;
  itemCategory: string;
  description: string;
  creationDate: string;
}

const mockData: ProductCategoryRecord[] = [
  { id: 1, itemCategory: 'Fast Moving', description: 'Kolkata', creationDate: '30 Apr 2014' },
  { id: 2, itemCategory: 'Slow Moving', description: 'Kolkata', creationDate: '11 Apr 2014' },
  { id: 3, itemCategory: 'Obsolete', description: 'Obsolete', creationDate: '30 Apr 2014' },
  { id: 4, itemCategory: 'Medium Moving', description: 'Medium Moving', creationDate: '10 Mar 2022' }
];

@Component({
  selector: 'app-product-category-table',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './product-category-table.component.html',
  styleUrl: './product-category-table.component.css'
})
export class ProductCategoryTableComponent {
  data: WritableSignal<ProductCategoryRecord[]> = signal(mockData);

  readonly SearchIcon = Search;
  readonly FilterIcon = Filter;
  readonly PlusIcon = Plus;
  readonly DownloadIcon = Download;
  readonly EditIcon = Edit;
}
