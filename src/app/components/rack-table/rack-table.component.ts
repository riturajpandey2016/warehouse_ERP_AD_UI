import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  LucideAngularModule, 
  Edit2, 
  Trash, 
  CheckCircle, 
  XCircle,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight
} from 'lucide-angular';

export interface RackRecord {
  id: string;
  ccCenter: string;
  store: string;
  room: string;
  shelf: string;
  rack: string;
  description: string;
}

@Component({
  selector: 'app-rack-table',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './rack-table.component.html',
  styleUrl: './rack-table.component.css'
})
export class RackTableComponent {
  // Lucide Icons
  readonly EditIcon = Edit2;
  readonly TrashIcon = Trash;
  readonly CheckIcon = CheckCircle;
  readonly CancelIcon = XCircle;
  readonly ChevronLeftIcon = ChevronLeft;
  readonly ChevronRightIcon = ChevronRight;
  readonly ChevronsLeftIcon = ChevronsLeft;
  readonly ChevronsRightIcon = ChevronsRight;

  // Mock list populated exactly matching the screenshot rows
  originalData = signal<RackRecord[]>([
    { id: '1', ccCenter: 'Head Office', store: 'ILICO Store', room: 'Room 1', shelf: 'Shelf 1', rack: 'Rack 1', description: 'Rack 1' },
    { id: '2', ccCenter: 'Head Office', store: 'ILICO Store', room: 'Room 2', shelf: 'Shelf 1', rack: 'Rack 1', description: 'Rack 1' },
    { id: '3', ccCenter: 'Head Office', store: 'ILICO Store', room: 'Room 3', shelf: 'Shelf 1', rack: 'Rack 1', description: 'Rack 1' },
    { id: '4', ccCenter: 'Head Office', store: 'ILICO Store', room: 'Room 4', shelf: 'Shelf 1', rack: 'Rack 1', description: 'Rack 1' },
    { id: '5', ccCenter: 'Head Office', store: 'ILICO Store', room: 'Room 1', shelf: 'Shelf 2', rack: 'Rack 1', description: 'Rack 1' },
    { id: '6', ccCenter: 'Head Office', store: 'ILICO Store', room: 'Room 2', shelf: 'Shelf 2', rack: 'Rack 1', description: 'Rack 1' },
    { id: '7', ccCenter: 'Head Office', store: 'ILICO Store', room: 'Room 3', shelf: 'Shelf 2', rack: 'Rack 1', description: 'Rack 1' },
    { id: '8', ccCenter: 'Head Office', store: 'ILICO Store', room: 'Room 4', shelf: 'Shelf 2', rack: 'Rack 1', description: 'Rack 1' },
    { id: '9', ccCenter: 'Head Office', store: 'ILICO Store', room: 'Room 1', shelf: 'Shelf 3', rack: 'Rack 1', description: 'Rack 1' },
    { id: '10', ccCenter: 'Head Office', store: 'ILICO Store', room: 'Room 2', shelf: 'Shelf 3', rack: 'Rack 1', description: 'Rack 1' }
  ]);

  filteredData = signal<RackRecord[]>([
    { id: '1', ccCenter: 'Head Office', store: 'ILICO Store', room: 'Room 1', shelf: 'Shelf 1', rack: 'Rack 1', description: 'Rack 1' },
    { id: '2', ccCenter: 'Head Office', store: 'ILICO Store', room: 'Room 2', shelf: 'Shelf 1', rack: 'Rack 1', description: 'Rack 1' },
    { id: '3', ccCenter: 'Head Office', store: 'ILICO Store', room: 'Room 3', shelf: 'Shelf 1', rack: 'Rack 1', description: 'Rack 1' },
    { id: '4', ccCenter: 'Head Office', store: 'ILICO Store', room: 'Room 4', shelf: 'Shelf 1', rack: 'Rack 1', description: 'Rack 1' },
    { id: '5', ccCenter: 'Head Office', store: 'ILICO Store', room: 'Room 1', shelf: 'Shelf 2', rack: 'Rack 1', description: 'Rack 1' },
    { id: '6', ccCenter: 'Head Office', store: 'ILICO Store', room: 'Room 2', shelf: 'Shelf 2', rack: 'Rack 1', description: 'Rack 1' },
    { id: '7', ccCenter: 'Head Office', store: 'ILICO Store', room: 'Room 3', shelf: 'Shelf 2', rack: 'Rack 1', description: 'Rack 1' },
    { id: '8', ccCenter: 'Head Office', store: 'ILICO Store', room: 'Room 4', shelf: 'Shelf 2', rack: 'Rack 1', description: 'Rack 1' },
    { id: '9', ccCenter: 'Head Office', store: 'ILICO Store', room: 'Room 1', shelf: 'Shelf 3', rack: 'Rack 1', description: 'Rack 1' },
    { id: '10', ccCenter: 'Head Office', store: 'ILICO Store', room: 'Room 2', shelf: 'Shelf 3', rack: 'Rack 1', description: 'Rack 1' }
  ]);

  // Dynamic filter state
  filterCc = signal<string>('');
  filterStore = signal<string>('');
  filterRoom = signal<string>('');
  filterShelf = signal<string>('');
  filterRack = signal<string>('');
  filterDesc = signal<string>('');

  addRackRecord(record: { ccCenter: string; store: string; room: string; shelf: string; rack: string; description: string }) {
    const nextId = (this.originalData().length + 1).toString();
    const newRack: RackRecord = {
      id: nextId,
      ccCenter: record.ccCenter,
      store: record.store,
      room: record.room,
      shelf: record.shelf,
      rack: record.rack,
      description: record.description
    };

    this.originalData.update(racks => [...racks, newRack]);
    this.applyInlineFilters();
  }

  deleteRack(id: string) {
    this.originalData.update(racks => racks.filter(r => r.id !== id));
    this.applyInlineFilters();
  }

  onFilterChange() {
    this.applyInlineFilters();
  }

  applyInlineFilters() {
    let result = this.originalData();

    if (this.filterCc()) {
      result = result.filter(r => r.ccCenter.toLowerCase().includes(this.filterCc().toLowerCase()));
    }
    if (this.filterStore()) {
      result = result.filter(r => r.store.toLowerCase().includes(this.filterStore().toLowerCase()));
    }
    if (this.filterRoom()) {
      result = result.filter(r => r.room.toLowerCase().includes(this.filterRoom().toLowerCase()));
    }
    if (this.filterShelf()) {
      result = result.filter(r => r.shelf.toLowerCase().includes(this.filterShelf().toLowerCase()));
    }
    if (this.filterRack()) {
      result = result.filter(r => r.rack.toLowerCase().includes(this.filterRack().toLowerCase()));
    }
    if (this.filterDesc()) {
      result = result.filter(r => r.description.toLowerCase().includes(this.filterDesc().toLowerCase()));
    }

    this.filteredData.set(result);
  }
}
