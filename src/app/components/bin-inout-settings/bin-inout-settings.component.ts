import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  LucideAngularModule, 
  ChevronDown, 
  ChevronUp, 
  Search,
  Filter,
  CheckCircle2,
  ArrowRightLeft
} from 'lucide-angular';

export interface SettingsItem {
  id: string;
  selected: boolean;
  itemCode: string;
  itemName: string;
  itemCategory: string;
  group: string;
  currentOutOrder: string;
}

@Component({
  selector: 'app-bin-inout-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './bin-inout-settings.component.html',
  styleUrl: './bin-inout-settings.component.css'
})
export class BinInoutSettingsComponent {
  readonly ChevronDownIcon = ChevronDown;
  readonly ChevronUpIcon = ChevronUp;
  readonly SearchIcon = Search;
  readonly FilterIcon = Filter;
  readonly ActiveIcon = CheckCircle2;
  readonly InoutIcon = ArrowRightLeft;

  // Accordion state
  showEntryPanel = signal<boolean>(true);

  // Form Fields
  selectedCompany = signal<string>('ILICO SERVICES LTD.(vERP)');
  selectedBranch = signal<string>('Head Office');
  selectedGroup = signal<string>('');
  selectedCategory = signal<string>('');

  // Selected Settings fields
  selectedItemOutOrder = signal<string>('');

  // Table grid filters
  filterItemCode = signal<string>('');
  filterItemName = signal<string>('');
  filterCategory = signal<string>('');
  filterGroup = signal<string>('');

  // Sub level database
  itemsList = signal<SettingsItem[]>([
    { id: '1', selected: false, itemCode: 'ITM-MARBLE-01', itemName: 'White Carrara Marble Slab', itemCategory: 'Slabs', group: 'RAW MATERIALS', currentOutOrder: 'FIFO' },
    { id: '2', selected: false, itemCode: 'ITM-GRANITE-02', itemName: 'Black Galaxy Granite 18mm', itemCategory: 'Slabs', group: 'RAW MATERIALS', currentOutOrder: 'LIFO' },
    { id: '3', selected: false, itemCode: 'ITM-CEMENT-03', itemName: 'UltraTech Premium Cement', itemCategory: 'Powder', group: 'BUILDING MATERIALS', currentOutOrder: 'FIFO' },
    { id: '4', selected: false, itemCode: 'ITM-BRICK-04', itemName: 'Red Clay Bricks Grade-A', itemCategory: 'Bricks', group: 'BUILDING MATERIALS', currentOutOrder: 'FEFO' },
    { id: '5', selected: false, itemCode: 'ITM-STEEL-05', itemName: 'TMT Steel Rods 12mm', itemCategory: 'Metal rods', group: 'METALS', currentOutOrder: 'FIFO' }
  ]);

  filteredItemsList = signal<SettingsItem[]>([
    { id: '1', selected: false, itemCode: 'ITM-MARBLE-01', itemName: 'White Carrara Marble Slab', itemCategory: 'Slabs', group: 'RAW MATERIALS', currentOutOrder: 'FIFO' },
    { id: '2', selected: false, itemCode: 'ITM-GRANITE-02', itemName: 'Black Galaxy Granite 18mm', itemCategory: 'Slabs', group: 'RAW MATERIALS', currentOutOrder: 'LIFO' },
    { id: '3', selected: false, itemCode: 'ITM-CEMENT-03', itemName: 'UltraTech Premium Cement', itemCategory: 'Powder', group: 'BUILDING MATERIALS', currentOutOrder: 'FIFO' },
    { id: '4', selected: false, itemCode: 'ITM-BRICK-04', itemName: 'Red Clay Bricks Grade-A', itemCategory: 'Bricks', group: 'BUILDING MATERIALS', currentOutOrder: 'FEFO' },
    { id: '5', selected: false, itemCode: 'ITM-STEEL-05', itemName: 'TMT Steel Rods 12mm', itemCategory: 'Metal rods', group: 'METALS', currentOutOrder: 'FIFO' }
  ]);

  toggleEntryPanel() { this.showEntryPanel.update(v => !v); }

  viewItems() {
    alert('Loading products matching selected category and branch settings...');
  }

  importSettings() {
    if (!this.selectedItemOutOrder()) {
      alert('Please select an Item Out Order policy first.');
      return;
    }

    const selectedIds = this.itemsList()
      .filter(item => item.selected)
      .map(item => item.id);

    if (selectedIds.length === 0) {
      alert('Please check/select at least one item from the table grid.');
      return;
    }

    // Apply the change
    this.itemsList.update(list => list.map(item => {
      if (item.selected) {
        return {
          ...item,
          currentOutOrder: this.selectedItemOutOrder(),
          selected: false // clear checkbox after import
        };
      }
      return item;
    }));

    this.onFilterChange();
    alert(`Successfully imported and set ${this.selectedItemOutOrder()} policy to selected products!`);
    this.selectedItemOutOrder.set('');
  }

  onFilterChange() {
    let result = this.itemsList();

    if (this.filterItemCode()) {
      result = result.filter(itm => itm.itemCode.toLowerCase().includes(this.filterItemCode().toLowerCase()));
    }
    if (this.filterItemName()) {
      result = result.filter(itm => itm.itemName.toLowerCase().includes(this.filterItemName().toLowerCase()));
    }
    if (this.filterCategory()) {
      result = result.filter(itm => itm.itemCategory.toLowerCase().includes(this.filterCategory().toLowerCase()));
    }
    if (this.filterGroup()) {
      result = result.filter(itm => itm.group.toLowerCase().includes(this.filterGroup().toLowerCase()));
    }

    this.filteredItemsList.set(result);
  }
}
