import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  LucideAngularModule, 
  Search, 
  Filter, 
  Plus, 
  Download, 
  MapPin, 
  Archive, 
  Edit2, 
  Copy, 
  History, 
  Trash 
} from 'lucide-angular';

export interface StoreRecord {
  id: string;
  branch: string;
  name: string;
  description: string;
  status: 'ACTIVE' | 'INACTIVE';
}

@Component({
  selector: 'app-store-table',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './store-table.component.html',
  styleUrl: './store-table.component.css'
})
export class StoreTableComponent {
  // Lucide Icons
  readonly SearchIcon = Search;
  readonly FilterIcon = Filter;
  readonly PlusIcon = Plus;
  readonly DownloadIcon = Download;
  readonly MapPinIcon = MapPin;
  readonly ArchiveIcon = Archive;
  readonly EditIcon = Edit2;
  readonly CopyIcon = Copy;
  readonly HistoryIcon = History;
  readonly TrashIcon = Trash;

  // Mock list populated exactly matching the screenshot rows
  originalData = signal<StoreRecord[]>([
    { id: '1', branch: 'MUMBAI CENTRAL', name: 'RAW MATERIAL STORE A', description: 'Primary storage for incoming raw materials', status: 'ACTIVE' },
    { id: '2', branch: 'NEW DELHI HUB', name: 'FINISHED GOODS SECTION 1', description: 'Storage for ready-to-ship products', status: 'ACTIVE' },
    { id: '3', branch: 'BANGALORE STORE', name: 'CONSUMABLES RACK', description: 'Storage for small consumables and office supplies', status: 'ACTIVE' },
    { id: '4', branch: 'CHENNAI', name: 'QUARANTINE AREA', description: 'Restricted area for items pending inspection', status: 'INACTIVE' }
  ]);

  filteredData = signal<StoreRecord[]>([
    { id: '1', branch: 'MUMBAI CENTRAL', name: 'RAW MATERIAL STORE A', description: 'Primary storage for incoming raw materials', status: 'ACTIVE' },
    { id: '2', branch: 'NEW DELHI HUB', name: 'FINISHED GOODS SECTION 1', description: 'Storage for ready-to-ship products', status: 'ACTIVE' },
    { id: '3', branch: 'BANGALORE STORE', name: 'CONSUMABLES RACK', description: 'Storage for small consumables and office supplies', status: 'ACTIVE' },
    { id: '4', branch: 'CHENNAI', name: 'QUARANTINE AREA', description: 'Restricted area for items pending inspection', status: 'INACTIVE' }
  ]);

  addStoreRecord(record: { branch: string; name: string; description: string; status: 'ACTIVE' | 'INACTIVE' }) {
    const nextId = (this.originalData().length + 1).toString();
    const newStore: StoreRecord = {
      id: nextId,
      branch: record.branch.toUpperCase(),
      name: record.name.toUpperCase(),
      description: record.description,
      status: record.status
    };

    this.originalData.update(stores => [...stores, newStore]);
    this.filteredData.update(stores => [...stores, newStore]);
  }

  deleteStore(id: string) {
    this.originalData.update(stores => stores.filter(s => s.id !== id));
    this.filteredData.update(stores => stores.filter(s => s.id !== id));
  }

  filterStores(storeName: string, branchName: string) {
    let result = this.originalData();

    if (storeName) {
      result = result.filter(s => s.name.toUpperCase().includes(storeName.toUpperCase()));
    }

    if (branchName) {
      result = result.filter(s => s.branch.toUpperCase() === branchName.toUpperCase());
    }

    this.filteredData.set(result);
  }
}
