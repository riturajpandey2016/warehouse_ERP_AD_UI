import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './stat-card.component.html',
  styleUrl: './stat-card.component.css'
})
export class StatCardComponent {
  @Input() title = '';
  @Input() value = '';
  @Input() trendText = '';
  @Input() trendType: 'up' | 'down' | 'neutral' | 'critical' = 'neutral';
  @Input() icon: any;
  @Input() themeColor: 'blue' | 'green' | 'orange' | 'red' | 'purple' = 'blue';

  getTrendClass(): string {
    switch (this.trendType) {
      case 'up':
        return 'trend-up';
      case 'down':
        return 'trend-down';
      case 'critical':
        return 'trend-critical';
      default:
        return 'trend-neutral';
    }
  }

  getThemeClass(): string {
    return `theme-${this.themeColor}`;
  }
}
