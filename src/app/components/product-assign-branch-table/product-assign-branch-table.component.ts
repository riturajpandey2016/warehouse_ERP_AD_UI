import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Filter, Edit2 } from 'lucide-angular';

interface ProductAssignTableData {
  id: string;
  branch: string;
  warehouse: string;
  productName: string;
  group: string;
  openingStock: string;
  purchasePrice: string;
  salesPrice: string;
  mrp: string;
}

@Component({
  selector: 'app-product-assign-branch-table',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './product-assign-branch-table.component.html',
  styleUrl: './product-assign-branch-table.component.css'
})
export class ProductAssignBranchTableComponent {
  readonly FilterIcon = Filter;
  readonly EditIcon = Edit2;

  // Mock records mirroring assigned branch stocks
  data = signal<ProductAssignTableData[]>([
    { id: '1', branch: 'Head Office', warehouse: 'Central Store', productName: 'Mouse', group: 'ASSETS', openingStock: '50.00', purchasePrice: '250.00', salesPrice: '350.00', mrp: '400.00' },
    { id: '2', branch: 'Head Office', warehouse: 'Central Store', productName: 'Laptop', group: 'ASSETS', openingStock: '15.00', purchasePrice: '35000.00', salesPrice: '45000.00', mrp: '48000.00' }
  ]);
}
