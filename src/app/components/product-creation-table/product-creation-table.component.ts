import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Filter, Edit2 } from 'lucide-angular';

interface ProductCreationData {
  id: string;
  image: string;
  itemName: string;
  itemCode: string;
  partNo: string;
  unitGroup: string;
  group: string;
  itemType: string;
  hsn: string;
  taxType: string;
  type: string;
}

@Component({
  selector: 'app-product-creation-table',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './product-creation-table.component.html',
  styleUrl: './product-creation-table.component.css'
})
export class ProductCreationTableComponent {
  readonly FilterIcon = Filter;
  readonly EditIcon = Edit2;

  // Modern HSL tailoring for inline SVG data URLs to represent product categories perfectly
  data = signal<ProductCreationData[]>([
    {
      id: '1',
      image: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%237a9cc5"><rect width="24" height="24" fill="%23f1f5f9"/><path d="M12 2C8.69 2 6 4.69 6 8v4c0 3.31 2.69 6 6 6s6-2.69 6-6V8c0-3.31-2.69-6-6-6zm0 18c-3.86 0-7 1.14-7 2.5V23h14v-.5c0-1.36-3.14-2.5-7-2.5z"/></svg>',
      itemName: 'Mouse',
      itemCode: 'AST/LAP/0002',
      partNo: '',
      unitGroup: 'PCS',
      group: 'ASSETS',
      itemType: 'Laptop',
      hsn: '3917 (18.00%)',
      taxType: 'Non Zero Rated',
      type: 'HSN'
    },
    {
      id: '2',
      image: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%237a9cc5"><rect width="24" height="24" fill="%23f1f5f9"/><path d="M20 18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z"/></svg>',
      itemName: 'Laptop',
      itemCode: 'AST/LAP/0001',
      partNo: '',
      unitGroup: 'PCS',
      group: 'ASSETS',
      itemType: 'Laptop',
      hsn: '84713020 (18.00%)',
      taxType: 'Non Zero Rated',
      type: 'HSN'
    },
    {
      id: '3',
      image: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%237a9cc5"><rect width="24" height="24" fill="%23f1f5f9"/><path d="M19 13H5V5h14v8zm-2-6H7v4h10V7zm3 8H4v2h16v-2zm-3 4H7v2h10v-2z"/></svg>',
      itemName: 'Chairs',
      itemCode: 'AST/FUR/0001',
      partNo: '',
      unitGroup: 'PCS',
      group: 'ASSETS',
      itemType: 'FURNITURE',
      hsn: '94013000 (18.00%)',
      taxType: 'Non Zero Rated',
      type: 'HSN'
    },
    {
      id: '4',
      image: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23475569"><rect width="24" height="24" fill="%23f1f5f9"/><path d="M19 2H5v3h14V2zM5 20c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V7H5v13zm3-9h8v2H8v-2z"/></svg>',
      itemName: 'Milky Mist Greek Yogurt, 100 g',
      itemCode: 'DAIRY/YHT/00001',
      partNo: '',
      unitGroup: 'PCS',
      group: 'DAIRY',
      itemType: 'Yoghurt',
      hsn: '04031010 (5.00%)',
      taxType: 'Non Zero Rated',
      type: 'HSN'
    },
    {
      id: '5',
      image: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23475569"><rect width="24" height="24" fill="%23f1f5f9"/><path d="M19 2H5v3h14V2zM5 20c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V7H5v13zm3-9h8v2H8v-2z"/></svg>',
      itemName: 'Cremberie Plain Natural Yoghurt 1 kg (Tub)',
      itemCode: 'DAIRY/YHT/00002',
      partNo: '',
      unitGroup: 'PCS',
      group: 'DAIRY',
      itemType: 'Yoghurt',
      hsn: '04031010 (5.00%)',
      taxType: 'Non Zero Rated',
      type: 'HSN'
    },
    {
      id: '6',
      image: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23eab308"><rect width="24" height="24" fill="%23f1f5f9"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.04-.42 1.99-1.07 2.25z"/></svg>',
      itemName: 'Butter - Pasteurized, 100 gm',
      itemCode: 'DAIRY/BTR/00001',
      partNo: '',
      unitGroup: 'PCS',
      group: 'DAIRY',
      itemType: 'Butter',
      hsn: '04051010 (5.00%)',
      taxType: 'Non Zero Rated',
      type: 'HSN'
    },
    {
      id: '7',
      image: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23eab308"><rect width="24" height="24" fill="%23f1f5f9"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.04-.42 1.99-1.07 2.25z"/></svg>',
      itemName: 'Butter - Pasteurized, 500 gm',
      itemCode: 'DAIRY/BTR/00002',
      partNo: '',
      unitGroup: 'PCS',
      group: 'DAIRY',
      itemType: 'Butter',
      hsn: '04051010 (5.00%)',
      taxType: 'Non Zero Rated',
      type: 'HSN'
    },
    {
      id: '8',
      image: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%2364748b"><rect width="24" height="24" fill="%23f1f5f9"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2v-6zm0 8h2v2h-2v-2z"/></svg>',
      itemName: 'Cow Milk',
      itemCode: 'RAW/MLK/00001',
      partNo: '',
      unitGroup: 'Litre Unit',
      group: 'RAW MATERIALS',
      itemType: 'Milk',
      hsn: '04011000 (0.00%)',
      taxType: 'Exempted',
      type: 'HSN'
    }
  ]);
}
