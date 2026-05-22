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

export interface RoomRecord {
  id: string;
  ccCenter: string;
  store: string;
  room: string;
  description: string;
}

@Component({
  selector: 'app-room-table',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './room-table.component.html',
  styleUrl: './room-table.component.css'
})
export class RoomTableComponent {
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
  originalData = signal<RoomRecord[]>([
    { id: '1', ccCenter: 'Head Office', store: 'ILICO Store', room: 'Room 1', description: 'Room 1' },
    { id: '2', ccCenter: 'Head Office', store: 'ILICO Store', room: 'Room 2', description: 'Room 2' },
    { id: '3', ccCenter: 'Head Office', store: 'ILICO Store', room: 'Room 3', description: 'Room 3' },
    { id: '4', ccCenter: 'Head Office', store: 'ILICO Store', room: 'Room 4', description: 'Room 4' }
  ]);

  filteredData = signal<RoomRecord[]>([
    { id: '1', ccCenter: 'Head Office', store: 'ILICO Store', room: 'Room 1', description: 'Room 1' },
    { id: '2', ccCenter: 'Head Office', store: 'ILICO Store', room: 'Room 2', description: 'Room 2' },
    { id: '3', ccCenter: 'Head Office', store: 'ILICO Store', room: 'Room 3', description: 'Room 3' },
    { id: '4', ccCenter: 'Head Office', store: 'ILICO Store', room: 'Room 4', description: 'Room 4' }
  ]);

  // Dynamic filter state
  filterCc = signal<string>('');
  filterStore = signal<string>('');
  filterRoom = signal<string>('');
  filterDesc = signal<string>('');

  addRoomRecord(record: { ccCenter: string; store: string; room: string; description: string }) {
    const nextId = (this.originalData().length + 1).toString();
    const newRoom: RoomRecord = {
      id: nextId,
      ccCenter: record.ccCenter,
      store: record.store,
      room: record.room,
      description: record.description
    };

    this.originalData.update(rooms => [...rooms, newRoom]);
    this.applyInlineFilters();
  }

  deleteRoom(id: string) {
    this.originalData.update(rooms => rooms.filter(r => r.id !== id));
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
    if (this.filterDesc()) {
      result = result.filter(r => r.description.toLowerCase().includes(this.filterDesc().toLowerCase()));
    }

    this.filteredData.set(result);
  }
}
