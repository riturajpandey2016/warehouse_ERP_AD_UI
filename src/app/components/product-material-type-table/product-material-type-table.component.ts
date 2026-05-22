import { Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  LucideAngularModule, 
  Search, Filter, Plus, Download, Edit, Trash2
} from 'lucide-angular';

export interface ProductMaterialTypeRecord {
  id: number;
  itemMaterialType: string;
  itemMaterialCode: string;
  description: string;
  creationDate: string;
  status: 'Active' | 'Inactive';
}

const mockData: ProductMaterialTypeRecord[] = [
  { id: 1, itemMaterialType: 'Meter for Volumetric', itemMaterialCode: 'MFV', description: 'Meter for Volumetric', creationDate: '14 Jan 2017', status: 'Active' },
  { id: 2, itemMaterialType: 'Nozzle Assly', itemMaterialCode: 'NZA', description: 'Nozzle Assly', creationDate: '17 Jan 2017', status: 'Active' },
  { id: 3, itemMaterialType: 'Angular Check Valve', itemMaterialCode: 'ACV', description: 'Angular Check Valve', creationDate: '17 Jan 2017', status: 'Active' },
  { id: 4, itemMaterialType: 'Quantity Wheel', itemMaterialCode: 'QTW', description: 'Quantity Wheel', creationDate: '17 Jan 2017', status: 'Active' },
  { id: 5, itemMaterialType: 'Totalizer Assly', itemMaterialCode: 'TLA', description: 'Totalizer Assly', creationDate: '17 Jan 2017', status: 'Active' },
  { id: 6, itemMaterialType: 'Pump Unit Assly PTO', itemMaterialCode: 'PAP', description: 'Pump Unit Assly PTO', creationDate: '17 Jan 2017', status: 'Active' },
  { id: 7, itemMaterialType: 'Pump Unit Assly BLDC', itemMaterialCode: 'PAB', description: 'Pump Unit Assly BLDC', creationDate: '17 Jan 2017', status: 'Active' },
  { id: 8, itemMaterialType: 'Mini Dispensing Pump', itemMaterialCode: 'MDP', description: 'Mini Dispensing Pump', creationDate: '19 Jan 2017', status: 'Active' },
  { id: 9, itemMaterialType: 'General Assly', itemMaterialCode: 'GNA', description: 'General Assly', creationDate: '19 Jan 2017', status: 'Active' },
  { id: 10, itemMaterialType: 'Pipe Line Fittings', itemMaterialCode: 'PLF', description: 'Pipe Line Fittings', creationDate: '19 Jan 2017', status: 'Active' }
];

@Component({
  selector: 'app-product-material-type-table',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './product-material-type-table.component.html',
  styleUrl: './product-material-type-table.component.css'
})
export class ProductMaterialTypeTableComponent {
  data: WritableSignal<ProductMaterialTypeRecord[]> = signal(mockData);

  readonly SearchIcon = Search;
  readonly FilterIcon = Filter;
  readonly PlusIcon = Plus;
  readonly DownloadIcon = Download;
  readonly EditIcon = Edit;
  readonly Trash2Icon = Trash2;
}
