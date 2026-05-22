import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, ChevronRight, MoreVertical } from 'lucide-angular';

export interface AnalyticsListItem {
  label: string;
  value: string | number;
  statusColor?: 'red' | 'green' | 'blue' | 'orange' | 'purple' | 'gray';
  trend?: string; // e.g. "+12%" or "-5%"
  trendType?: 'up' | 'down' | 'neutral';
}

@Component({
  selector: 'app-analytics-card',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './analytics-card.component.html',
  styleUrl: './analytics-card.component.css'
})
export class AnalyticsCardComponent {
  @Input() title = '';
  @Input() items: AnalyticsListItem[] = [];
  @Input() reportId = '';
  @Output() viewReport = new EventEmitter<string>();

  // Lucide Icons
  readonly ChevronRightIcon = ChevronRight;
  readonly MoreVerticalIcon = MoreVertical;

  onViewReport() {
    this.viewReport.emit(this.reportId);
  }

  getStatusClass(item: AnalyticsListItem): string {
    return item.statusColor ? `status-${item.statusColor}` : 'status-gray';
  }

  getTrendClass(item: AnalyticsListItem): string {
    if (!item.trendType) return '';
    return item.trendType === 'up' ? 'trend-up' : item.trendType === 'down' ? 'trend-down' : 'trend-neutral';
  }
}
