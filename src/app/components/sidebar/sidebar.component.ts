import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  LucideAngularModule, 
  LayoutGrid, Building2, Boxes, ShoppingCart, DollarSign, Calculator, 
  BarChart2, Users, Settings, ChevronDown, ChevronRight, Activity, Folder, FolderOpen
} from 'lucide-angular';

interface SubMenuItem {
  id: string;
  name: string;
}

interface SubGroup {
  id: string;
  name: string;
  items: SubMenuItem[];
}

interface MenuItem {
  id: string;
  name: string;
  icon: any;
  subItems?: SubMenuItem[];
  subGroups?: SubGroup[]; // Nested sub-accordions under parent menu
  isExpandable?: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  host: {
    '[class.collapsed]': 'collapsed'
  }
})
export class SidebarComponent {
  @Input() collapsed = false;
  @Output() selectMenu = new EventEmitter<string>();

  // Current active menu item id
  activeMenuId = signal('dashboard');

  // Track expanded accordion submenus
  expandedGroups = signal<Record<string, boolean>>({
    organization: true, // Organization expanded by default to display nested structure
    inventory: false,
    purchase: false,
    sales: false
  });

  // Track expanded nested subgroups under Organization & Inventory
  expandedSubGroups = signal<Record<string, boolean>>({
    masters: true, // Masters expanded by default
    compliance: false,
    configuration: false,
    
    // Inventory subGroup states
    invMasters: false,
    invProductPricing: false,
    invStorage: false,
    invOperations: false,
    invBinManagement: false,

    // Sales subGroup states
    salesQuotations: false,
    salesOrders: false,
    salesBilling: false,
    salesFeedback: false
  });

  // Lucide Icons
  readonly ChevronDownIcon = ChevronDown;
  readonly ChevronRightIcon = ChevronRight;
  readonly ActivityIcon = Activity;
  readonly FolderIcon = Folder;
  readonly FolderOpenIcon = FolderOpen;

