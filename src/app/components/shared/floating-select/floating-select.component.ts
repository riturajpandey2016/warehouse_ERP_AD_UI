import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-floating-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './floating-select.component.html',
  styleUrl: './floating-select.component.css'
})
export class FloatingSelectComponent {
  @Input() label: string = '';
  @Input() id: string = '';
  @Input() value: any = '';
  @Input() required: boolean = false;
  @Input() className: string = '';
  @Input() options: {label: string, value: string}[] = [];

  @HostBinding('class') get hostClass() { return this.className; }

  @Output() valueChange = new EventEmitter<string>();

  onSelectChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.value = target.value;
    this.valueChange.emit(this.value);
  }
}
