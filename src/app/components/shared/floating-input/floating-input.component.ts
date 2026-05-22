import { Component, Input, Output, EventEmitter, HostBinding, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-floating-input',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './floating-input.component.html',
  styleUrl: './floating-input.component.css'
})
export class FloatingInputComponent {
  @Input() label: string = '';
  @Input() id: string = '';
  @Input() type: string = 'text';
  @Input() value: string = '';
  @Input() required: boolean = false;
  @Input() placeholder: string = ' ';
  @Input() className: string = '';
  @Input() icon: any = null;

  @HostBinding('class') get hostClass() { return this.className; }

  @Output() valueChange = new EventEmitter<string>();

  onInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.valueChange.emit(this.value);
  }
}
