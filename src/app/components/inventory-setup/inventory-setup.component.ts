import { Component, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface LevelData {
  id: string;
  name: string;
}

@Component({
  selector: 'app-inventory-setup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inventory-setup.component.html',
  styleUrl: './inventory-setup.component.css'
})
export class InventorySetupComponent {
  baseLevel = signal('Store');
  numLevels = signal(3);
  
  levels = signal<LevelData[]>([
    { id: '1', name: 'Room' },
    { id: '2', name: 'Shelf' },
    { id: '3', name: 'Rack' }
  ]);

  constructor() {
    // Effect to adjust the number of levels in the array based on numLevels input
    effect(() => {
      const currentCount = this.numLevels();
      const currentLevels = this.levels();
      
      if (currentCount > currentLevels.length) {
        // Add more levels
        const newLevels = [...currentLevels];
        for (let i = currentLevels.length; i < currentCount; i++) {
          newLevels.push({ id: (i + 1).toString(), name: '' });
        }
        this.levels.set(newLevels);
      } else if (currentCount < currentLevels.length && currentCount > 0) {
        // Remove levels
        this.levels.set(currentLevels.slice(0, currentCount));
      }
    }, { allowSignalWrites: true });
  }

  updateBaseLevel(value: string) {
    this.baseLevel.set(value);
  }

  updateNumLevels(value: string) {
    const num = parseInt(value, 10);
    if (!isNaN(num) && num > 0 && num <= 20) {
      this.numLevels.set(num);
    }
  }

  updateLevelName(index: number, name: string) {
    this.levels.update(prev => {
      const updated = [...prev];
      if (updated[index]) {
        updated[index].name = name;
      }
      return updated;
    });
  }

  handleReset() {
    this.baseLevel.set('Store');
    this.numLevels.set(3);
    this.levels.set([
      { id: '1', name: 'Room' },
      { id: '2', name: 'Shelf' },
      { id: '3', name: 'Rack' }
    ]);
  }
}
