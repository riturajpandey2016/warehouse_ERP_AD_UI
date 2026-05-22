import { Component, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Filter } from 'lucide-angular';

interface ClientItem {
  id: string;
  itemCode: string;
  itemName: string;
  rate: string;
}

@Component({
  selector: 'app-client-price-table',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './client-price-table.component.html',
  styleUrl: './client-price-table.component.css'
})
export class ClientPriceTableComponent {
  readonly FilterIcon = Filter;

  @Output() editItem = new EventEmitter<ClientItem>();

  data = signal<ClientItem[]>([
    { id: '1', itemCode: 'F0001', itemName: 'Meter for Volumetric Measurement -Series SP-002', rate: '0.00' },
    { id: '2', itemCode: 'F0002', itemName: 'Meter for Volumetric Measurement Complete (PTO Opt) Set SP 002', rate: '0.00' },
    { id: '3', itemCode: 'F0003', itemName: 'Meter for Volumetric Measurement SP-002 Complete (12 V battery Operated) Set', rate: '0.00' },
    { id: '4', itemCode: 'RM0005', itemName: 'Angular Check Valve Body 1 ½"', rate: '0.00' },
    { id: '5', itemCode: 'F0004', itemName: 'Mini Dispensing Pump', rate: '0.00' },
    { id: '6', itemCode: 'F0005', itemName: 'Meter for Volumetric Measurement 5 digit (9999.9 ltrs.) Series-SP002', rate: '0.00' },
    { id: '7', itemCode: 'F0006', itemName: 'Meter for Volumetric Measurement Electronic(Preset) Complete Set', rate: '0.00' },
    { id: '8', itemCode: 'F0007', itemName: 'Mechanical Fuel dispenser Model No -MFD/SP 002', rate: '0.00' },
    { id: '9', itemCode: 'F0008', itemName: 'Meter for Volumetric Electronic (Non Preset) Complete set NTR 04', rate: '0.00' },
    { id: '10', itemCode: 'F0009', itemName: 'Electronic Fuel Dispenser preset model no: EFD/NTR/03', rate: '0.00' }
  ]);
}
