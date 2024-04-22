import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatComponentsModule } from '@app/mat-components/mat-components.module';
import { PurchaseOrder } from '../purchase-order';
import { PurchaseOrderItem } from '../purchase-order-item';
import { Vendor } from '@app/vendor/vendor';
import { NewVendorService } from '@app/vendor/newvendor.service';
import { Product } from '@app/product/product';
import { ProductService } from '@app/product/product.service';
import { PurchaseOrderService } from '../purchase-order.service';
import { PDFURL } from '@app/constants';
import {
  Form,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-viewer',
  standalone: true,
  imports: [CommonModule, MatComponentsModule, ReactiveFormsModule],
  templateUrl: './viewer.component.html',
})
export class ViewerComponent implements OnInit, OnDestroy {
  // Form variables
  generatorForm: FormGroup;
  vendorid: FormControl;
  purchaseorderid: FormControl;
  subscriptionForm?: Subscription;

  // Properties
  message?: String;
  allVendors?: Vendor[];
  selectedVendor?: Vendor;
  hasPurchaseOrders: Boolean = false;
  vendorPOs?: PurchaseOrder[];
  selectedPO?: PurchaseOrder;
  po_total = 0.0;
  po_subtotal = 0.0;
  po_tax = 0.0;

  constructor(private builder: FormBuilder, private vendorService: NewVendorService, private purchaseOrderService: PurchaseOrderService, private productService: ProductService) {
    this.vendorid = new FormControl('');
    this.purchaseorderid = new FormControl('');
    this.generatorForm = this.builder.group({
      vendorid: this.vendorid,
      purchaseorderid: this.purchaseorderid
    });
  }

  // Interface methods
  ngOnInit(): void {
    // Set up events
    this.onVendorChange();
    this.onPickPO();

    this.message = 'Loading vendors from server';
    this.getAllVendors();
  }

  ngOnDestroy(): void {
    if(this.subscriptionForm !== undefined)
      this.subscriptionForm.unsubscribe();
  }

  // Events
  onVendorChange(): void {
    this.subscriptionForm = this.generatorForm.get('vendorid')?.valueChanges.subscribe((value) => {
      this.selectedVendor = value;
      this.getVendorPurchaseOrders();
      this.selectedPO = undefined;
      this.po_total = 0.0;
      this.po_subtotal = 0.0;
      this.po_tax = 0.0;
    });
  }

  onPickPO(): void {
    this.subscriptionForm = this.generatorForm.get('purchaseorderid')?.valueChanges.subscribe((value) => {
      this.selectedPO = value;
      this.geAllProducts();
    });
  }

  getAllVendors(): void {
    this.vendorService.getAll().subscribe({
      next: (response: Vendor[]) => { this.allVendors = response; },
      error: (ex: Error) => { this.message = 'fetch [vendorService] failed:' + ex; },
      complete: () => { this.message = 'Vendors loaded!'; }
    });
  }

  getVendorPurchaseOrders(): void {
    if(this.selectedVendor?.id) {
      this.purchaseOrderService.getSome(this.selectedVendor.id).subscribe({
        next: (response: PurchaseOrder[]) => {
          for(let x of response) {
            x.podate = x.podate?.replace('@', 'T');
            const datePipe = new DatePipe('en-US');
            let newDate = datePipe.transform(x.podate, 'yyyy-MM-dd h:mm a')?.toString();
            if(newDate)
              x.podate = newDate;
          }
          this.vendorPOs = response;
        },
        error: (ex: Error) => { this.message = 'Fetch [getVendorPurchaseOrders] failed: ' + ex; },
        complete: () => {
          if(this.vendorPOs?.length === 0) {
            this.message = 'No Purchase Orders found';
            this.hasPurchaseOrders = false;
          }
          else {
            this.message = `${this.vendorPOs?.length} PO's for ${this.selectedVendor?.name} loaded!`;
            this.hasPurchaseOrders = true;
          }
        }
      });
    }
  }

  geAllProducts(): void {
    if(this.selectedPO?.id) {
      this.productService.getAll().subscribe({
        next: (response: Product[]) => {
          if(this.selectedPO?.items) {
            // Reset values
            this.po_subtotal = 0.0;
            this.po_tax = 0.0;
            this.po_total = 0.0;

            for(let x of this.selectedPO?.items) {
              let product = response.find(y => y.id === x.productid);
              if(product) {
                x.id = product.costprice;
                x.productname = product.name;
                this.po_subtotal += x.price * x.qty;
              }
            }
            // Calculate tax and total
            this.po_tax = this.po_subtotal * 0.13;
            this.po_total = this.po_tax + this.po_subtotal;
          }
        },
        error: (ex: Error) => { this.message = 'Fetch [geAllProducts] failed: ' + ex; },
        complete: () => {
          this.message = `details for PO ${this.selectedPO?.id}`;
        }
      });
    }
  }

   viewPdf(): void {
     window.open(`${PDFURL}${this.selectedPO?.id}`, '');
   } // viewPdf
}
