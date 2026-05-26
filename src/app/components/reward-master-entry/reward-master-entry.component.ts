import { Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  LucideAngularModule, 
  Save, RotateCcw, Search, Edit, XCircle, ToggleRight
} from 'lucide-angular';

import { ErpSelectComponent } from '../shared/erp-select/erp-select.component';
import { SectionHeaderComponent } from '../shared/section-header/section-header.component';

@Component({
  selector: 'app-reward-master-entry',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    LucideAngularModule, 
    ErpSelectComponent,
    SectionHeaderComponent
  ],
  templateUrl: './reward-master-entry.component.html',
  styleUrl: './reward-master-entry.component.css'
})
export class RewardMasterEntryComponent {
  sections = signal({
    searchContents: true,
    rewardShow: true
  });

  // Entry Form
  formData = signal({
    country: 'India',
    company: 'ILICO SERVICES LTD.(vERP)',
    amountStartRange: '',
    rewardPoints: '',
    zone: 'East',
    branch: '',
    amountEndRange: ''
  });

  // Search Form
  searchData = signal({
    company: 'ILICO SERVICES LTD.(vERP)',
    branch: ''
  });

  // Icons
  readonly SaveIcon = Save;
  readonly RotateCcwIcon = RotateCcw;
  readonly SearchIcon = Search;
  readonly EditIcon = Edit;
  readonly XCircleIcon = XCircle;
  readonly ToggleRightIcon = ToggleRight;

  countryOptions = [
    { label: 'India', value: 'India' }
  ];

  companyOptions = [
    { label: 'ILICO SERVICES LTD.(vERP)', value: 'ILICO SERVICES LTD.(vERP)' }
  ];

  zoneOptions = [
    { label: 'East', value: 'East' }
  ];

  branchOptions = [
    { label: '--Select CC Center Name--', value: '' },
    { label: 'Head Office', value: 'Head Office' }
  ];

  // Mock Table Data
  tableData = signal([
    { slNo: 1, country: 'India', zone: 'East', company: 'ILICO SERVICES LTD.(vERP)', branch: 'Head Office', startAmount: '50000.00', endAmount: '100000.00', rewardPoints: '5.00', entryBy: 'Siddharta Dikshit', entryDate: '09 Mar 2022' },
    { slNo: 2, country: 'India', zone: 'East', company: 'ILICO SERVICES LTD.(vERP)', branch: 'Head Office', startAmount: '100001.00', endAmount: '200000.00', rewardPoints: '10.00', entryBy: 'Siddharta Dikshit', entryDate: '09 Mar 2022' },
    { slNo: 3, country: 'India', zone: 'East', company: 'ILICO SERVICES LTD.(vERP)', branch: 'Head Office', startAmount: '10000.00', endAmount: '49999.00', rewardPoints: '3.00', entryBy: 'Siddharta Dikshit', entryDate: '16 Mar 2022' },
    { slNo: 4, country: 'India', zone: 'East', company: 'ILICO SERVICES LTD.(vERP)', branch: 'Head Office', startAmount: '10000.00', endAmount: '100000.00', rewardPoints: '10.00', entryBy: 'Siddharta Dikshit', entryDate: '11 Oct 2022' }
  ]);

  toggleSection(key: 'searchContents' | 'rewardShow') {
    this.sections.update(prev => ({ ...prev, [key]: !prev[key] }));
  }

  updateForm(field: string, value: any) {
    this.formData.update(prev => ({ ...prev, [field]: value }));
  }

  updateSearch(field: string, value: any) {
    this.searchData.update(prev => ({ ...prev, [field]: value }));
  }

  handleSave() {
    console.log('Saving Reward...', this.formData());
    alert('Reward Saved Successfully!');
  }

  handleReset() {
    console.log('Resetting form');
  }

  handleSearch() {
    console.log('Searching Rewards...', this.searchData());
  }

  editRow(item: any) {
    console.log('Editing', item);
  }

  deleteRow(item: any) {
    console.log('Deleting', item);
  }
  
  toggleRow(item: any) {
    console.log('Toggling active status', item);
  }
}
