import { Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  LucideAngularModule, 
  Save, RotateCcw, ChevronRight, LayoutGrid, ShoppingCart, Calendar, Search, Plus, 
  Building2, Layers, ClipboardList, MapPin, FileText, AlertCircle, Trash2, ChevronDown, ChevronUp
} from 'lucide-angular';

import { FloatingInputComponent } from '../shared/floating-input/floating-input.component';
import { FloatingSelectComponent } from '../shared/floating-select/floating-select.component';
import { FloatingTextareaComponent } from '../shared/floating-textarea/floating-textarea.component';

interface FormData {
  date: string;
  refNo: string;
  company: string;
  ccCenter: string;
  department: string;
  projectName: string;
  projectDescription: string;
  entryType: string;
  group: string;
  deliveryAddress: string;
  productionUnit: string;
  projectCode: string;
  remarks: string;
  itemType: string;
}

interface Item {
  id: number;
  code: string;
  name: string;
  qty: number;
  rate: number;
  tax: number;
  total: number;
}

@Component({
  selector: 'app-purchase-quotation',
  standalone: true,
  imports: [
    CommonModule, 
    LucideAngularModule, 
    FloatingInputComponent, 
    FloatingSelectComponent, 
    FloatingTextareaComponent
  ],
  templateUrl: './purchase-quotation.component.html',
  styleUrl: './purchase-quotation.component.css'
})
export class PurchaseQuotationComponent {
  quotationType: WritableSignal<string> = signal('Direct');
  rateType: WritableSignal<string> = signal('Normal');
  
  sectionsExpanded = signal({
    supplier: true,
    items: true
  });

  formData: WritableSignal<FormData> = signal({
    date: new Date().toISOString().split('T')[0],
    refNo: '',
    company: '',
    ccCenter: '',
    department: '',
    projectName: '',
    projectDescription: '',
    entryType: '',
    group: '',
    deliveryAddress: '',
    productionUnit: '',
    projectCode: '',
    remarks: '',
    itemType: '',
  });

  items: WritableSignal<Item[]> = signal([
    { id: 1, code: 'ITEM-001', name: 'Premium Office Desk', qty: 5, rate: 12500, tax: 18, total: 62500 },
    { id: 2, code: 'ITEM-042', name: 'Ergonomic Chair Pro', qty: 12, rate: 8400, tax: 18, total: 100800 }
  ]);

  // Icons
  readonly LayoutGridIcon = LayoutGrid;
  readonly ChevronRightIcon = ChevronRight;
  readonly ShoppingCartIcon = ShoppingCart;
  readonly SaveIcon = Save;
  readonly RotateCcwIcon = RotateCcw;
  readonly CalendarIcon = Calendar;
  readonly LayersIcon = Layers;
  readonly FileTextIcon = FileText;
  readonly ClipboardListIcon = ClipboardList;
  readonly Building2Icon = Building2;
  readonly ChevronDownIcon = ChevronDown;
  readonly ChevronUpIcon = ChevronUp;
  readonly SearchIcon = Search;
  readonly PlusIcon = Plus;
  readonly Trash2Icon = Trash2;
  readonly AlertCircleIcon = AlertCircle;
  readonly MapPinIcon = MapPin;

  toggleSection(section: 'supplier' | 'items') {
    this.sectionsExpanded.update(prev => ({ ...prev, [section]: !prev[section] }));
  }

  handleInputChange(field: keyof FormData, value: string) {
    this.formData.update(prev => ({ ...prev, [field]: value }));
  }

  setQuotationType(type: string) {
    this.quotationType.set(type);
  }

  setRateType(type: string) {
    this.rateType.set(type);
  }

  handleReset() {
    this.formData.set({
      date: new Date().toISOString().split('T')[0],
      refNo: '',
      company: '',
      ccCenter: '',
      department: '',
      projectName: '',
      projectDescription: '',
      entryType: '',
      group: '',
      deliveryAddress: '',
      productionUnit: '',
      projectCode: '',
      remarks: '',
      itemType: '',
    });
    this.quotationType.set('Direct');
    this.rateType.set('Normal');
  }
}
