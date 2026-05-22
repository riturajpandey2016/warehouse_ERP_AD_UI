import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-floating-textarea',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './floating-textarea.component.html',
  styleUrl: './floating-textarea.component.css'
})
export class FloatingTextareaComponent {
  @Input() label: string = '';
  @Input() id: string = '';
  @Input() value: string = '';
  @Input() required: boolean = false;
  @Input() rows: number = 2;
  @Input() className: string = '';

  @HostBinding('class') get hostClass() { return this.className; }

  @Output() valueChange = new EventEmitter<string>();

  onTextareaChange(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    this.value = target.value;
    this.valueChange.emit(this.value);
  }
}
