import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Filter } from 'lucide-angular';

interface BulkHsnData {
  id: string;
  selected: boolean;
  itemName: string;
  itemCode: string;
  group: string;
  itemType: string;
  hsn: string;
  taxRate: string;
}

@Component({
  selector: 'app-bulk-product-hsn-table',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './bulk-product-hsn-table.component.html',
  styleUrl: './bulk-product-hsn-table.component.css'
})
export class BulkProductHsnTableComponent {
  readonly FilterIcon = Filter;

  // Mock list of items matching standard inventory records
  data = signal<BulkHsnData[]>([
    { id: '1', selected: false, itemName: 'Mouse', itemCode: 'AST/LAP/0002', group: 'ASSETS', itemType: 'Laptop', hsn: '3917', taxRate: '18.00%' },
    { id: '2', selected: false, itemName: 'Laptop', itemCode: 'AST/LAP/0001', group: 'ASSETS', itemType: 'Laptop', hsn: '84713020', taxRate: '18.00%' },
    { id: '3', selected: false, itemName: 'Chairs', itemCode: 'AST/FUR/0001', group: 'ASSETS', itemType: 'FURNITURE', hsn: '94013000', taxRate: '18.00%' },
    { id: '4', selected: false, itemName: 'Milky Mist Greek Yogurt, 100 g', itemCode: 'DAIRY/YHT/00001', group: 'DAIRY', itemType: 'Yoghurt', hsn: '04031010', taxRate: '5.00%' },
    { id: '5', selected: false, itemName: 'Cow Milk', itemCode: 'RAW/MLK/00001', group: 'RAW MATERIALS', itemType: 'Milk', hsn: '04011000', taxRate: '0.00%' }
  ]);

  toggleAll(event: any) {
    const isChecked = event.target.checked;
    this.data.update(items => items.map(item => ({ ...item, selected: isChecked })));
  }

  toggleItem(toggledItem: BulkHsnData) {
    this.data.update(items => items.map(item => 
      item.id === toggledItem.id ? { ...item, selected: !item.selected } : item
    ));
  }
}
