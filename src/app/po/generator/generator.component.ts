import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  selector: 'app-generator',
  standalone: true,
  imports: [CommonModule, MatComponentsModule, ReactiveFormsModule],
  templateUrl: './generator.component.html',
  styles: [
  ]
})
export class GeneratorComponent implements OnInit, OnDestroy {
  // form
  generatorForm: FormGroup;
  vendorid: FormControl;
  productid: FormControl;
  productqty: FormControl;

  // data
  formSubscription?: Subscription;
  products: Product[] = [];
  vendors: Vendor[] = []; // all employees
  vendorproducts: Product[] = []; // all expenses for a particular employee
  items: PurchaseOrderItem[] = []; // expense items that will be in report
  orderqtys: string[] = [];
  qty: number;
  selectedProducts: Product[] = []; // expenses that being displayed currently in app
  selectedProduct: Product; // the current selected expense
  selectedVendor: Vendor; // the current selected employee

  // misc
  pickedProduct: boolean;
  pickedVendor: boolean;
  pickedQty: boolean;
  generated: boolean;
  hasProducts: boolean;
  msg: string;
  total: number;
  tax: number;
  pono: number = 0;

  constructor(
    private builder: FormBuilder,
    private vendorService: NewVendorService,
    private productService: ProductService,
    private poService: PurchaseOrderService
  ) {
    this.pickedVendor = false;
    this.pickedProduct = false;
    this.pickedQty = false;
    this.qty = 0;
    this.generated = false;
    this.msg = '';
    this.vendorid = new FormControl('');
    this.productid = new FormControl('');
    this.productqty = new FormControl('');
    this.generatorForm = this.builder.group({
      productid: this.productid,
      vendorid: this.vendorid,
      productqty : this.productqty
    });
    this.selectedProduct = {
      id: "",
      vendorid: 0,
      name: "",
      costprice: 0,
      msrp: 0,
      rop: 0,
      eoq: 0,
      qoh: 0,
      qoo: 0,
      qrcode: "",
      qrcodetxt: "",
    }
    this.selectedVendor = {
      id: 0,
      address1: "",
      city: "",
      province: "",
      postalcode: "",
      phone: "",
      type: "",
      name: "",
      email: "",
    }
    this.hasProducts = false;
    this.total = 0.0;
    this.tax = 0.0;
  }

  ngOnInit(): void {
    this.onPickVendor(); // sets up subscription for dropdown click
    this.onPickProduct(); // sets up subscription for dropdown click
    this.onPickQty()
    this.msg = 'loading vendors from server...';
    this.getAllVendors();
  } // ngOnInit

  ngOnDestroy(): void {
    if (this.formSubscription !== undefined) {
      this.formSubscription.unsubscribe();
    }
  } // ngOnDestroy

  /**
  * getAllVendors - retrieve everything
  */
  getAllVendors(passedMsg: string = ''): void {
    this.vendorService.getAll().subscribe({
      // Create observer object
      next: (vendors: Vendor[]) => {
        this.vendors = vendors;
      },
      error: (err: Error) =>
        (this.msg = `Couldn't get vendors - ${err.message}`),
      complete: () =>
        passedMsg ? (this.msg = passedMsg) : (this.msg = `Vendors loaded!`),
    });
  } // getAllVendors

   /**
  * loadVendorProducts - retrieve a particular vendor's products
  */
   loadVendorProducts(): void {
    this.vendorproducts = [];
    this.productService.getSome(this.selectedVendor.id).subscribe({
      // observer object
      next: (products: Product[]) => {
        this.vendorproducts = products;
      },
      error: (err: Error) =>
        (this.msg = `product fetch failed! - ${err.message}`),
      complete: () => { },
    });
  } // loadVendorProducts

