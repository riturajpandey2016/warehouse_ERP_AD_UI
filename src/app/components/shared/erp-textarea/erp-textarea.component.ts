import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-erp-textarea',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './erp-textarea.component.html',
  styleUrl: './erp-textarea.component.css'
})
export class ErpTextareaComponent {
  @Input() label: string = '';
  @Input() required: boolean = false;
  @Input() rows: number = 2;
  @Input() width: string = 'w-40';
  @Input() value: string = '';

  @Output() valueChange = new EventEmitter<string>();

  onTextareaChange(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    this.value = target.value;
    this.valueChange.emit(this.value);
  }
}
