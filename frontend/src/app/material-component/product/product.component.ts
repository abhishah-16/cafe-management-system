import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constant';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  onAddproduct = new EventEmitter()
  onEditproduct = new EventEmitter()
  onDeleteproduct = new EventEmitter()
  productForm: any = FormGroup
  dialogaction: any = 'Add'
  action: any = 'Add'
  responsemessage: any
  categories: any = []
  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogdata: any,
    private snackbarservice: SnackbarService,
    private dialog: MatDialogRef<ProductComponent>,
    private router: Router,
    private productservice: ProductService,
    private formbuider: FormBuilder,
    private categoryservice: CategoryService,
  ) { }

  ngOnInit(): void {
    this.productForm = this.formbuider.group({
      name: [null, [Validators.required]],
      categoryid: [null, Validators.required],
      description: [null, Validators.required],
      price: [null, Validators.required],
    })
    if (this.dialogdata.action === 'Edit') {
      this.dialogaction = 'Edit'
      this.action = 'Update'
      this.productForm.patchValue(this.dialogdata.data)
    }
    this.getAllCategories()
  }

  getAllCategories() {
    this.categoryservice.getCategory().subscribe((response: any) => {
      this.categories = response
    }, (error: any) => {
      if (error) {
        console.log(error)
        this.dialog.close()
        this.responsemessage = error.error.text
      } else {
        this.responsemessage = GlobalConstants.genericerror
      }
      this.snackbarservice.opensnackbar(this.responsemessage, GlobalConstants.error)
    })
  }

  onSubmit() {
    if (this.dialogdata.action === 'Edit') {
      this.edit()
    } else {
      this.add()
    }
  }
  add() {
    const formData = this.productForm.value
    const data = {
      name: formData.name,
      categoryid: formData.categoryid,
      description: formData.description,
      price: formData.price
    }

    this.productservice.addProduct(data).subscribe((response: any) => {
      this.dialog.close()
      this.responsemessage = response?.message
      // this.onAddproduct.emit()
      this.snackbarservice.opensnackbar(this.responsemessage, "")
    }, (error: any) => {
      if (error) {
        console.log(error)
        this.dialog.close()
        this.onAddproduct.emit()
        this.responsemessage = error.error.text
      } else {
        this.responsemessage = GlobalConstants.genericerror
      }
      this.snackbarservice.opensnackbar(this.responsemessage, "")
    })
  }
  edit() {
    const formData = this.productForm.value
    const data = {
      id: this.dialogdata.data.id,
      name: formData.name,
      categoryid: formData.categoryid,
      description: formData.description,
      price: formData.price
    }
    this.productservice.updateProduct(data).subscribe((response: any) => {
      this.dialog.close()
      this.responsemessage = response?.message
      this.onEditproduct.emit()
      this.snackbarservice.opensnackbar(this.responsemessage, "")
    }, (error: any) => {
      if (error) {
        console.log(error)
        this.onEditproduct.emit()
        this.dialog.close()
        this.responsemessage = error.error.text
      } else {
        this.responsemessage = GlobalConstants.genericerror
      }
      this.snackbarservice.opensnackbar(this.responsemessage, "")
    })
  }
}
