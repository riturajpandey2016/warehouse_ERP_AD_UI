import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Search, Filter, Download, Plus, Edit2 } from 'lucide-angular';

interface GroupData {
  id: string;
  groupName: string;
  groupCode: string;
  itemType: string;
  entryDate: string;
  status: string;
}

@Component({
  selector: 'app-group-table',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './group-table.component.html',
  styleUrl: './group-table.component.css'
})
export class GroupTableComponent {
  // Icons
  readonly SearchIcon = Search;
  readonly FilterIcon = Filter;
  readonly DownloadIcon = Download;
  readonly PlusIcon = Plus;
  readonly EditIcon = Edit2;

  // Mock data to match the screenshot
  data = signal<GroupData[]>([
    { id: '1', groupName: 'MAIN', groupCode: 'MAN', itemType: 'Inventory', entryDate: '01 Apr 2015', status: 'True' },
    { id: '2', groupName: 'ASSETS', groupCode: 'AST', itemType: 'Inventory', entryDate: '01 Apr 2020', status: 'True' },
    { id: '3', groupName: 'FINISHED', groupCode: 'FNS', itemType: 'Inventory', entryDate: '14 Jan 2017', status: 'True' },
    { id: '4', groupName: 'SEMI FINISHED', groupCode: 'SFS', itemType: 'Inventory', entryDate: '14 Jan 2017', status: 'True' },
    { id: '5', groupName: 'RAW MATERIALS', groupCode: 'RAW', itemType: 'Inventory', entryDate: '14 Jan 2017', status: 'True' },
    { id: '6', groupName: 'Scrap', groupCode: 'SRP', itemType: 'Inventory', entryDate: '20 Apr 2017', status: 'True' },
    { id: '7', groupName: 'Dry Sweets', groupCode: 'DRS', itemType: 'Inventory', entryDate: '13 Sep 2017', status: 'False' }
  ]);
}
