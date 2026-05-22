import { Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  LucideAngularModule, 
  Search, Filter, Download, Plus, Copy, History, Edit, Trash2 
} from 'lucide-angular';

export interface VehicleType {
  id: number;
  vehicleTypeName: string;
  vehicleTypeDesc: string;
  entryBy: string;
  status: 'Active' | 'Inactive';
}

const mockData: VehicleType[] = [
  { id: 1, vehicleTypeName: 'Heavy Truck', vehicleTypeDesc: 'Large multi-axle cargo trucks', entryBy: 'Admin User', status: 'Active' },
  { id: 2, vehicleTypeName: 'Delivery Van', vehicleTypeDesc: 'Medium sized last-mile delivery vans', entryBy: 'Manager', status: 'Active' },
  { id: 3, vehicleTypeName: 'Pickup Truck', vehicleTypeDesc: 'Small payload open-bed trucks', entryBy: 'System', status: 'Active' },
  { id: 4, vehicleTypeName: 'Motorcycle', vehicleTypeDesc: 'Two-wheeled express delivery bikes', entryBy: 'Admin User', status: 'Inactive' },
];

@Component({
  selector: 'app-vehicle-type-table',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './vehicle-type-table.component.html',
  styleUrl: './vehicle-type-table.component.css'
})
export class VehicleTypeTableComponent {
  data: WritableSignal<VehicleType[]> = signal(mockData);

  readonly SearchIcon = Search;
  readonly FilterIcon = Filter;
  readonly PlusIcon = Plus;
  readonly DownloadIcon = Download;
  readonly EditIcon = Edit;
  readonly CopyIcon = Copy;
  readonly HistoryIcon = History;
  readonly Trash2Icon = Trash2;
}
