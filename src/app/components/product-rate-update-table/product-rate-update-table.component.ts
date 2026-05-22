import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface RateUpdateItem {
  id: string;
  selected: boolean;
  itemName: string;
  itemCode: string;
  group: string;
  currentPurPrice: string;
  currentSalesPrice: string;
  currentMRP: string;
}

@Component({
  selector: 'app-product-rate-update-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-rate-update-table.component.html',
  styleUrl: './product-rate-update-table.component.css'
})
export class ProductRateUpdateTableComponent {
  // Mock products matched from inventory
  data = signal<RateUpdateItem[]>([
    { id: '1', selected: false, itemName: 'Mouse', itemCode: 'AST/LAP/0002', group: 'ASSETS', currentPurPrice: '250.00', currentSalesPrice: '350.00', currentMRP: '400.00' },
    { id: '2', selected: false, itemName: 'Laptop', itemCode: 'AST/LAP/0001', group: 'ASSETS', currentPurPrice: '35000.00', currentSalesPrice: '45000.00', currentMRP: '48000.00' },
    { id: '3', selected: false, itemName: 'Chairs', itemCode: 'AST/FUR/0001', group: 'ASSETS', currentPurPrice: '1200.00', currentSalesPrice: '1800.00', currentMRP: '2200.00' }
  ]);

  toggleAll(event: any) {
    const isChecked = event.target.checked;
    this.data.update(items => items.map(item => ({ ...item, selected: isChecked })));
  }

  toggleItem(toggledItem: RateUpdateItem) {
    this.data.update(items => items.map(item => 
      item.id === toggledItem.id ? { ...item, selected: !item.selected } : item
    ));
  }
}
