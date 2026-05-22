import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-erp-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './erp-select.component.html',
  styleUrl: './erp-select.component.css'
})
export class ErpSelectComponent {
  @Input() label: string = '';
  @Input() required: boolean = false;
  @Input() width: string = 'w-40';
  @Input() value: any = '';
  @Input() options: {label: string, value: string}[] = [];

  @Output() valueChange = new EventEmitter<string>();

  onSelectChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.value = target.value;
    this.valueChange.emit(this.value);
  }
}
