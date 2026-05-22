import { Component, signal, computed, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  LucideAngularModule, 
  Save, RotateCcw, Trash2, Download, Upload, Building, CheckCircle2, ChevronRight, LayoutGrid, Clock, ShieldAlert,
  ChevronDown, ChevronUp, Building2, MapPin, Globe, Mail, Phone, CreditCard, History, Search, Layers, X, FileText,
  AlertTriangle, RefreshCw
} from 'lucide-angular';

import { ErpInputComponent } from '../shared/erp-input/erp-input.component';
import { ErpSelectComponent } from '../shared/erp-select/erp-select.component';
import { ErpTextareaComponent } from '../shared/erp-textarea/erp-textarea.component';
import { ErpToggleComponent } from '../shared/erp-toggle/erp-toggle.component';
import { SectionHeaderComponent } from '../shared/section-header/section-header.component';
import { CompanyTableComponent } from '../company-table/company-table.component';

interface CompanyForm {
  baseCompany: string;
  companyName: string;
  companyAlias: string;
  companyCode: string;
  companyDescription: string;
  registrationAddress: string;
  registrationPincode: string;
  gstNumber: string;
  panNumber: string;
  isoNumber: string;
  udyogAadhaarNumber: string;
  email: string;
  alternativeEmail: string;
  contactNumber: string;
  mobileNumber: string;
  website: string;
  currency: string;
  baseCurrency: string;
  bankName: string;
  bankBranch: string;
  bankAccount: string;
  ccCenterName: string;
  isActive: boolean;
}

@Component({
  selector: 'app-company-master',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    LucideAngularModule, 
    ErpInputComponent, 
    ErpSelectComponent,
    ErpTextareaComponent,
    ErpToggleComponent,
    SectionHeaderComponent, 
    CompanyTableComponent
  ],
  templateUrl: './company-master.component.html',
  styleUrl: './company-master.component.css'
})
export class CompanyMasterComponent {
  // Collapsible cards toggle states
  sections = signal({
    companyInfo: true,
    registration: true,
    contact: true,
    search: true,
    table: true
  });

  // Writable form data signal
  formData: WritableSignal<CompanyForm> = signal({
    baseCompany: '',
    companyName: '',
    companyAlias: '',
    companyCode: 'COMP-001',
    companyDescription: '',
    registrationAddress: '',
    registrationPincode: '',
    gstNumber: '',
    panNumber: '',
    isoNumber: '',
    udyogAadhaarNumber: '',
    email: '',
    alternativeEmail: '',
    contactNumber: '',
    mobileNumber: '',
    website: '',
    currency: '',
    baseCurrency: 'INR',
    bankName: '',
    bankBranch: '',
    bankAccount: '',
    ccCenterName: '',
    isActive: true,
  });

  // Search input signals
  searchName = signal('');
  searchCode = signal('');
  searchStatus = signal('');

  // Logo uploader states (retained for data consistency)
  logoUrl = signal<string | null>(null);
  logoName = signal<string | null>(null);
  uploadProgress = signal<number>(0);
  isUploading = signal<boolean>(false);
  isDragOver = signal<boolean>(false);

  // Auto-save cycle signals
  isAutoSaving = signal<boolean>(false);
  lastSavedTime = signal<string>('11:20 AM');
  private autoSaveTimeout: any;

  // Lucide Icons
  readonly SaveIcon = Save;
  readonly RotateCcwIcon = RotateCcw;
  readonly Trash2Icon = Trash2;
  readonly DownloadIcon = Download;
  readonly UploadIcon = Upload;
  readonly ClockIcon = Clock;
  readonly ShieldAlertIcon = ShieldAlert;
  readonly SearchIcon = Search;
  readonly XIcon = X;
  readonly ChevronRightIcon = ChevronRight;
  readonly BuildingIcon = Building;
  readonly AlertTriangleIcon = AlertTriangle;
  readonly RefreshCwIcon = RefreshCw;

  // Options datasets
  baseCompanyOptions = [
    { label: 'Warehouse Group Corp (Parent)', value: 'Warehouse Group Corp' },
    { label: 'Alpha Freight Shipping Ltd', value: 'Alpha Freight Shipping Ltd' }
  ];
  currencyOptions = [
    { label: 'INR (Indian Rupee)', value: 'INR' },
    { label: 'USD (US Dollar)', value: 'USD' },
    { label: 'EUR (Euro)', value: 'EUR' }
  ];
  baseCurrencyOptions = [
    { label: 'INR (Indian Rupee)', value: 'INR' },
    { label: 'USD (US Dollar)', value: 'USD' }
  ];
  statusOptions = [
    { label: 'Active', value: 'Active' },
    { label: 'Inactive', value: 'Inactive' }
  ];

  // ----------------------------------------------------
  // ANGULAR COMPUTED SIGNALS (Business Logic Alignment)
  // ----------------------------------------------------

