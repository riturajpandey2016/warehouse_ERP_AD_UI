import { Component, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  LucideAngularModule, 
  TrendingUp, Boxes, Building, ShieldAlert, Calendar, Download, RefreshCw, FileText
} from 'lucide-angular';

// Import modular components
import { StatCardComponent } from '../stat-card/stat-card.component';
import { AnalyticsCardComponent, AnalyticsListItem } from '../analytics-card/analytics-card.component';
import { EventLogPanelComponent } from '../event-log-panel/event-log-panel.component';
import { OrdersTableComponent } from '../orders-table/orders-table.component';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [
    CommonModule, 
    LucideAngularModule, 
    StatCardComponent, 
    AnalyticsCardComponent, 
    EventLogPanelComponent, 
    OrdersTableComponent
  ],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css'
})
export class DashboardLayoutComponent {
  @Output() navigatePage = new EventEmitter<string>();

  // Lucide Icons
  readonly TrendingUpIcon = TrendingUp;
  readonly BoxesIcon = Boxes;
  readonly BuildingIcon = Building;
  readonly ShieldAlertIcon = ShieldAlert;
  readonly CalendarIcon = Calendar;
  readonly DownloadIcon = Download;
  readonly RefreshIcon = RefreshCw;
  readonly FileTextIcon = FileText;

  // Fiscal Year select options
  selectedFy = signal('FY: 2024 - 2025');

  // Realistic analytics datasets
  inventoryStatusItems: AnalyticsListItem[] = [
    { label: 'Low Stock Items', value: 124, statusColor: 'orange' },
    { label: 'Out of Stock', value: 12, statusColor: 'red' },
    { label: 'In Transit', value: 45, statusColor: 'blue' }
  ];

  salesPerformanceItems: AnalyticsListItem[] = [
    { label: 'Today Sales', value: '₹ 4.2L', statusColor: 'green', trend: '+12.5%', trendType: 'up' },
    { label: 'Monthly Target', value: '68%', statusColor: 'blue', trend: '-2.4%', trendType: 'down' },
    { label: 'Avg Order Value', value: '₹ 12.5K', statusColor: 'purple', trend: 'Flat', trendType: 'neutral' }
  ];

  purchaseOrdersItems: AnalyticsListItem[] = [
    { label: 'Open POs', value: 32, statusColor: 'blue' },
    { label: 'Delayed Delivery', value: 5, statusColor: 'orange' },
    { label: 'Pending GRN', value: 14, statusColor: 'green' }
  ];

  handleViewReport(reportId: string) {
    console.log(`Navigating to report section: ${reportId}`);
    this.navigatePage.emit(reportId);
  }

  generateReport() {
    console.log('Generating real-time ERP performance report...');
    // Real application logic to export PDF/Excel
  }
}
