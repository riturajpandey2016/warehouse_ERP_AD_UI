import { Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  LucideAngularModule, 
  Save, RotateCcw, Search, Edit, ToggleRight, XCircle, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight
} from 'lucide-angular';

import { ErpInputComponent } from '../shared/erp-input/erp-input.component';
import { SectionHeaderComponent } from '../shared/section-header/section-header.component';

@Component({
  selector: 'app-customer-feedback-answer-entry',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    LucideAngularModule, 
    ErpInputComponent,
    SectionHeaderComponent
  ],
  templateUrl: './customer-feedback-answer-entry.component.html',
  styleUrl: './customer-feedback-answer-entry.component.css'
})
export class CustomerFeedbackAnswerEntryComponent {
  sections = signal({
    answerList: true
  });

  // Top level Entry
  feedbackAnswer = signal('');

  // Search
  searchAnswer = signal('');

  // Icons
  readonly SaveIcon = Save;
  readonly RotateCcwIcon = RotateCcw;
  readonly SearchIcon = Search;
  readonly EditIcon = Edit;
  readonly ToggleRightIcon = ToggleRight;
  readonly XCircleIcon = XCircle;
  readonly ChevronLeftIcon = ChevronLeft;
  readonly ChevronRightIcon = ChevronRight;
  readonly ChevronsLeftIcon = ChevronsLeft;
  readonly ChevronsRightIcon = ChevronsRight;

  // Mock Table Data
  tableData = signal([
    { slNo: 1, answer: 'Highly Satisfied' },
    { slNo: 2, answer: 'Satisfied' },
    { slNo: 3, answer: 'Partially Satisfied' },
    { slNo: 4, answer: 'Unsatisfied' },
    { slNo: 5, answer: 'Yes' },
    { slNo: 6, answer: 'No' }
  ]);

  toggleSection(key: 'answerList') {
    this.sections.update(prev => ({ ...prev, [key]: !prev[key] }));
  }

  handleSave() {
    console.log('Saving feedback answer...', this.feedbackAnswer());
    if (this.feedbackAnswer().trim()) {
      const newSlNo = this.tableData().length + 1;
      this.tableData.update(items => [...items, { slNo: newSlNo, answer: this.feedbackAnswer() }]);
      this.feedbackAnswer.set('');
      alert('Feedback Answer Saved Successfully!');
    }
  }

  handleReset() {
    this.feedbackAnswer.set('');
  }

  handleSearch() {
    console.log('Searching for answer:', this.searchAnswer());
  }

  editRow(item: any) {
    this.feedbackAnswer.set(item.answer);
  }

  toggleRow(item: any) {
    console.log('Toggling active state for', item);
  }

  deleteRow(item: any) {
    console.log('Deleting', item);
  }
}
