import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  LucideAngularModule, 
  ChevronDown, 
  ChevronUp, 
  Search,
  Trash,
  Edit2,
  Filter,
  CheckCircle2,
  Power
} from 'lucide-angular';

export interface BinSubLevel {
  id: string;
  name: string;
  description: string;
  parentSubLevel1: string; // If Sub Level 2, links to parent
  entryBy: string;
  entryDate: string;
  isActive: boolean;
}

@Component({
  selector: 'app-bin-sub-level',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './bin-sub-level.component.html',
  styleUrl: './bin-sub-level.component.css'
})
export class BinSubLevelComponent {
  readonly ChevronDownIcon = ChevronDown;
  readonly ChevronUpIcon = ChevronUp;
  readonly SearchIcon = Search;
  readonly TrashIcon = Trash;
  readonly EditIcon = Edit2;
  readonly FilterIcon = Filter;
  readonly ActiveIcon = CheckCircle2;
  readonly PowerIcon = Power;

  // Accordion Expand/Collapse state
  showEntryPanel = signal<boolean>(true);

  // Form Fields
  subLevelType = signal<'1' | '2'>('1'); // '1' = Sub Level 1, '2' = Sub Level 2
  subLevelName = signal<string>('');
  subLevelDescription = signal<string>('');
  selectedParentId = signal<string>('');

  // Table Grid Search Filter Fields
  filterName = signal<string>('');
  filterDesc = signal<string>('');
  filterParent = signal<string>('');
  filterEmployee = signal<string>('');

  // Sub Level Database List
  subLevelsList = signal<BinSubLevel[]>([
    { id: '1', name: 'Cartoon', description: 'Cartoon packaging container', parentSubLevel1: '', entryBy: 'Siddharta Dikshit', entryDate: '24 Jun 2025', isActive: true },
    { id: '2', name: 'Box', description: 'Box container storage', parentSubLevel1: 'Cartoon', entryBy: 'Siddharta Dikshit', entryDate: '24 Jun 2025', isActive: true },
    { id: '3', name: 'Packet', description: 'Packet pouches', parentSubLevel1: 'Cartoon', entryBy: 'Siddharta Dikshit', entryDate: '26 Jun 2025', isActive: true },
    { id: '4', name: 'Box', description: 'Heavy wooden box packaging', parentSubLevel1: '', entryBy: 'Siddharta Dikshit', entryDate: '26 Jun 2025', isActive: true },
    { id: '5', name: 'Jar', description: 'Jar containers', parentSubLevel1: 'Barrel', entryBy: 'Siddharta Dikshit', entryDate: '26 Jun 2025', isActive: true },
    { id: '6', name: 'Barrel', description: 'Industrial barrels', parentSubLevel1: '', entryBy: 'Siddharta Dikshit', entryDate: '09 Jul 2025', isActive: true }
  ]);

  filteredSubLevelsList = signal<BinSubLevel[]>([
    { id: '1', name: 'Cartoon', description: 'Cartoon packaging container', parentSubLevel1: '', entryBy: 'Siddharta Dikshit', entryDate: '24 Jun 2025', isActive: true },
    { id: '2', name: 'Box', description: 'Box container storage', parentSubLevel1: 'Cartoon', entryBy: 'Siddharta Dikshit', entryDate: '24 Jun 2025', isActive: true },
    { id: '3', name: 'Packet', description: 'Packet pouches', parentSubLevel1: 'Cartoon', entryBy: 'Siddharta Dikshit', entryDate: '26 Jun 2025', isActive: true },
    { id: '4', name: 'Box', description: 'Heavy wooden box packaging', parentSubLevel1: '', entryBy: 'Siddharta Dikshit', entryDate: '26 Jun 2025', isActive: true },
    { id: '5', name: 'Jar', description: 'Jar containers', parentSubLevel1: 'Barrel', entryBy: 'Siddharta Dikshit', entryDate: '26 Jun 2025', isActive: true },
    { id: '6', name: 'Barrel', description: 'Industrial barrels', parentSubLevel1: '', entryBy: 'Siddharta Dikshit', entryDate: '09 Jul 2025', isActive: true }
  ]);

