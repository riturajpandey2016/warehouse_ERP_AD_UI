import { Component, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, ChevronDown, ChevronUp } from 'lucide-angular';

import { RoomTableComponent } from '../room-table/room-table.component';

@Component({
  selector: 'app-room-entry',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    LucideAngularModule, 
    RoomTableComponent
  ],
  templateUrl: './room-entry.component.html',
  styleUrl: './room-entry.component.css'
})
export class RoomEntryComponent {
  readonly ChevronDownIcon = ChevronDown;
  readonly ChevronUpIcon = ChevronUp;

  // Signal state for accordion
  showConfig = signal<boolean>(true);

  // Form Fields
  selectedCcCenter = signal<string>('Head Office');
  selectedStore = signal<string>('ILICO Store');
  roomType = signal<string>('');
  description = signal<string>('');

  @ViewChild('roomTable') roomTable!: RoomTableComponent;

  toggleConfig() {
    this.showConfig.update(v => !v);
  }

  resetForm() {
    this.selectedCcCenter.set('Head Office');
    this.selectedStore.set('ILICO Store');
    this.roomType.set('');
    this.description.set('');
  }

  saveRoom() {
    if (!this.roomType()) {
      alert('Please fill out Room input field.');
      return;
    }

    if (this.roomTable) {
      this.roomTable.addRoomRecord({
        ccCenter: this.selectedCcCenter(),
        store: this.selectedStore(),
        room: this.roomType(),
        description: this.description() || this.roomType()
      });
    }

    this.resetForm();
    alert('Room record created and added to details list.');
  }
}
