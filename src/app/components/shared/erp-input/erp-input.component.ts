import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-erp-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './erp-input.component.html',
  styleUrl: './erp-input.component.css'
})
export class ErpInputComponent {
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() value: any = '';
  @Input() required: boolean = false;
  @Input() width: string = 'w-40';

  @Output() valueChange = new EventEmitter<string>();

  onInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.valueChange.emit(this.value);
  }
}