  // Edit Mode state
  isEditMode = signal<boolean>(false);
  editId = signal<string>('');

  toggleEntryPanel() { this.showEntryPanel.update(v => !v); }

  // Computed helper to get available parent Sub Level 1 choices
  getParentChoices() {
    return this.subLevelsList().filter(s => !s.parentSubLevel1);
  }

  saveSubLevel() {
    if (!this.subLevelName() || !this.subLevelDescription()) {
      alert('Please fill out Name and Description.');
      return;
    }

    if (this.subLevelType() === '2' && !this.selectedParentId()) {
      alert('Please select a parent Sub Level 1.');
      return;
    }

    let parentName = '';
    if (this.subLevelType() === '2') {
      const parentObj = this.subLevelsList().find(s => s.id === this.selectedParentId());
      if (parentObj) parentName = parentObj.name;
    }

    if (this.isEditMode()) {
      // Update
      this.subLevelsList.update(list => list.map(item => {
        if (item.id === this.editId()) {
          return {
            ...item,
            name: this.subLevelName(),
            description: this.subLevelDescription(),
            parentSubLevel1: parentName
          };
        }
        return item;
      }));
      alert('Sub Level updated successfully!');
    } else {
      // Insert
      const newId = (this.subLevelsList().length + 1).toString();
      const newItem: BinSubLevel = {
        id: newId,
        name: this.subLevelName(),
        description: this.subLevelDescription(),
        parentSubLevel1: parentName,
        entryBy: 'Siddharta Dikshit',
        entryDate: '19 May 2026',
        isActive: true
      };
      this.subLevelsList.update(list => [newItem, ...list]);
      alert('Sub Level saved successfully!');
    }

    this.resetForm();
    this.onFilterChange();
  }

  editSubLevel(item: BinSubLevel) {
    this.isEditMode.set(true);
    this.editId.set(item.id);
    this.subLevelName.set(item.name);
    this.subLevelDescription.set(item.description);

    if (item.parentSubLevel1) {
      this.subLevelType.set('2');
      const parentObj = this.subLevelsList().find(s => s.name === item.parentSubLevel1 && !s.parentSubLevel1);
      if (parentObj) this.selectedParentId.set(parentObj.id);
    } else {
      this.subLevelType.set('1');
      this.selectedParentId.set('');
    }
  }

  deleteSubLevel(id: string) {
    if (confirm('Are you sure you want to delete this Sub Level entry?')) {
      this.subLevelsList.update(list => list.filter(item => item.id !== id));
      this.onFilterChange();
    }
  }

  toggleStatus(id: string) {
    this.subLevelsList.update(list => list.map(item => {
      if (item.id === id) {
        return { ...item, isActive: !item.isActive };
      }
      return item;
    }));
    this.onFilterChange();
  }

  resetForm() {
    this.isEditMode.set(false);
    this.editId.set('');
    this.subLevelName.set('');
    this.subLevelDescription.set('');
    this.selectedParentId.set('');
    this.subLevelType.set('1');
  }

  onFilterChange() {
    let result = this.subLevelsList();

    if (this.filterName()) {
      result = result.filter(item => item.name.toLowerCase().includes(this.filterName().toLowerCase()));
    }
    if (this.filterDesc()) {
      result = result.filter(item => item.description.toLowerCase().includes(this.filterDesc().toLowerCase()));
    }
    if (this.filterParent()) {
      result = result.filter(item => item.parentSubLevel1.toLowerCase().includes(this.filterParent().toLowerCase()));
    }
    if (this.filterEmployee()) {
      result = result.filter(item => item.entryBy.toLowerCase().includes(this.filterEmployee().toLowerCase()));
    }

    this.filteredSubLevelsList.set(result);
  }
}
