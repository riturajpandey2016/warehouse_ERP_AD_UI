import { Component, signal, computed, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  LucideAngularModule, 
  Search, Filter, Download, Plus, Copy, History, Edit, Trash2 
} from 'lucide-angular';

export interface CountryData {
  id: number;
  flagUrl: string;
  countryCode: string;
  isoCode: string;
  countryName: string;
  currency: string;
  dialCode: string;
  region: string;
  status: 'Active' | 'Inactive';
  createdDate: string;
  lastUpdated: string;
}

const mockCountries: CountryData[] = [
  { id: 1, flagUrl: 'https://flagcdn.com/w40/in.png', countryCode: 'IND', isoCode: 'IN', countryName: 'India', currency: 'INR', dialCode: '+91', region: 'Asia', status: 'Active', createdDate: '15 Jan 2024', lastUpdated: '10 May 2024' },
  { id: 2, flagUrl: 'https://flagcdn.com/w40/us.png', countryCode: 'USA', isoCode: 'US', countryName: 'United States', currency: 'USD', dialCode: '+1', region: 'North America', status: 'Active', createdDate: '20 Feb 2024', lastUpdated: '11 May 2024' },
  { id: 3, flagUrl: 'https://flagcdn.com/w40/gb.png', countryCode: 'GBR', isoCode: 'GB', countryName: 'United Kingdom', currency: 'GBP', dialCode: '+44', region: 'Europe', status: 'Inactive', createdDate: '10 Mar 2024', lastUpdated: '12 May 2024' },
  { id: 4, flagUrl: 'https://flagcdn.com/w40/ae.png', countryCode: 'ARE', isoCode: 'AE', countryName: 'United Arab Emirates', currency: 'AED', dialCode: '+971', region: 'Middle East', status: 'Active', createdDate: '05 Apr 2024', lastUpdated: '15 May 2024' },
];

@Component({
  selector: 'app-country-table',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './country-table.component.html',
  styleUrl: './country-table.component.css'
})
export class CountryTableComponent {
  countries: WritableSignal<CountryData[]> = signal(mockCountries);
  selectedIds: WritableSignal<Set<number>> = signal(new Set());

  allSelected = computed(() => {
    return this.countries().length > 0 && this.selectedIds().size === this.countries().length;
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
      this.selectedIds.set(new Set(this.countries().map(c => c.id)));
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