  // Sidebar menu items structured exactly according to legacy requirements and SaaS modularity
  menuItems: MenuItem[] = [
    { id: 'dashboard', name: 'Main Dashboard', icon: LayoutGrid },
    {
      id: 'organization',
      name: 'Organization',
      icon: Building2,
      isExpandable: true,
      subGroups: [
        {
          id: 'masters',
          name: 'Masters',
          items: [
            { id: 'company-setup', name: 'Company Master' },
            { id: 'country-master', name: 'Country Master' },
            { id: 'zone-master', name: 'Zone Master' },
            { id: 'state-master', name: 'State Master' },
            { id: 'district-master', name: 'District Master' },
            { id: 'production-unit', name: 'Production Unit Master' },
            { id: 'department-master', name: 'Department Master' },
            { id: 'designation-master', name: 'Designation Master' },
            { id: 'company-category', name: 'Company Category' },
            { id: 'transport-mode', name: 'Transport Mode' },
            { id: 'vehicle-type', name: 'Vehicle Type' },
            { id: 'financial-year', name: 'Financial Year' }
          ]
        },
        {
          id: 'compliance',
          name: 'Tax & Compliance',
          items: [
            { id: 'sales-supply-type', name: 'Sales Supply Type' },
            { id: 'sales-supply-sub-type', name: 'Sales Supply Sub Type' },
            { id: 'sales-transaction-type', name: 'Sales Transaction Type' },
            { id: 'letter-undertaking', name: 'Letter Of Undertaking' },
            { id: 'ad-code', name: 'Authorized Dealer Code' }
          ]
        },
        {
          id: 'configuration',
          name: 'Configuration',
          items: [
            { id: 'terms-conditions', name: 'Terms & Conditions' },
            { id: 'news-events', name: 'Company News & Events' },
            { id: 'historical-day', name: 'Historical Day' },
            { id: 'database-backup', name: 'Database Backup' },
            { id: 'financial-year-creation', name: 'Financial Year Creation' }
          ]
        }
      ]
    },
    {
      id: 'inventory',
      name: 'Inventory',
      icon: Boxes,
      isExpandable: true,
      subGroups: [
        {
          id: 'invMasters',
          name: 'Master Data / Setup',
          items: [
            { id: 'hsn-master', name: 'HSN Master' },
            { id: 'unit-master', name: 'Unit Master' },
            { id: 'uom-group-setup', name: 'UoM Group Setup' },
            { id: 'manufacture-master', name: 'Manufacture Master' },
            { id: 'product-category', name: 'Product Category' },
            { id: 'product-state-type', name: 'Product State Type' },
            { id: 'product-material-type', name: 'Product Material Type Entry' },
            { id: 'warehouse-master', name: 'Warehouse Master' },
            { id: 'group-master', name: 'Group Master' },
            { id: 'inventory-setup', name: 'Inventory Management Setup' },
            { id: 'inventory-product-setup', name: 'Inventory Management Product Setup' },
            { id: 'product-price-group', name: 'Product Price Group Setup' },
            { id: 'product-document-upload', name: 'Product Document and Image Upload' }
          ]
        },
        {
          id: 'invProductPricing',
          name: 'Product & Pricing',
          items: [
            { id: 'product-creation', name: 'Product Creation' },
            { id: 'bulk-product-creation', name: 'Bulk Product Creation' },
            { id: 'bulk-product-hsn', name: 'Bulk Product HSN Update' },
            { id: 'product-assign-branch', name: 'Product Assign In Branch (Opening Stocks)' },
            { id: 'client-price-list', name: 'Client Price List' },
            { id: 'product-rate-update', name: 'Product Rate Update' },
            { id: 'product-journal', name: 'Product Journal' }
          ]
        },
        {
          id: 'invStorage',
          name: 'Storage & Warehousing',
          items: [
            { id: 'store-entry', name: 'Store Entry' },
            { id: 'room-entry', name: 'Room Entry' },
            { id: 'shelf-entry', name: 'Almirah/Shelf Entry' },
            { id: 'rack-entry', name: 'Rack Entry' }
          ]
        },
        {
          id: 'invOperations',
          name: 'Operations & Slips',
          items: [
            { id: 'demand-slip-entry', name: 'Demand Slip Entry' },
            { id: 'demand-slip-approval', name: 'Demand Slip Approval' },
            { id: 'requisition', name: 'Requisition' },
            { id: 'requisition-approval', name: 'Requisition Approval' },
            { id: 'issue-slip', name: 'Issue Slip' },
            { id: 'issue-return', name: 'Issue Return' }
          ]
        },
        {
          id: 'invBinManagement',
          name: 'Bin Management',
          items: [
            { id: 'bin-sub-level', name: 'Bin Management Sub Level Entry' },
            { id: 'bin-order-settings', name: 'Bin Management Item In Out Order Settings' },
            { id: 'opening-item-bin', name: 'Opening Item In Branch Bin Arrangement' },
            { id: 'issue-slip-bin', name: 'Issue Slip Bin Arrangement' },
            { id: 'issue-return-bin', name: 'Issue Return Bin Arrangement' },
            { id: 'grn-bin', name: 'Purchase Order Receive (GRN) Bin Arrangement' },
            { id: 'purchase-invoice-bin', name: 'Purchase Invoice Bin Arrangement' },
            { id: 'purchase-return-bin', name: 'Purchase Return Bin Arrangement' },
            { id: 'sales-challan-bin', name: 'Sales Challan Bin Arrangement' },
            { id: 'sales-invoice-bin', name: 'Sales Invoice Bin Arrangement' },
            { id: 'sales-return-bin', name: 'Sales Return Bin Arrangement' }
          ]
        }
      ]
    },
    {
      id: 'purchase',
      name: 'Purchase',
      icon: ShoppingCart,
      isExpandable: true,
      subItems: [
        { id: 'purchase-orders', name: 'Purchase Orders' },
        { id: 'vendors', name: 'Vendors' },
        { id: 'grn', name: 'GRN' }
      ]
    },
    {
      id: 'sales',
      name: 'Sales',
      icon: DollarSign,
      isExpandable: true,
      subGroups: [
        {
          id: 'salesQuotations',
          name: 'Quotations & Contracts',
          items: [
            { id: 'sales-delivery-expected-days', name: 'Sales Delivery Expected Days' },
            { id: 'sales-quotation', name: 'Sales Quotation' },
            { id: 'sales-quotation-approval', name: 'SalesQuotationApproval' },
            { id: 'contrat-review-check-list-entry', name: 'Contrat Review Check List Entry' }
          ]
        },
        {
          id: 'salesOrders',
          name: 'Sales Orders',
          items: [
            { id: 'sales-order', name: 'Sales Order' },
            { id: 'sales-order-approval', name: 'Sales Order Approval' }
          ]
        },
        {
          id: 'salesBilling',
          name: 'Billing & Delivery',
          items: [
            { id: 'sales-challan', name: 'Sales Challan' },
            { id: 'sales-invoice', name: 'Sales Invoice' },
            { id: 'sales-despatch', name: 'Sales Despatch' },
            { id: 'sales-return-credit-note', name: 'Sales Return (Credit Note)' },
            { id: 'invoice-document-upload-download', name: 'Invoice Document Upload/Download' }
          ]
        },
        {
          id: 'salesFeedback',
          name: 'Customer Feedback',
          items: [
            { id: 'customer-feedback-answer-entry', name: 'Customer Feedback Answer Entry' },
            { id: 'customer-feedback-answer-group-entry', name: 'Customer Feedback Answer Group Entry' },
            { id: 'customer-feedback-question-entry', name: 'Customer Feedback Question Entry' },
            { id: 'feedback-link-send-to-customer', name: 'Feedback Link Send To Customer' }
          ]
        }
      ]
    },
    { 
      id: 'pos', 
      name: 'POS', 
      icon: Calculator,
      isExpandable: true,
      subItems: [
        { id: 'branch-store-entry', name: 'Branch Store Entry' },
        { id: 'stock-in-store', name: 'Stock In Store' },
        { id: 'product-discount-scheme', name: 'Product Discount Scheme' },
        { id: 'store-requisition', name: 'Store Requisition' },
        { id: 'issue-slip-pos', name: 'Issue Slip POS' },
        { id: 'reward-master-entry', name: 'Reward Master Entry' },
        { id: 'pos-invoice-entry', name: 'POS Invoice Entry' }
      ]
    },
    { id: 'global-reports', name: 'Global Reports', icon: BarChart2 },
    { id: 'role-user-mgmt', name: 'Role & User Management', icon: Users },
    { id: 'global-settings', name: 'Global Settings', icon: Settings }
  ];

