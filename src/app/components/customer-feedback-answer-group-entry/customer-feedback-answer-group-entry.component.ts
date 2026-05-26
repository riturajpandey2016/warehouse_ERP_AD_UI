import { Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  LucideAngularModule, 
  Save, RotateCcw, Search, Edit, XCircle, Plus, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight
} from 'lucide-angular';

import { ErpSelectComponent } from '../shared/erp-select/erp-select.component';
import { SectionHeaderComponent } from '../shared/section-header/section-header.component';

@Component({
  selector: 'app-customer-feedback-answer-group-entry',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    LucideAngularModule, 
    ErpSelectComponent,
    SectionHeaderComponent
  ],
  templateUrl: './customer-feedback-answer-group-entry.component.html',
  styleUrl: './customer-feedback-answer-group-entry.component.css'
})
export class CustomerFeedbackAnswerGroupEntryComponent {
  sections = signal({
    groupList: true
  });

  // Form Fields
  feedbackAnswer = signal('');
  marks = signal('');
  feedbackAnswerGroup = signal('');
  
  // Search
  searchGroup = signal('');

  // Icons
  readonly SaveIcon = Save;
  readonly RotateCcwIcon = RotateCcw;
  readonly SearchIcon = Search;
  readonly EditIcon = Edit;
  readonly XCircleIcon = XCircle;
  readonly PlusIcon = Plus;
  readonly ChevronLeftIcon = ChevronLeft;
  readonly ChevronRightIcon = ChevronRight;
  readonly ChevronsLeftIcon = ChevronsLeft;
  readonly ChevronsRightIcon = ChevronsRight;

  answerOptions = [
    { label: '--Select Answer--', value: '' },
    { label: 'Highly Satisfied', value: 'Highly Satisfied' },
    { label: 'Satisfied', value: 'Satisfied' },
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' }
  ];

  // Mock Table Data
  tableData = signal([
    { slNo: 1, group: 'YES NO Group', marks: '5.00', entryBy: 'Siddharta Dikshit', entryDate: '22 Apr 2026' },
    { slNo: 2, group: 'Satisfaction Group', marks: '5.00', entryBy: 'Siddharta Dikshit', entryDate: '22 Apr 2026' }
  ]);

  toggleSection(key: 'groupList') {
    this.sections.update(prev => ({ ...prev, [key]: !prev[key] }));
  }

  handleAdd() {
    console.log('Adding Answer to Group:', this.feedbackAnswer(), this.marks());
    alert('Answer added to pending group list.');
  }

  handleSave() {
    console.log('Saving Answer Group...', this.feedbackAnswerGroup());
    if (this.feedbackAnswerGroup().trim()) {
      const newSlNo = this.tableData().length + 1;
      this.tableData.update(items => [
        ...items, 
        { 
          slNo: newSlNo, 
          group: this.feedbackAnswerGroup(), 
          marks: '0.00', 
          entryBy: 'System', 
          entryDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
        }
      ]);
      this.feedbackAnswerGroup.set('');
      alert('Answer Group Saved Successfully!');
    }
  }

  handleReset() {
    this.feedbackAnswer.set('');
    this.marks.set('');
    this.feedbackAnswerGroup.set('');
  }

  handleSearch() {
    console.log('Searching for Answer Group:', this.searchGroup());
  }

  editRow(item: any) {
    this.feedbackAnswerGroup.set(item.group);
  }

  deleteRow(item: any) {
    console.log('Deleting', item);
  }
}
