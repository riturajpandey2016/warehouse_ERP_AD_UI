import { Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  LucideAngularModule, 
  Save, RotateCcw
} from 'lucide-angular';

import { GroupTableComponent } from '../group-table/group-table.component';

interface GroupForm {
  groupName: string;
  groupCode: string;
  itemType: string;
  entryDate: string;
  status: string;
}

@Component({
  selector: 'app-group-master',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    LucideAngularModule, 
    GroupTableComponent
  ],
  templateUrl: './group-master.component.html',
  styleUrl: './group-master.component.css'
})
export class GroupMasterComponent {
  formData: WritableSignal<GroupForm> = signal({
    groupName: '',
    groupCode: '',
    itemType: 'Select Item Type',
    entryDate: '19 May 2026',
    status: 'Active'
  });

  updateForm(field: keyof GroupForm, value: string) {
    this.formData.update(prev => ({ ...prev, [field]: value }));
  }

  handleReset() {
    this.formData.set({
      groupName: '',
      groupCode: '',
      itemType: 'Select Item Type',
      entryDate: '19 May 2026',
      status: 'Active'
    });
  }
}