  toggleGroup(groupId: string) {
    if (this.collapsed) return; // Don't expand if sidebar is collapsed
    this.expandedGroups.update(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }));
  }

  toggleSubGroup(subGroupId: string, event: Event) {
    event.stopPropagation(); // Prevent parent toggle triggering
    if (this.collapsed) return;
    this.expandedSubGroups.update(prev => ({
      ...prev,
      [subGroupId]: !prev[subGroupId]
    }));
  }

  onSelectMenu(menuId: string) {
    this.activeMenuId.set(menuId);
    this.selectMenu.emit(menuId);
  }

  onSelectSubMenu(parentId: string, subId: string) {
    this.activeMenuId.set(subId);
    this.selectMenu.emit(subId);
  }

  isGroupExpanded(groupId: string): boolean {
    return this.expandedGroups()[groupId] || false;
  }

  isSubGroupExpanded(subGroupId: string): boolean {
    return this.expandedSubGroups()[subGroupId] || false;
  }

  isChildActive(item: MenuItem): boolean {
    if (item.subItems) {
      return item.subItems.some(sub => sub.id === this.activeMenuId());
    }
    if (item.subGroups) {
      return item.subGroups.some(group => 
        group.items.some(sub => sub.id === this.activeMenuId())
      );
    }
    return false;
  }
}
