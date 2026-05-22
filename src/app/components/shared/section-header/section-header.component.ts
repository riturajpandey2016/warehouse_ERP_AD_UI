import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, ChevronUp, ChevronDown } from 'lucide-angular';

@Component({
  selector: 'app-section-header',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './section-header.component.html',
  styleUrl: './section-header.component.css'
})
export class SectionHeaderComponent {
  @Input() title: string = '';
  @Input() expanded: boolean = true;
  @Input() blue: boolean = false;

  @Output() toggle = new EventEmitter<void>();

  readonly ChevronUpIcon = ChevronUp;
  readonly ChevronDownIcon = ChevronDown;

  onToggle() {
    this.toggle.emit();
  }
}
