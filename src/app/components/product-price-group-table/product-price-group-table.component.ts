import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Filter, Edit2 } from 'lucide-angular';

interface ProductPriceGroupData {
  id: string;
  itemName: string;
  enteredBy: string;
  enteredDate: string;
}

@Component({
  selector: 'app-product-price-group-table',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './product-price-group-table.component.html',
  styleUrl: './product-price-group-table.component.css'
})
export class ProductPriceGroupTableComponent {
  // Icons
  readonly FilterIcon = Filter;
  readonly EditIcon = Edit2;

  // Mock data to match the screenshot
  data = signal<ProductPriceGroupData[]>([
    { id: '1', itemName: 'G1', enteredBy: 'Siddharta Dikshit', enteredDate: '12 Oct 2018' },
    { id: '2', itemName: 'G2', enteredBy: 'Siddharta Dikshit', enteredDate: '12 Oct 2018' }
  ]);
}
