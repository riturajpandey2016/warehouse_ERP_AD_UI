import { Component, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, ChevronDown, ChevronUp } from 'lucide-angular';

import { ShelfTableComponent } from '../shelf-table/shelf-table.component';

@Component({
  selector: 'app-shelf-entry',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    LucideAngularModule, 
    ShelfTableComponent
  ],
  templateUrl: './shelf-entry.component.html',
  styleUrl: './shelf-entry.component.css'
})
export class ShelfEntryComponent {
  readonly ChevronDownIcon = ChevronDown;
  readonly ChevronUpIcon = ChevronUp;

  // Signal state for accordion
  showConfig = signal<boolean>(true);

  // Form Fields
  selectedCcCenter = signal<string>('Head Office');
  selectedStore = signal<string>('ILICO Store');
  selectedRoom = signal<string>('Room 1');
  shelfType = signal<string>('');
  description = signal<string>('');

  @ViewChild('shelfTable') shelfTable!: ShelfTableComponent;

  toggleConfig() {
    this.showConfig.update(v => !v);
  }

  resetForm() {
    this.selectedCcCenter.set('Head Office');
    this.selectedStore.set('ILICO Store');
    this.selectedRoom.set('Room 1');
    this.shelfType.set('');
    this.description.set('');
  }

  saveShelf() {
    if (!this.shelfType()) {
      alert('Please fill out Shelf input field.');
      return;
    }

    if (this.shelfTable) {
      this.shelfTable.addShelfRecord({
        ccCenter: this.selectedCcCenter(),
        store: this.selectedStore(),
        room: this.selectedRoom(),
        shelf: this.shelfType(),
        description: this.description() || this.shelfType()
      });
    }

    this.resetForm();
    alert('Shelf record created and added to details list.');
  }
}
