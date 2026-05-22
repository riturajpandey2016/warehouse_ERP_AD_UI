import { Component, signal, computed, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  LucideAngularModule, 
  Search, Filter, Download, Plus, Copy, History, Edit, Trash2 
} from 'lucide-angular';

export interface StateData {
  id: number;
  countryName: string;
  zoneName: string;
  stateName: string;
  stateCode: string;
  stateTinNumber: string;
  status: 'Active' | 'Inactive';
}

const mockStates: StateData[] = [
  { id: 1, countryName: 'India', zoneName: 'North Zone', stateName: 'Delhi', stateCode: 'DL', stateTinNumber: '07', status: 'Active' },
  { id: 2, countryName: 'India', zoneName: 'South Zone', stateName: 'Karnataka', stateCode: 'KA', stateTinNumber: '29', status: 'Active' },
  { id: 3, countryName: 'United States', zoneName: 'East Coast', stateName: 'New York', stateCode: 'NY', stateTinNumber: 'NY-31', status: 'Inactive' },
  { id: 4, countryName: 'United Arab Emirates', zoneName: 'Dubai Central', stateName: 'Dubai', stateCode: 'DXB', stateTinNumber: 'DXB-01', status: 'Active' },
];

@Component({
  selector: 'app-state-table',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './state-table.component.html',
  styleUrl: './state-table.component.css'
})
export class StateTableComponent {
  states: WritableSignal<StateData[]> = signal(mockStates);
  selectedIds: WritableSignal<Set<number>> = signal(new Set());

  allSelected = computed(() => {
    return this.states().length > 0 && this.selectedIds().size === this.states().length;
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
      this.selectedIds.set(new Set(this.states().map(s => s.id)));
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
