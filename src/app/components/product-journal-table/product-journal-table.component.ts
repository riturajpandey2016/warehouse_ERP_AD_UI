import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  LucideAngularModule, 
  Search, 
  Filter, 
  Download, 
  Calendar, 
  ArrowDownLeft, 
  ArrowUpRight, 
  Box, 
  MapPin, 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  Eye, 
  Edit2, 
  Copy, 
  Trash 
} from 'lucide-angular';

export interface JournalRecord {
  id: string;
  journalId: string;
  date: string;
  type: 'STOCK IN' | 'STOCK OUT';
  productName: string;
  location: string;
  qty: string;
  unit: string;
  status: 'COMPLETED' | 'PENDING' | 'CANCELLED';
}

@Component({
  selector: 'app-product-journal-table',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './product-journal-table.component.html',
  styleUrl: './product-journal-table.component.css'
})
export class ProductJournalTableComponent {
  readonly SearchIcon = Search;
  readonly FilterIcon = Filter;
  readonly DownloadIcon = Download;
  readonly CalendarIcon = Calendar;
  readonly ArrowDownLeftIcon = ArrowDownLeft;
  readonly ArrowUpRightIcon = ArrowUpRight;
  readonly BoxIcon = Box;
  readonly MapPinIcon = MapPin;
  readonly CheckCircleIcon = CheckCircle;
  readonly AlertCircleIcon = AlertCircle;
  readonly XCircleIcon = XCircle;
  readonly EyeIcon = Eye;
  readonly EditIcon = Edit2;
  readonly CopyIcon = Copy;
  readonly TrashIcon = Trash;

  // Mock list populated matching original screenshot items
  data = signal<JournalRecord[]>([
    { id: '1', journalId: 'PJ-2024-001', date: '10 MAY 2024', type: 'STOCK IN', productName: 'COMMERCIAL KITCHEN OVEN', location: 'MUMBAI CENTRAL', qty: '5', unit: 'UNITS', status: 'COMPLETED' },
    { id: '2', journalId: 'PJ-2024-002', date: '11 MAY 2024', type: 'STOCK OUT', productName: 'STAINLESS STEEL PREP TABLE', location: 'NEW DELHI HUB', qty: '12', unit: 'UNITS', status: 'COMPLETED' },
    { id: '3', journalId: 'PJ-2024-003', date: '12 MAY 2024', type: 'STOCK IN', productName: 'INDUSTRIAL REFRIGERATOR', location: 'BANGALORE STORE', qty: '3', unit: 'UNITS', status: 'PENDING' },
    { id: '4', journalId: 'PJ-2024-004', date: '13 MAY 2024', type: 'STOCK OUT', productName: 'CHEF KNIVES SET', location: 'CHENNAI', qty: '25', unit: 'SETS', status: 'CANCELLED' }
  ]);

  addRecord(record: { type: 'STOCK IN' | 'STOCK OUT'; productName: string; location: string; qty: string; unit: string }) {
    const nextNum = this.data().length + 1;
    const padding = nextNum < 10 ? '00' : nextNum < 100 ? '0' : '';
    const newJournalId = `PJ-2026-${padding}${nextNum}`;
    const today = new Date();
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const formattedDate = `${today.getDate()} ${months[today.getMonth()]} ${today.getFullYear()}`;

    const newObj: JournalRecord = {
      id: nextNum.toString(),
      journalId: newJournalId,
      date: formattedDate,
      type: record.type,
      productName: record.productName.toUpperCase(),
      location: record.location.toUpperCase(),
      qty: record.qty,
      unit: record.unit.toUpperCase(),
      status: 'PENDING'
    };

    this.data.update(records => [...records, newObj]);
  }

  deleteRecord(id: string) {
    this.data.update(records => records.filter(item => item.id !== id));
  }
}
