import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-erp-toggle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './erp-toggle.component.html',
  styleUrl: './erp-toggle.component.css'
})
export class ErpToggleComponent {
  @Input() label: string = '';
  @Input() checked: boolean = false;
  @Input() width: string = 'w-40';

  @Output() checkedChange = new EventEmitter<boolean>();

  toggle() {
    this.checked = !this.checked;
    this.checkedChange.emit(this.checked);
  }
}
