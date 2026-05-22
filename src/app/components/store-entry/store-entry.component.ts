import { Component, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  LucideAngularModule, 
  Archive, 
  Save, 
  RotateCcw, 
  ChevronDown, 
  ChevronUp, 
  AlertTriangle, 
  Search, 
  Filter 
} from 'lucide-angular';

import { StoreTableComponent } from '../store-table/store-table.component';

@Component({
  selector: 'app-store-entry',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    LucideAngularModule, 
    StoreTableComponent
  ],
  templateUrl: './store-entry.component.html',
  styleUrl: './store-entry.component.css'
})
export class StoreEntryComponent {
  // Lucide Icons
  readonly ArchiveIcon = Archive;
  readonly SaveIcon = Save;
  readonly RotateCcwIcon = RotateCcw;
  readonly ChevronDownIcon = ChevronDown;
  readonly ChevronUpIcon = ChevronUp;
  readonly AlertTriangleIcon = AlertTriangle;
  readonly SearchIcon = Search;
  readonly FilterIcon = Filter;

  // View Accordion States
  showConfig = signal<boolean>(true);
  showSearch = signal<boolean>(true);
  showDatabase = signal<boolean>(true);

  // Form Field States
  selectedBranch = signal<string>('');
  storeName = signal<string>('');
  description = signal<string>('');
  isActive = signal<boolean>(true);

  // Search Field States
  searchStoreName = signal<string>('');
  searchBranch = signal<string>('');

  @ViewChild('storeTable') storeTable!: StoreTableComponent;

  toggleConfig() {
    this.showConfig.update(v => !v);
  }

  toggleSearch() {
    this.showSearch.update(v => !v);
  }

  toggleDatabase() {
    this.showDatabase.update(v => !v);
  }

  setStatus(status: boolean) {
    this.isActive.set(status);
  }

  resetForm() {
    this.selectedBranch.set('');
    this.storeName.set('');
    this.description.set('');
    this.isActive.set(true);
  }

  saveStore() {
    if (!this.selectedBranch() || !this.storeName()) {
      alert('Please fill out all required fields marked with * (CC Center / Branch and Store Name).');
      return;
    }

    if (this.storeTable) {
      this.storeTable.addStoreRecord({
        branch: this.selectedBranch(),
        name: this.storeName(),
        description: this.description() || 'No description provided.',
        status: this.isActive() ? 'ACTIVE' : 'INACTIVE'
      });
    }

    this.resetForm();
    alert('Store configured and added to registry successfully.');
  }

  applySearchFilters() {
    if (this.storeTable) {
      this.storeTable.filterStores(this.searchStoreName(), this.searchBranch());
    }
  }
}
