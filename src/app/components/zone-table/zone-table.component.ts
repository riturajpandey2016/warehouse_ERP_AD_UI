import { Component, signal, computed, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  LucideAngularModule, 
  Search, Filter, Download, Plus, Copy, History, Edit, Trash2 
} from 'lucide-angular';

export interface ZoneData {
  id: number;
  countryName: string;
  zoneName: string;
  zoneCode: string;
  regionType: string;
  status: 'Active' | 'Inactive';
  warehouseCount: number;
  createdDate: string;
}

const mockZones: ZoneData[] = [
  { id: 1, countryName: 'India', zoneName: 'North Zone', zoneCode: 'NZ-IND', regionType: 'Operational', status: 'Active', warehouseCount: 12, createdDate: '15 Jan 2024' },
  { id: 2, countryName: 'India', zoneName: 'South Zone', zoneCode: 'SZ-IND', regionType: 'Operational', status: 'Active', warehouseCount: 8, createdDate: '20 Feb 2024' },
  { id: 3, countryName: 'United States', zoneName: 'East Coast', zoneCode: 'EC-USA', regionType: 'Administrative', status: 'Inactive', warehouseCount: 5, createdDate: '10 Mar 2024' },
  { id: 4, countryName: 'United Arab Emirates', zoneName: 'Dubai Central', zoneCode: 'DXB-C', regionType: 'Delivery', status: 'Active', warehouseCount: 15, createdDate: '05 Apr 2024' },
];

@Component({
  selector: 'app-zone-table',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './zone-table.component.html',
  styleUrl: './zone-table.component.css'
})
export class ZoneTableComponent {
  zones: WritableSignal<ZoneData[]> = signal(mockZones);
  selectedIds: WritableSignal<Set<number>> = signal(new Set());

  allSelected = computed(() => {
    return this.zones().length > 0 && this.selectedIds().size === this.zones().length;
  });

  readonly SearchIcon = Search;
  readonly FilterIcon = Filter;
  readonly PlusIcon = Plus;
  readonly DownloadIcon = Download;
  readonly EditIcon = Edit;
  readonly CopyIcon = Copy;
  readonly HistoryIcon = History;
  readonly Trash2Icon = Trash2;

  toggleSelectAll() {
    if (this.allSelected()) {
      this.selectedIds.set(new Set());
    } else {
      this.selectedIds.set(new Set(this.zones().map(z => z.id)));
    }
  }

  toggleSelect(id: number) {
    const newSet = new Set(this.selectedIds());
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    this.selectedIds.set(newSet);
  }

  isSelected(id: number): boolean {
    return this.selectedIds().has(id);
  }
}
