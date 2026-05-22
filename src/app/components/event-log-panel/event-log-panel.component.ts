import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Clock, RefreshCw, CheckCircle2 } from 'lucide-angular';

export interface EventLog {
  id: number;
  userRole: string;
  action: string;
  category: 'ORGANIZATION' | 'INVENTORY' | 'SYSTEM' | 'SALES' | 'PURCHASE';
  time: string;
  status: 'info' | 'success' | 'warning' | 'danger';
}

@Component({
  selector: 'app-event-log-panel',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './event-log-panel.component.html',
  styleUrl: './event-log-panel.component.css'
})
export class EventLogPanelComponent {
  // Lucide Icons
  readonly ClockIcon = Clock;
  readonly RefreshIcon = RefreshCw;
  readonly CheckIcon = CheckCircle2;

  // Realistic hardcoded ERP event log data
  logs = signal<EventLog[]>([
    {
      id: 1,
      userRole: 'ADMIN',
      action: 'Created New State Master "Karnataka" parameters',
      category: 'ORGANIZATION',
      time: '10 mins ago',
      status: 'info'
    },
    {
      id: 2,
      userRole: 'STORE_MANAGER',
      action: 'Approved Requisition #REQ-402 for warehouse inventory allocation',
      category: 'INVENTORY',
      time: '25 mins ago',
      status: 'success'
    },
    {
      id: 3,
      userRole: 'SYSTEM',
      action: 'Daily Cloud Backup & Database Compression Completed Successfully',
      category: 'SYSTEM',
      time: '1 hour ago',
      status: 'success'
    },
    {
      id: 4,
      userRole: 'SALES_EXEC',
      action: 'Invoice generated #INV-2024-001 for Reliance Industries Ltd',
      category: 'SALES',
      time: '2 hours ago',
      status: 'info'
    },
    {
      id: 5,
      userRole: 'PURCHASE_MGR',
      action: 'Delayed Delivery Warning triggered for vendor "Global Tech Solutions"',
      category: 'PURCHASE',
      time: '4 hours ago',
      status: 'warning'
    },
    {
      id: 6,
      userRole: 'SYSTEM',
      action: 'High latency detected during background index defragmentation',
      category: 'SYSTEM',
      time: '5 hours ago',
      status: 'danger'
    },
    {
      id: 7,
      userRole: 'ADMIN',
      action: 'Modified roles & permissions profile for STORE_OPERATOR group',
      category: 'ORGANIZATION',
      time: '1 day ago',
      status: 'info'
    }
  ]);

  refreshLogs() {
    console.log('Refreshing event logs...');
    // Simulated refresh
  }

  getCategoryClass(category: string): string {
    return `category-${category.toLowerCase()}`;
  }

  getStatusClass(status: string): string {
    return `status-${status}`;
  }
}
