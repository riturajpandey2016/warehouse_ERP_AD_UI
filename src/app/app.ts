import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  LucideAngularModule,
  Building, MapPin, Globe, Map, LayoutGrid, Building2, UserSquare2, Layers, Briefcase, 
  CalendarClock, Calendar, Newspaper, Database, Truck, Car, ShoppingCart, Calculator, ChevronRight, Menu,
  Boxes, AlertCircle
} from 'lucide-angular';

// Import all migrated components
import { CompanyMasterComponent } from './components/company-master/company-master.component';
import { CountryMasterComponent } from './components/country-master/country-master.component';
import { ZoneMasterComponent } from './components/zone-master/zone-master.component';
import { StateMasterComponent } from './components/state-master/state-master.component';
import { DistrictMasterComponent } from './components/district-master/district-master.component';
import { DepartmentMasterComponent } from './components/department-master/department-master.component';
import { DesignationMasterComponent } from './components/designation-master/designation-master.component';
import { CompanyCategoryMasterComponent } from './components/company-category-master/company-category-master.component';
import { FinancialYearMasterComponent } from './components/financial-year-master/financial-year-master.component';
import { HistoricalDayMasterComponent } from './components/historical-day-master/historical-day-master.component';
import { NewsEventsMasterComponent } from './components/news-events-master/news-events-master.component';
import { DatabaseBackupComponent } from './components/database-backup/database-backup.component';
import { TransportModeMasterComponent } from './components/transport-mode-master/transport-mode-master.component';
import { VehicleTypeMasterComponent } from './components/vehicle-type-master/vehicle-type-master.component';
import { SalesQuotationComponent } from './components/sales-quotation/sales-quotation.component';
import { PurchaseQuotationComponent } from './components/purchase-quotation/purchase-quotation.component';
import { SalesSupplySubTypeMasterComponent } from './components/sales-supply-sub-type-master/sales-supply-sub-type-master.component';
import { SalesSupplyTypeMasterComponent } from './components/sales-supply-type-master/sales-supply-type-master.component';
import { LetterUndertakingMasterComponent } from './components/letter-undertaking-master/letter-undertaking-master.component';
import { AdCodeMasterComponent } from './components/ad-code-master/ad-code-master.component';
import { TermsConditionsMasterComponent } from './components/terms-conditions-master/terms-conditions-master.component';
import { HsnMasterComponent } from './components/hsn-master/hsn-master.component';
import { UnitMasterComponent } from './components/unit-master/unit-master.component';
import { UomGroupSetupComponent } from './components/uom-group-setup/uom-group-setup.component';
import { ManufactureMasterComponent } from './components/manufacture-master/manufacture-master.component';
import { ProductCategoryMasterComponent } from './components/product-category-master/product-category-master.component';
import { ProductStateTypeMasterComponent } from './components/product-state-type-master/product-state-type-master.component';
import { ProductMaterialTypeMasterComponent } from './components/product-material-type-master/product-material-type-master.component';
import { WarehouseMasterComponent } from './components/warehouse-master/warehouse-master.component';
import { GroupMasterComponent } from './components/group-master/group-master.component';
import { InventorySetupComponent } from './components/inventory-setup/inventory-setup.component';
import { InventoryProductSetupComponent } from './components/inventory-product-setup/inventory-product-setup.component';
import { ProductPriceGroupComponent } from './components/product-price-group/product-price-group.component';
import { ProductDocumentUploadComponent } from './components/product-document-upload/product-document-upload.component';
import { ProductCreationComponent } from './components/product-creation/product-creation.component';
import { BulkProductCreationComponent } from './components/bulk-product-creation/bulk-product-creation.component';
import { BulkProductHsnComponent } from './components/bulk-product-hsn/bulk-product-hsn.component';
import { ProductAssignBranchComponent } from './components/product-assign-branch/product-assign-branch.component';
import { ClientPriceListComponent } from './components/client-price-list/client-price-list.component';
import { ProductRateUpdateComponent } from './components/product-rate-update/product-rate-update.component';
import { ProductJournalComponent } from './components/product-journal/product-journal.component';
import { StoreEntryComponent } from './components/store-entry/store-entry.component';
import { RoomEntryComponent } from './components/room-entry/room-entry.component';
import { ShelfEntryComponent } from './components/shelf-entry/shelf-entry.component';
import { RackEntryComponent } from './components/rack-entry/rack-entry.component';
import { DemandSlipComponent } from './components/demand-slip/demand-slip.component';
import { DemandSlipApprovalComponent } from './components/demand-slip-approval/demand-slip-approval.component';
import { RequisitionComponent } from './components/requisition/requisition.component';
import { RequisitionApprovalComponent } from './components/requisition-approval/requisition-approval.component';
import { IssueSlipComponent } from './components/issue-slip/issue-slip.component';
import { IssueReturnComponent } from './components/issue-return/issue-return.component';
import { BinSubLevelComponent } from './components/bin-sub-level/bin-sub-level.component';
import { BinInoutSettingsComponent } from './components/bin-inout-settings/bin-inout-settings.component';
import { OpeningStockBinComponent } from './components/opening-stock-bin/opening-stock-bin.component';
import { IssueStockBinComponent } from './components/issue-stock-bin/issue-stock-bin.component';

