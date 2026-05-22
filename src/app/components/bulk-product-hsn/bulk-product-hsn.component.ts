import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Search } from 'lucide-angular';

import { BulkProductHsnTableComponent } from '../bulk-product-hsn-table/bulk-product-hsn-table.component';

@Component({
  selector: 'app-bulk-product-hsn',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    LucideAngularModule,
    BulkProductHsnTableComponent
  ],
  templateUrl: './bulk-product-hsn.component.html',
  styleUrl: './bulk-product-hsn.component.css'
})
export class BulkProductHsnComponent {
  readonly SearchIcon = Search;
}
