import { Component, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, ChevronDown, ChevronUp } from 'lucide-angular';

import { RackTableComponent } from '../rack-table/rack-table.component';

@Component({
  selector: 'app-rack-entry',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    LucideAngularModule, 
    RackTableComponent
  ],
  templateUrl: './rack-entry.component.html',
  styleUrl: './rack-entry.component.css'
})
export class RackEntryComponent {
  readonly ChevronDownIcon = ChevronDown;
  readonly ChevronUpIcon = ChevronUp;

  // Signal state for accordion
  showConfig = signal<boolean>(true);

  // Form Fields
  selectedCcCenter = signal<string>('Head Office');
  selectedStore = signal<string>('ILICO Store');
  selectedRoom = signal<string>('Room 1');
  selectedShelf = signal<string>('Shelf 1');
  rackType = signal<string>('');
  description = signal<string>('');

  @ViewChild('rackTable') rackTable!: RackTableComponent;

  toggleConfig() {
    this.showConfig.update(v => !v);
  }

  resetForm() {
    this.selectedCcCenter.set('Head Office');
    this.selectedStore.set('ILICO Store');
    this.selectedRoom.set('Room 1');
    this.selectedShelf.set('Shelf 1');
    this.rackType.set('');
    this.description.set('');
  }

  saveRack() {
    if (!this.rackType()) {
      alert('Please fill out Rack input field.');
      return;
    }

    if (this.rackTable) {
      this.rackTable.addRackRecord({
        ccCenter: this.selectedCcCenter(),
        store: this.selectedStore(),
        room: this.selectedRoom(),
        shelf: this.selectedShelf(),
        rack: this.rackType(),
        description: this.description() || this.rackType()
      });
    }

    this.resetForm();
    alert('Rack record created and added to details list.');
  }
}
