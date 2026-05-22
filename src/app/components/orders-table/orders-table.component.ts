import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Search, ArrowRight, Eye, ShieldAlert } from 'lucide-angular';

export interface PendingOrder {
  orderId: string;
  partyName: string;
  value: string;
  numericValue: number;
  status: 'PENDING APPROVAL' | 'IN TRANSIT' | 'PROCESSING' | 'HOLD';
  date: string;
}

@Component({
  selector: 'app-orders-table',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './orders-table.component.html',
  styleUrl: './orders-table.component.css'
})
export class OrdersTableComponent {
  // Lucide Icons
  readonly SearchIcon = Search;
  readonly ArrowRightIcon = ArrowRight;
  readonly EyeIcon = Eye;
  readonly ShieldAlertIcon = ShieldAlert;

  // Realistic high value orders data inspired by the image
  orders = signal<PendingOrder[]>([
    {
      orderId: 'SO-2024-0892',
      partyName: 'RELIANCE INDUSTRIES LTD',
      value: '₹ 14,25,000',
      numericValue: 1425000,
      status: 'PENDING APPROVAL',
      date: 'May 18, 2026 14:30'
    },
    {
      orderId: 'SO-2024-1143',
      partyName: 'GLOBAL TECH SOLUTIONS',
      value: '₹ 8,42,000',
      numericValue: 842000,
      status: 'IN TRANSIT',
      date: 'May 18, 2026 12:15'
    },
    {
      orderId: 'SO-2024-0985',
      partyName: 'ADANI ENTERPRISES LTD',
      value: '₹ 22,10,000',
      numericValue: 2210000,
      status: 'PENDING APPROVAL',
      date: 'May 18, 2026 10:45'
    },
    {
      orderId: 'SO-2024-1210',
      partyName: 'TATA CONSULTANCY SERVICES',
      value: '₹ 6,15,000',
      numericValue: 615000,
      status: 'PROCESSING',
      date: 'May 18, 2026 09:30'
    },
    {
      orderId: 'SO-2024-1054',
      partyName: 'INFOSYS TECHNOLOGIES',
      value: '₹ 11,80,000',
      numericValue: 1180000,
      status: 'HOLD',
      date: 'May 17, 2026 17:20'
    }
  ]);

  getStatusClass(status: string): string {
    switch (status) {
      case 'PENDING APPROVAL':
        return 'status-pending';
      case 'IN TRANSIT':
        return 'status-transit';
      case 'PROCESSING':
        return 'status-processing';
      case 'HOLD':
        return 'status-hold';
      default:
        return 'status-neutral';
    }
  }

  getActionText(status: string): string {
    return status === 'PENDING APPROVAL' ? 'REVIEW' : 'TRACK';
  }

  handleAction(order: PendingOrder) {
    console.log(`Handling action for order ${order.orderId} (Status: ${order.status})`);
    // Real-world implementation would route or open a modal
  }
}
