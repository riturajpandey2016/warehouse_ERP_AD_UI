import { Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  LucideAngularModule, 
  Database, RotateCcw, CheckCircle2, HardDrive, FolderOpen, FileCode, AlertCircle 
} from 'lucide-angular';

import { ErpInputComponent } from '../shared/erp-input/erp-input.component';
import { SectionHeaderComponent } from '../shared/section-header/section-header.component';

interface BackupForm {
  driveDirectory: string;
  folderName: string;
  fileName: string;
}

@Component({
  selector: 'app-database-backup',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    LucideAngularModule, 
    ErpInputComponent, 
    SectionHeaderComponent
  ],
  templateUrl: './database-backup.component.html',
  styleUrl: './database-backup.component.css'
})
export class DatabaseBackupComponent {
  sections = signal({
    details: true
  });

  formData: WritableSignal<BackupForm> = signal({
    driveDirectory: 'Drive',
    folderName: 'Database BackUp',
    fileName: 'File Name',
  });

  isBackingUp: WritableSignal<boolean> = signal(false);
  backupStatus: WritableSignal<'idle' | 'success' | 'error'> = signal('idle');

  // Icons
  readonly DatabaseIcon = Database;
  readonly RotateCcwIcon = RotateCcw;
  readonly CheckCircle2Icon = CheckCircle2;
  readonly HardDriveIcon = HardDrive;
  readonly FolderOpenIcon = FolderOpen;
  readonly FileCodeIcon = FileCode;
  readonly AlertCircleIcon = AlertCircle;

  toggleSection(key: 'details') {
    this.sections.update(prev => ({ ...prev, [key]: !prev[key] }));
  }

  handleInputChange(field: keyof BackupForm, value: string) {
    this.formData.update(prev => ({ ...prev, [field]: value }));
    this.backupStatus.set('idle');
  }

  handleBackup() {
    this.isBackingUp.set(true);
    this.backupStatus.set('idle');
    
    // Simulate backup process
    setTimeout(() => {
      this.isBackingUp.set(false);
      this.backupStatus.set('success');
    }, 2000);
  }

  handleReset() {
    this.formData.set({
      driveDirectory: '',
      folderName: '',
      fileName: '',
    });
    this.backupStatus.set('idle');
  }
}
