import { Component, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  LucideAngularModule, 
  Menu, Bell, Settings, LogOut, Home, Layout, FileText, User, ChevronDown
} from 'lucide-angular';

@Component({
  selector: 'app-top-navbar',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './top-navbar.component.html',
  styleUrl: './top-navbar.component.css'
})
export class TopNavbarComponent {
  @Output() toggleSidebar = new EventEmitter<void>();
  @Output() navigate = new EventEmitter<string>();

  // Active navigation tab
  activeTab = signal('home');

  // Notification count
  notificationCount = signal(5);

  // Lucide Icons
  readonly MenuIcon = Menu;
  readonly BellIcon = Bell;
  readonly SettingsIcon = Settings;
  readonly LogOutIcon = LogOut;
  readonly HomeIcon = Home;
  readonly LayoutIcon = Layout;
  readonly FileTextIcon = FileText;
  readonly UserIcon = User;
  readonly ChevronDownIcon = ChevronDown;

  selectTab(tabId: string) {
    this.activeTab.set(tabId);
    this.navigate.emit(tabId);
  }

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }

  logout() {
    console.log('Logging out...');
    // In a real app, handle logout logic here
  }
}