// Import new dashboard subcomponents
import { TopNavbarComponent } from './components/top-navbar/top-navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardLayoutComponent } from './components/dashboard-layout/dashboard-layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LucideAngularModule,
    CompanyMasterComponent,
    CountryMasterComponent,
    ZoneMasterComponent,
    StateMasterComponent,
    DistrictMasterComponent,
    DepartmentMasterComponent,
    DesignationMasterComponent,
    CompanyCategoryMasterComponent,
    FinancialYearMasterComponent,
    HistoricalDayMasterComponent,
    NewsEventsMasterComponent,
    DatabaseBackupComponent,
    TransportModeMasterComponent,
    VehicleTypeMasterComponent,
    SalesQuotationComponent,
    PurchaseQuotationComponent,
    SalesSupplySubTypeMasterComponent,
    SalesSupplyTypeMasterComponent,
    LetterUndertakingMasterComponent,
    AdCodeMasterComponent,
    TermsConditionsMasterComponent,
    HsnMasterComponent,
    UnitMasterComponent,
    UomGroupSetupComponent,
    ManufactureMasterComponent,
    ProductCategoryMasterComponent,
    ProductStateTypeMasterComponent,
    ProductMaterialTypeMasterComponent,
    WarehouseMasterComponent,
    GroupMasterComponent,
    InventorySetupComponent,
    InventoryProductSetupComponent,
    ProductPriceGroupComponent,
    ProductDocumentUploadComponent,
    ProductCreationComponent,
    BulkProductCreationComponent,
    BulkProductHsnComponent,
    ProductAssignBranchComponent,
    ClientPriceListComponent,
    ProductRateUpdateComponent,
    ProductJournalComponent,
    StoreEntryComponent,
    RoomEntryComponent,
    ShelfEntryComponent,
    RackEntryComponent,
    DemandSlipComponent,
    DemandSlipApprovalComponent,
    RequisitionComponent,
    RequisitionApprovalComponent,
    IssueSlipComponent,
    IssueReturnComponent,
    BinSubLevelComponent,
    BinInoutSettingsComponent,
    OpeningStockBinComponent,
    IssueStockBinComponent,
    
    // Add dashboard layout subcomponents
    TopNavbarComponent,
    SidebarComponent,
    DashboardLayoutComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  currentPage = signal('dashboard');
  sidebarOpen = signal(true);
  constructor() {
    console.log('App initialized, currentPage:', this.currentPage());
  }

  // Lucide Icons
  readonly MenuIcon = Menu;
  readonly ChevronRightIcon = ChevronRight;
  readonly BoxesIcon = Boxes;
  readonly AlertCircleIcon = AlertCircle;

  formatModuleName(id: string): string {
    if (!id) return '';
    return id.split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  selectPage(id: string) {
    // Map new sidebar and dashboard IDs to corresponding active components in the system
    let pageId = id;
    if (id === 'company-setup') pageId = 'company-master';
    else if (id === 'department') pageId = 'department-master';
    else if (id === 'purchase-orders') pageId = 'purchase-quotation';
    else if (id === 'sales-orders') pageId = 'sales-quotation';
    else if (id === 'warehouse') pageId = 'zone-master';
    else if (id === 'customers') pageId = 'sales-supply-sub-type';
    else if (id === 'pos') pageId = 'sales-quotation';
    else if (id === 'role-user-mgmt') pageId = 'designation-master';
    else if (id === 'global-settings') pageId = 'database-backup';
    else if (id === 'branch-management') pageId = 'state-master';
    else if (id === 'product-master') pageId = 'vehicle-type';
    else if (id === 'stock-management') pageId = 'transport-mode';
    else if (id === 'inventory-reports') pageId = 'historical-day';
    else if (id === 'vendors') pageId = 'news-events';
    else if (id === 'grn') pageId = 'financial-year';
    else if (id === 'invoices') pageId = 'district-master';
    else if (id === 'global-reports') pageId = 'historical-day';
    else if (id === 'home') pageId = 'dashboard';
    
    // New mappings for redesigned Organization submenus
    else if (id === 'production-unit') pageId = 'company-master';
    else if (id === 'sales-supply-type') pageId = 'sales-supply-type';
    else if (id === 'sales-transaction-type') pageId = 'sales-quotation';
    else if (id === 'letter-undertaking') pageId = 'letter-undertaking';
    else if (id === 'ad-code') pageId = 'ad-code';
    else if (id === 'terms-conditions') pageId = 'terms-conditions';
    else if (id === 'financial-year-creation') pageId = 'financial-year';
    else if (id === 'hsn-master') pageId = 'hsn-master';
    else if (id === 'unit-master') pageId = 'unit-master';
    else if (id === 'uom-group-setup') pageId = 'uom-group-setup';
    else if (id === 'manufacture-master') pageId = 'manufacture-master';
    else if (id === 'product-category') pageId = 'product-category';
    else if (id === 'product-state-type') pageId = 'product-state-type';
    else if (id === 'product-material-type') pageId = 'product-material-type';
    else if (id === 'product-price-group') pageId = 'product-price-group';
    else if (id === 'product-document-upload') pageId = 'product-document-upload';
    else if (id === 'product-creation') pageId = 'product-creation';
    else if (id === 'bulk-product-creation') pageId = 'bulk-product-creation';
    else if (id === 'bulk-product-hsn') pageId = 'bulk-product-hsn';
    else if (id === 'product-assign-branch') pageId = 'product-assign-branch';
    else if (id === 'client-price-list') pageId = 'client-price-list';
    else if (id === 'product-rate-update') pageId = 'product-rate-update';
    else if (id === 'product-journal') pageId = 'product-journal';
    else if (id === 'warehouse-master') pageId = 'warehouse-master';
    else if (id === 'store-entry') pageId = 'store-entry';
    else if (id === 'room-entry') pageId = 'room-entry';
    else if (id === 'shelf-entry') pageId = 'shelf-entry';
    else if (id === 'rack-entry') pageId = 'rack-entry';
    else if (id === 'demand-slip' || id === 'demand-slip-entry') pageId = 'demand-slip';
    else if (id === 'demand-slip-approval') pageId = 'demand-slip-approval';
    else if (id === 'requisition') pageId = 'requisition';
    else if (id === 'requisition-approval') pageId = 'requisition-approval';
    else if (id === 'issue-slip') pageId = 'issue-slip';
    else if (id === 'issue-return') pageId = 'issue-return';
    else if (id === 'bin-sub-level' || id === 'bin-sub-level-entry') pageId = 'bin-sub-level';
    else if (id === 'bin-inout-settings' || id === 'stock-out-order-settings') pageId = 'bin-inout-settings';
    else if (id === 'opening-stock-bin' || id === 'opening-item-bin' || id === 'opening-item-in-branch-bin-arrangement') pageId = 'opening-stock-bin';
    else if (id === 'issue-stock-bin' || id === 'issue-slip-bin-arrangement') pageId = 'issue-stock-bin';
    
    this.currentPage.set(pageId);
  }

  toggleSidebar() {
    this.sidebarOpen.update(prev => !prev);
  }
}
