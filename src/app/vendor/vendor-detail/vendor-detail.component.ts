import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';

import { ValidatePhone } from '@app/validators/phoneno.validator';
import { ValidatePostal } from '@app/validators/postalcode.validator';
import { Vendor } from '@app/vendor/vendor';
import { DeleteDialogComponent } from '@app/delete-dialog/delete-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-vendor-detail',
  templateUrl: './vendor-detail.component.html',
})
export class VendorDetailComponent implements OnInit{
  @Input() selectedVendor: Vendor = {
    id: 0,
    name: '',
    email: '',
    phone: '',
    address1: '',
    city: '',
    province: '',
    postalcode: '',
    type: ''
  };

  @Input() vendors: Vendor[] | null = null;
  @Output() cancelled = new EventEmitter();
  @Output() deleted = new EventEmitter();
  @Output() saved = new EventEmitter();

  vendorForm: FormGroup;
  name: FormControl;
  email: FormControl;
  phone: FormControl;
  address1: FormControl;
  city: FormControl;
  province: FormControl;
  postalcode: FormControl;
  type: FormControl;

  constructor(private builder: FormBuilder, private dialog: MatDialog) {
    this.name = new FormControl('', Validators.compose([Validators.required]));
    this.email = new FormControl('', Validators.compose([Validators.required, Validators.email]));
    this.phone = new FormControl('', Validators.compose([Validators.required, ValidatePhone]));
    this.address1 = new FormControl('', Validators.compose([Validators.required]));
    this.city = new FormControl('', Validators.compose([Validators.required]));
    this.province = new FormControl('', Validators.compose([Validators.required]));
    this.postalcode = new FormControl('', Validators.compose([Validators.required, ValidatePostal]));
    this.type = new FormControl('', Validators.compose([Validators.required]));

    this.vendorForm = new FormGroup({
      name: this.name,
      email: this.email,
      phone: this.phone,
      address1: this.address1,
      city: this.city,
      province: this.province,
      postalcode: this.postalcode,
      type: this.type,
    });
  }

  ngOnInit(): void {
      //patchValue doesn't care if all values present
      this.vendorForm.patchValue({
        name: this.selectedVendor.name,
        email: this.selectedVendor.email,
        phone: this.selectedVendor.phone,
        address1: this.selectedVendor.address1,
        city: this.selectedVendor.city,
        province: this.selectedVendor.province,
        postalcode: this.selectedVendor.postalcode,
        type: this.selectedVendor.type,
      });
  } // ngOnInit

  updateSelectedVendor(): void {
    this.selectedVendor.name = this.vendorForm.value.name;
    this.selectedVendor.email = this.vendorForm.value.email;
    this.selectedVendor.phone = this.vendorForm.value.phone;
    this.selectedVendor.address1 = this.vendorForm.value.address1;
    this.selectedVendor.city = this.vendorForm.value.city;
    this.selectedVendor.province = this.vendorForm.value.province;
    this.selectedVendor.postalcode = this.vendorForm.value.postalcode;
    this.selectedVendor.type = this.vendorForm.value.type;
    this.saved.emit(this.selectedVendor);
  }

  openDeleteDialog(selectedVendor: Vendor): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.data = {
      title: `Delete Vendor ${this.selectedVendor.id}`,
      entityname: 'vendor'
    };
    dialogConfig.panelClass = 'customdialog';
    const dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleted.emit(this.selectedVendor);
      }
    });
  } // openDeleteDialog
} // VendorDetailComponent
