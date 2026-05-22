import { Component, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, FileText, Plus, ChevronDown, ChevronUp, Search, X } from 'lucide-angular';

import { ProductJournalTableComponent } from '../product-journal-table/product-journal-table.component';

@Component({
  selector: 'app-product-journal',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    LucideAngularModule, 
    ProductJournalTableComponent
  ],
  templateUrl: './product-journal.component.html',
  styleUrl: './product-journal.component.css'
})
export class ProductJournalComponent {
  readonly FileTextIcon = FileText;
  readonly PlusIcon = Plus;
  readonly ChevronDownIcon = ChevronDown;
  readonly ChevronUpIcon = ChevronUp;
  readonly SearchIcon = Search;
  readonly XIcon = X;

  showFilters = signal<boolean>(true);
  showDatabase = signal<boolean>(true);
  showNewModal = signal<boolean>(false);

  @ViewChild('journalTable') journalTable!: ProductJournalTableComponent;

  toggleFilters() {
    this.showFilters.update(v => !v);
  }

  toggleDatabase() {
    this.showDatabase.update(v => !v);
  }

  openNewJournalModal() {
    this.showNewModal.set(true);
  }

  closeNewModal() {
    this.showNewModal.set(false);
  }

  submitJournal(type: string, name: string, location: string, qty: string, unit: string) {
    if (!name || !qty) {
      alert('Please fill out Name and Quantity fields.');
      return;
    }

    if (this.journalTable) {
      this.journalTable.addRecord({
        type: type as any,
        productName: name,
        location: location || 'Warehouse Store',
        qty: qty,
        unit: unit || 'UNITS'
      });
    }

    this.closeNewModal();
  }
}
