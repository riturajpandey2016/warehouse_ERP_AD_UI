import { Component, signal, computed, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  LucideAngularModule, 
  Search, Filter, Download, Plus, Copy, History, Edit, Trash2 
} from 'lucide-angular';

export interface DistrictData {
  id: number;
  countryName: string;
  zoneName: string;
  stateName: string;
  districtName: string;
  districtCode: string;
  deliveryArea: string;
  warehouseCoverage: string;
  status: 'Active' | 'Inactive';
}

const mockDistricts: DistrictData[] = [
  { id: 1, countryName: 'India', zoneName: 'North Zone', stateName: 'Delhi', districtName: 'New Delhi', districtCode: 'NDLS', deliveryArea: 'Central Delhi', warehouseCoverage: 'Primary Hub', status: 'Active' },
  { id: 2, countryName: 'India', zoneName: 'South Zone', stateName: 'Karnataka', districtName: 'Bengaluru Urban', districtCode: 'BLR-U', deliveryArea: 'Metro Region', warehouseCoverage: 'Regional Hub', status: 'Active' },
  { id: 3, countryName: 'United States', zoneName: 'East Coast', stateName: 'New York', districtName: 'Manhattan', districtCode: 'MHTN', deliveryArea: 'Core Urban', warehouseCoverage: 'Local Depot', status: 'Inactive' },
  { id: 4, countryName: 'United Arab Emirates', zoneName: 'Dubai Central', stateName: 'Dubai', districtName: 'Deira', districtCode: 'DXB-D', deliveryArea: 'Commercial', warehouseCoverage: 'Primary Hub', status: 'Active' },
];

@Component({
  selector: 'app-district-table',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './district-table.component.html',
  styleUrl: './district-table.component.css'
})
export class DistrictTableComponent {
  districts: WritableSignal<DistrictData[]> = signal(mockDistricts);
  selectedIds: WritableSignal<Set<number>> = signal(new Set());

  allSelected = computed(() => {
    return this.districts().length > 0 && this.selectedIds().size === this.districts().length;
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
      this.selectedIds.set(new Set(this.districts().map(d => d.id)));
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