  // GST Identification format validator
  isGstValid = computed(() => {
    const gst = this.formData().gstNumber.trim().toUpperCase();
    if (!gst) return false;
    // Standard GSTIN regex structure
    return /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(gst);
  });

  // Pincode auto-location lookup
  pincodeLocation = computed(() => {
    const pin = this.formData().registrationPincode.trim();
    if (!pin) return null;
    if (pin === '110001') return 'Connaught Place, New Delhi';
    if (pin === '400001') return 'Fort, Mumbai';
    if (pin === '600001') return 'George Town, Chennai';
    if (pin === '500081') return 'HITEC City, Hyderabad';
    if (pin.length === 6 && /^\d+$/.test(pin)) return 'Registered Zone, India Office';
    return null;
  });

  // Secure bank account masking
  maskedBankAccount = computed(() => {
    const acc = this.formData().bankAccount.trim();
    if (!acc) return '';
    if (acc.length <= 4) return acc;
    return '•••• •••• ' + acc.substring(acc.length - 4);
  });

  // Primary Email validation warning
  emailError = computed(() => {
    const email = this.formData().email.trim();
    if (!email) return null;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? null : 'Invalid corporate email format';
  });

  // Web URL validation warning
  websiteError = computed(() => {
    const web = this.formData().website.trim();
    if (!web) return null;
    return /^(https?:\/\/)?(www\.)?([a-zA-Z0-9]+)\.[a-z]{2,}(\/.*)?$/.test(web) ? null : 'Invalid website domain URL';
  });

  // ----------------------------------------------------
  // ACTION HANDLERS
  // ----------------------------------------------------

  toggleSection(key: 'companyInfo' | 'registration' | 'contact' | 'search' | 'table') {
    this.sections.update(prev => ({ ...prev, [key]: !prev[key] }));
  }

  updateForm(field: keyof CompanyForm, value: string | boolean) {
    this.formData.update(prev => ({ ...prev, [field]: value as never }));
    this.triggerAutoSave();
  }

  handleSearch() {
    console.log('Searching companies with criteria:', {
      name: this.searchName(),
      code: this.searchCode(),
      status: this.searchStatus()
    });
  }

  triggerAutoSave() {
    this.isAutoSaving.set(true);
    if (this.autoSaveTimeout) {
      clearTimeout(this.autoSaveTimeout);
    }
    this.autoSaveTimeout = setTimeout(() => {
      this.isAutoSaving.set(false);
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      this.lastSavedTime.set(timeStr);
      console.log('Automated save payload:', this.formData());
    }, 1200);
  }

  handleSave() {
    console.log('Saving Company Master Data...', this.formData());
    alert('Company Master Saved Successfully!');
  }

  handleUpdate() {
    console.log('Updating Company Master Data...', this.formData());
    alert('Company Master Updated Successfully!');
  }

  handleDelete() {
    if (confirm('Are you sure you want to delete this Company Master record?')) {
      this.handleReset();
    }
  }

  handleReset() {
    this.formData.set({
      baseCompany: '',
      companyName: '',
      companyAlias: '',
      companyCode: 'COMP-001',
      companyDescription: '',
      registrationAddress: '',
      registrationPincode: '',
      gstNumber: '',
      panNumber: '',
      isoNumber: '',
      udyogAadhaarNumber: '',
      email: '',
      alternativeEmail: '',
      contactNumber: '',
      mobileNumber: '',
      website: '',
      currency: 'INR',
      baseCurrency: 'INR',
      bankName: '',
      bankBranch: '',
      bankAccount: '',
      ccCenterName: '',
      isActive: true,
    });
    this.removeLogo();
  }

  // File Upload Handlers
  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragOver.set(true);
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragOver.set(false);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragOver.set(false);
    if (event.dataTransfer?.files && event.dataTransfer.files[0]) {
      this.handleFile(event.dataTransfer.files[0]);
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.handleFile(input.files[0]);
    }
  }

  triggerUpload() {
    const fileInput = document.getElementById('logo-file-input');
    if (fileInput) {
      fileInput.click();
    }
  }

  private handleFile(file: File) {
    this.logoName.set(file.name);
    this.isUploading.set(true);
    this.uploadProgress.set(0);

    const interval = setInterval(() => {
      this.uploadProgress.update(p => {
        if (p >= 100) {
          clearInterval(interval);
          this.isUploading.set(false);
          const reader = new FileReader();
          reader.onload = () => {
            this.logoUrl.set(reader.result as string);
          };
          reader.readAsDataURL(file);
          return 100;
        }
        return p + 20;
      });
    }, 150);
  }

  removeLogo() {
    this.logoUrl.set(null);
    this.logoName.set(null);
    this.uploadProgress.set(0);
  }
}
