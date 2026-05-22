import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  LucideAngularModule, 
  ChevronDown, 
  ChevronUp, 
  Search,
  Trash,
  Edit2,
  Filter,
  CheckCircle2,
  Save
} from 'lucide-angular';

export interface PendingArrangementItem {
  id: string;
  itemCode: string;
  itemName: string;
  unit: string;
  openingQty: number;
  selectedStore: string;
  selectedRoom: string;
  selectedRack: string;
  selectedBin: string;
}

export interface ArrangedBinRecord {
  id: string;
  itemCode: string;
  itemName: string;
  store: string;
  room: string;
  rack: string;
  bin: string;
  arrangedBy: string;
  arrangedDate: string;
}

@Component({
  selector: 'app-opening-stock-bin',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './opening-stock-bin.component.html',
  styleUrl: './opening-stock-bin.component.css'
})
export class OpeningStockBinComponent {
  readonly ChevronDownIcon = ChevronDown;
  readonly ChevronUpIcon = ChevronUp;
  readonly SearchIcon = Search;
  readonly TrashIcon = Trash;
  readonly EditIcon = Edit2;
  readonly FilterIcon = Filter;
  readonly ActiveIcon = CheckCircle2;
  readonly SaveIcon = Save;

  // Accordion Panels
  showEntryPanel = signal<boolean>(true);

  // Form Fields
  arrangementStatus = signal<'Not Done' | 'Done'>('Not Done');
  selectedCompany = signal<string>('ILICO SERVICES LTD.(vERP)');
  selectedBranch = signal<string>('Head Office');
  selectedGroup = signal<string>('');
  selectedItemName = signal<string>('');

  // Dropdown Master Options
  storeOptions = signal<string[]>(['Main Store A', 'Secondary Store B', 'Basement Store C']);
  roomOptions = signal<string[]>(['Room 101', 'Room 102', 'Cold Storage Room']);
  rackOptions = signal<string[]>(['Rack A1', 'Rack A2', 'Rack B1', 'Heavy Load Rack']);
  binOptions = signal<string[]>(['Box 1', 'Jar 5', 'Cartoon Box B', 'Metal Container']);

  // Table grid search filters
  filterItemCode = signal<string>('');
  filterItemName = signal<string>('');
  filterStore = signal<string>('');
  filterRoom = signal<string>('');

  // Not Done Opening Items List
  pendingList = signal<PendingArrangementItem[]>([
    { id: '1', itemCode: 'ITM-MARBLE-01', itemName: 'White Carrara Marble Slab', unit: 'SqFt', openingQty: 500, selectedStore: '', selectedRoom: '', selectedRack: '', selectedBin: '' },
    { id: '2', itemCode: 'ITM-GRANITE-02', itemName: 'Black Galaxy Granite 18mm', unit: 'SqFt', openingQty: 350, selectedStore: '', selectedRoom: '', selectedRack: '', selectedBin: '' },
    { id: '3', itemCode: 'ITM-CEMENT-03', itemName: 'UltraTech Premium Cement', unit: 'Bags', openingQty: 1000, selectedStore: '', selectedRoom: '', selectedRack: '', selectedBin: '' }
  ]);

  filteredPendingList = signal<PendingArrangementItem[]>([
    { id: '1', itemCode: 'ITM-MARBLE-01', itemName: 'White Carrara Marble Slab', unit: 'SqFt', openingQty: 500, selectedStore: '', selectedRoom: '', selectedRack: '', selectedBin: '' },
    { id: '2', itemCode: 'ITM-GRANITE-02', itemName: 'Black Galaxy Granite 18mm', unit: 'SqFt', openingQty: 350, selectedStore: '', selectedRoom: '', selectedRack: '', selectedBin: '' },
    { id: '3', itemCode: 'ITM-CEMENT-03', itemName: 'UltraTech Premium Cement', unit: 'Bags', openingQty: 1000, selectedStore: '', selectedRoom: '', selectedRack: '', selectedBin: '' }
  ]);

