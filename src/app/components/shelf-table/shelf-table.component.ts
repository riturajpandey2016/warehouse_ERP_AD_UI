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

export interface ShelfRecord {
  id: string;
  ccCenter: string;
  store: string;
  room: string;
  shelf: string;
  description: string;
}

@Component({
  selector: 'app-shelf-table',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './shelf-table.component.html',
  styleUrl: './shelf-table.component.css'
})
export class ShelfTableComponent {
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
  originalData = signal<ShelfRecord[]>([
    { id: '1', ccCenter: 'Head Office', store: 'ILICO Store', room: 'Room 1', shelf: 'Shelf 1', description: 'Shelf 1' },
    { id: '2', ccCenter: 'Head Office', store: 'ILICO Store', room: 'Room 2', shelf: 'Shelf 1', description: 'Shelf 1' },
    { id: '3', ccCenter: 'Head Office', store: 'ILICO Store', room: 'Room 3', shelf: 'Shelf 1', description: 'Shelf 1' },
    { id: '4', ccCenter: 'Head Office', store: 'ILICO Store', room: 'Room 4', shelf: 'Shelf 1', description: 'Shelf 1' },
    { id: '5', ccCenter: 'Head Office', store: 'ILICO Store', room: 'Room 1', shelf: 'Shelf 2', description: 'Shelf 2' },
    { id: '6', ccCenter: 'Head Office', store: 'ILICO Store', room: 'Room 2', shelf: 'Shelf 2', description: 'Shelf 2' },
    { id: '7', ccCenter: 'Head Office', store: 'ILICO Store', room: 'Room 3', shelf: 'Shelf 2', description: 'Shelf 2' },
    { id: '8', ccCenter: 'Head Office', store: 'ILICO Store', room: 'Room 4', shelf: 'Shelf 2', description: 'Shelf 2' },
    { id: '9', ccCenter: 'Head Office', store: 'ILICO Store', room: 'Room 1', shelf: 'Shelf 3', description: 'Shelf 3' },
    { id: '10', ccCenter: 'Head Office', store: 'ILICO Store', room: 'Room 2', shelf: 'Shelf 3', description: 'Shelf 3' }
  ]);

  filteredData = signal<ShelfRecord[]>([
    { id: '1', ccCenter: 'Head Office', store: 'ILICO Store', room: 'Room 1', shelf: 'Shelf 1', description: 'Shelf 1' },
    { id: '2', ccCenter: 'Head Office', store: 'ILICO Store', room: 'Room 2', shelf: 'Shelf 1', description: 'Shelf 1' },
    { id: '3', ccCenter: 'Head Office', store: 'ILICO Store', room: 'Room 3', shelf: 'Shelf 1', description: 'Shelf 1' },
    { id: '4', ccCenter: 'Head Office', store: 'ILICO Store', room: 'Room 4', shelf: 'Shelf 1', description: 'Shelf 1' },
    { id: '5', ccCenter: 'Head Office', store: 'ILICO Store', room: 'Room 1', shelf: 'Shelf 2', description: 'Shelf 2' },
    { id: '6', ccCenter: 'Head Office', store: 'ILICO Store', room: 'Room 2', shelf: 'Shelf 2', description: 'Shelf 2' },
    { id: '7', ccCenter: 'Head Office', store: 'ILICO Store', room: 'Room 3', shelf: 'Shelf 2', description: 'Shelf 2' },
    { id: '8', ccCenter: 'Head Office', store: 'ILICO Store', room: 'Room 4', shelf: 'Shelf 2', description: 'Shelf 2' },
    { id: '9', ccCenter: 'Head Office', store: 'ILICO Store', room: 'Room 1', shelf: 'Shelf 3', description: 'Shelf 3' },
    { id: '10', ccCenter: 'Head Office', store: 'ILICO Store', room: 'Room 2', shelf: 'Shelf 3', description: 'Shelf 3' }
  ]);

  // Dynamic filter state
  filterCc = signal<string>('');
  filterStore = signal<string>('');
  filterRoom = signal<string>('');
  filterShelf = signal<string>('');
  filterDesc = signal<string>('');

  addShelfRecord(record: { ccCenter: string; store: string; room: string; shelf: string; description: string }) {
    const nextId = (this.originalData().length + 1).toString();
    const newShelf: ShelfRecord = {
      id: nextId,
      ccCenter: record.ccCenter,
      store: record.store,
      room: record.room,
      shelf: record.shelf,
      description: record.description
    };

    this.originalData.update(shelves => [...shelves, newShelf]);
    this.applyInlineFilters();
  }

  deleteShelf(id: string) {
    this.originalData.update(shelves => shelves.filter(s => s.id !== id));
    this.applyInlineFilters();
  }

  onFilterChange() {
    this.applyInlineFilters();
  }

  applyInlineFilters() {
    let result = this.originalData();

    if (this.filterCc()) {
      result = result.filter(s => s.ccCenter.toLowerCase().includes(this.filterCc().toLowerCase()));
    }
    if (this.filterStore()) {
      result = result.filter(s => s.store.toLowerCase().includes(this.filterStore().toLowerCase()));
    }
    if (this.filterRoom()) {
      result = result.filter(s => s.room.toLowerCase().includes(this.filterRoom().toLowerCase()));
    }
    if (this.filterShelf()) {
      result = result.filter(s => s.shelf.toLowerCase().includes(this.filterShelf().toLowerCase()));
    }
    if (this.filterDesc()) {
      result = result.filter(s => s.description.toLowerCase().includes(this.filterDesc().toLowerCase()));
    }

    this.filteredData.set(result);
  }
}