  /**
   * onPickVendor - Another way to use Observables, subscribe to the select change event
   * then load specific vendor products for subsequent selection
   */
  onPickVendor(): void {
    this.formSubscription = this.generatorForm
      .get('vendorid')
      ?.valueChanges.subscribe((val) => {
        this.selectedProduct = {
          id: "",
        vendorid: 0,
        name: "",
        costprice: 0,
        msrp: 0,
        rop: 0,
        eoq: 0,
        qoh: 0,
        qoo: 0,
        qrcode: "",
        qrcodetxt: "",
        };
        this.selectedVendor = val;
        this.loadVendorProducts();
        this.pickedProduct = false;
        this.pickedQty = false;
        this.hasProducts = false;
        this.msg = 'choose product for vendor';
        this.pickedVendor = true;
        this.generated = false;
        this.items = []; // array for the report
        this.selectedProducts = []; // array for the details in app html
      });
  } // onPickVendor

  /**
  * onPickProduct - subscribe to the select change event then
  * update array containing items.
  */
  onPickProduct(): void {
    const productSubscription = this.generatorForm
      .get('productid')
      ?.valueChanges.subscribe((val) => {
        this.selectedProduct = val;
        this.pickedProduct = true;
        this.orderqtys = ["EOQ", "0", "1", "2", "3", "4", "5"]
      });
    this.formSubscription?.add(productSubscription); // add it as a child, so all can be destroyed together
  }

  /**
   * onPickQty - subscribe to the select change event then
   * update array containing items.
   */
  onPickQty(): void {
    const qtySubscription = this.generatorForm
      .get('productqty')
      ?.valueChanges.subscribe((val) => {
        if (val === "EOQ")
          this.qty = this.selectedProduct.eoq;
        else
          this.qty = Number.parseInt(val);
        this.pickedQty = true;
        const item: PurchaseOrderItem = {
          id: 0,
          poid: 0,
          productid: this.selectedProduct?.id,
          qty: this.qty,
          price: (this.selectedProduct?.costprice),
          productname: ''
        };
        if (this.items.find((item) => item.productid === this.selectedProduct?.id)) {
          // update quantity
          if (this.qty > 0) {
              const index = this.items.findIndex((item) => item.productid === this.selectedProduct?.id);
              this.items[index].qty = this.qty;
              this.msg = `${this.qty} ${this.selectedProduct.name}(s) Added!`;
          } else {
            // delete item
            const index = this.items.findIndex((item) => item.productid === this.selectedProduct?.id)
            this.items = [...this.items.slice(0, index), ...this.items.slice(index + 1)]
            //this.items = this.items.splice(index, 1);
            this.msg = this.msg = `All ${this.selectedProduct.name} removed`;
          }
        } else {
          // add entry
          this.items.push(item);
          this.msg = `${this.qty} ${this.selectedProduct.name} Added!`;
        }
        if (this.items.length > 0) {
          this.hasProducts = true;
        } else {
          this.hasProducts = false;
        }
        this.total = 0.0;
        this.items.forEach((exp) => (this.total += (exp.price * exp.qty)));
        this.tax = this.total * 0.13
      });
      this.formSubscription?.add(qtySubscription);
  }

  /**
  * createPO - create the client side purchase order
  */
  createPO(): void {
    this.generated = false;
    const purchaseorder: PurchaseOrder = {
      id: 0,
      items: this.items,
      vendorid: this.selectedVendor.id,
      amount: this.total + this.tax,
      podate: ""
    };
    this.poService.create(purchaseorder).subscribe({
      // observer object
      next: (po: PurchaseOrder) => {
        // server should be returning report with new id
        po.id > 0
          ? (this.msg = `PO ${po.id} added!`)
          : (this.msg = 'PO not added! - server error');
        this.pono = po.id;
      },
      error: (err: Error) => (this.msg = `PO not added! - ${err.message}`),
      complete: () => {
        this.hasProducts = false;
        this.pickedProduct = false;
        this.pickedVendor = false;
        this.generated = true;
        this.pickedQty = false;
        this.qty = 0;
      },
    });
  } // createPO

  viewPdf(): void {
    window.open(`${PDFURL}${this.pono}`, '');
  } // viewPdf
}