  // Done Arranged Stock database
  doneRecordsList = signal<ArrangedBinRecord[]>([
    { id: '1', itemCode: 'ITM-STEEL-05', itemName: 'TMT Steel Rods 12mm', store: 'Main Store A', room: 'Room 101', rack: 'Rack A1', bin: 'Metal Container', arrangedBy: 'Siddharta Dikshit', arrangedDate: '15 May 2026' },
    { id: '2', itemCode: 'ITM-BRICK-04', itemName: 'Red Clay Bricks Grade-A', store: 'Secondary Store B', room: 'Room 102', rack: 'Rack B1', bin: 'Cartoon Box B', arrangedBy: 'Siddharta Dikshit', arrangedDate: '18 May 2026' }
  ]);

  filteredDoneRecordsList = signal<ArrangedBinRecord[]>([
    { id: '1', itemCode: 'ITM-STEEL-05', itemName: 'TMT Steel Rods 12mm', store: 'Main Store A', room: 'Room 101', rack: 'Rack A1', bin: 'Metal Container', arrangedBy: 'Siddharta Dikshit', arrangedDate: '15 May 2026' },
    { id: '2', itemCode: 'ITM-BRICK-04', itemName: 'Red Clay Bricks Grade-A', store: 'Secondary Store B', room: 'Room 102', rack: 'Rack B1', bin: 'Cartoon Box B', arrangedBy: 'Siddharta Dikshit', arrangedDate: '18 May 2026' }
  ]);

  toggleEntryPanel() { this.showEntryPanel.update(v => !v); }

  searchStock() {
    alert(`Searching stock arrangements for ${this.arrangementStatus()} status...`);
  }

  resetForm() {
    this.selectedGroup.set('');
    this.selectedItemName.set('');
  }

  saveItemArrangement(item: PendingArrangementItem) {
    if (!item.selectedStore || !item.selectedRoom || !item.selectedRack || !item.selectedBin) {
      alert('Please select Store, Room, Rack and Bin arrangements.');
      return;
    }

    // Move from pending to done
    const newRecord: ArrangedBinRecord = {
      id: (this.doneRecordsList().length + 1).toString(),
      itemCode: item.itemCode,
      itemName: item.itemName,
      store: item.selectedStore,
      room: item.selectedRoom,
      rack: item.selectedRack,
      bin: item.selectedBin,
      arrangedBy: 'Siddharta Dikshit',
      arrangedDate: '19 May 2026'
    };

    this.doneRecordsList.update(list => [newRecord, ...list]);
    this.pendingList.update(list => list.filter(p => p.id !== item.id));
    this.onPendingFilterChange();
    this.onDoneFilterChange();
    alert('Stock bin arrangement saved successfully!');
  }

  deleteArrangement(id: string) {
    if (confirm('Are you sure you want to remove this bin arrangement?')) {
      const record = this.doneRecordsList().find(r => r.id === id);
      if (record) {
        // Move back to pending list
        const restoredItem: PendingArrangementItem = {
          id: (this.pendingList().length + 1).toString(),
          itemCode: record.itemCode,
          itemName: record.itemName,
          unit: 'Nos',
          openingQty: 100,
          selectedStore: '',
          selectedRoom: '',
          selectedRack: '',
          selectedBin: ''
        };
        this.pendingList.update(list => [...list, restoredItem]);
      }
      this.doneRecordsList.update(list => list.filter(r => r.id !== id));
      this.onPendingFilterChange();
      this.onDoneFilterChange();
    }
  }

  onPendingFilterChange() {
    let result = this.pendingList();
    if (this.filterItemCode()) {
      result = result.filter(i => i.itemCode.toLowerCase().includes(this.filterItemCode().toLowerCase()));
    }
    if (this.filterItemName()) {
      result = result.filter(i => i.itemName.toLowerCase().includes(this.filterItemName().toLowerCase()));
    }
    this.filteredPendingList.set(result);
  }

  onDoneFilterChange() {
    let result = this.doneRecordsList();
    if (this.filterItemCode()) {
      result = result.filter(r => r.itemCode.toLowerCase().includes(this.filterItemCode().toLowerCase()));
    }
    if (this.filterItemName()) {
      result = result.filter(r => r.itemName.toLowerCase().includes(this.filterItemName().toLowerCase()));
    }
    if (this.filterStore()) {
      result = result.filter(r => r.store.toLowerCase().includes(this.filterStore().toLowerCase()));
    }
    if (this.filterRoom()) {
      result = result.filter(r => r.room.toLowerCase().includes(this.filterRoom().toLowerCase()));
    }
    this.filteredDoneRecordsList.set(result);
  }
}
