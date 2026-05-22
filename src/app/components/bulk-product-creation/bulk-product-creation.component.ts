import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bulk-product-creation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bulk-product-creation.component.html',
  styleUrl: './bulk-product-creation.component.css'
})
export class BulkProductCreationComponent {
  selectedFile: File | null = null;

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }
}
