import { Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  LucideAngularModule, 
  Search, Filter, Plus, Download, Edit, Copy, History, Trash2 
} from 'lucide-angular';

export interface HsnRecord {
  id: number;
  hsnCode: string;
  description: string;
  taxType: string;
  taxPercentage: string;
  type: string;
  status: 'Active' | 'Inactive';
}

const mockData: HsnRecord[] = [
  { id: 1, hsnCode: '84139190', description: 'PUMPS FOR LIQUIDS, WHETHER OR NOT FITTED WITH A MEASURING DEVICE; LIQUID ELEVATORS - PARTS: 8413 91 - OF PUMPS: OTHER', taxType: 'Non Zero Rated', taxPercentage: '28.00', type: 'HSN', status: 'Active' },
  { id: 2, hsnCode: '84131199', description: 'PUMPS FOR LIQUIDS, WHETHER OR NOT FITTED WITH A MEASURING DEVICE; LIQUID ELEVATORS - PUMPS FITTED OR DESIGNED TO BE FITTED WITH', taxType: 'Non Zero Rated', taxPercentage: '28.00', type: 'HSN', status: 'Active' },
  { id: 3, hsnCode: '90261010', description: 'INSTRUMENTS AND APPARATUS FOR MEASURING OR CHECKING THE FLOW, LEVEL, PRESSURE OR OTHER VARIABLES OF LIQUIDS OR GASES (FOR EXAMPL', taxType: 'Non Zero Rated', taxPercentage: '18.00', type: 'HSN', status: 'Active' },
  { id: 4, hsnCode: '84813000', description: 'TAPS, COCKS, VALVES AND SIMILAR APPLIANCES FOR PIPES, BOILER SHELLS, TANKS, VATS OR THE LIKE, INCLUDING PRESSURE-REDUCING VALVES', taxType: 'Non Zero Rated', taxPercentage: '18.00', type: 'HSN', status: 'Active' },
  { id: 5, hsnCode: '84814000', description: 'TAPS, COCKS, VALVES AND SIMILAR APPLIANCES FOR PIPES, BOILER SHELLS, TANKS, VATS OR THE LIKE, INCLUDING PRESSURE-REDUCING VALVES', taxType: 'Non Zero Rated', taxPercentage: '18.00', type: 'HSN', status: 'Active' }
];

@Component({
  selector: 'app-hsn-table',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './hsn-table.component.html',
  styleUrl: './hsn-table.component.css'
})
export class HsnTableComponent {
  data: WritableSignal<HsnRecord[]> = signal(mockData);

  readonly SearchIcon = Search;
  readonly FilterIcon = Filter;
  readonly PlusIcon = Plus;
  readonly DownloadIcon = Download;
  readonly EditIcon = Edit;
  readonly CopyIcon = Copy;
  readonly HistoryIcon = History;
  readonly Trash2Icon = Trash2;
}
