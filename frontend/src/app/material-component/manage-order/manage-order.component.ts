import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BillService } from 'src/app/services/bill.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constant';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html',
  styleUrls: ['./manage-order.component.scss']
})
export class ManageOrderComponent implements OnInit {
  dataSource: any = []
  responsemessage: any
  manageorderForm: any = FormGroup
  displaycolumn: string[] = ['name', 'category', 'price', 'quantity', 'total', 'edit']
  categories: any = []
  products: any = []
  price: any
  totalAmount: number = 0
  constructor(
    private formbuilder: FormBuilder,
    private billservice: BillService,
    private snackbarservice: SnackbarService,
    private dialog: MatDialog,
    private router: Router,
    private categoryservice: CategoryService,
    private productservice: ProductService
  ) { }

  ngOnInit(): void {
    this.getCategories()
    this.manageorderForm = this.formbuilder.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required]],
      contactnumber: [null, [Validators.required]],
      paymentmethod: [null, [Validators.required]],
      product: [null, [Validators.required]],
      category: [null, [Validators.required]],
      quantity: [null, [Validators.required]],
      price: [null, [Validators.required]],
      total: [0, [Validators.required]]
    })
  }

  validatesubmit() {
    if(
      this.totalAmount === 0 ||
      this.manageorderForm.controls['name'].value == null ||
      this.manageorderForm.controls['email'].value == null ||
      this.manageorderForm.controls['contactnumber'].value == null ||
      this.manageorderForm.controls['paymentmethod'].value == null
    ){
      return true
    }else{
      return false
    }
  }

  getCategories() {
    this.categoryservice.getCategory().subscribe((response: any) => {
      this.categories = response
    }, (error: any) => {
      if (error) {
        console.log(error)
        this.responsemessage = error.error.text
      } else {
        this.responsemessage = GlobalConstants.genericerror
      }
      this.snackbarservice.opensnackbar(this.responsemessage, GlobalConstants.error)
    })
  }

  getProductByCategory(value: any) {
    this.productservice.getProductsByCategory(value.id).subscribe((response) => {
      this.products = response
      this.manageorderForm.controls['price'].setValue('')
      this.manageorderForm.controls['quantity'].setValue('')
      this.manageorderForm.controls['total'].setValue(0)
    }, (error: any) => {
      if (error) {
        console.log(error)
        this.responsemessage = error.error.text
      } else {
        this.responsemessage = GlobalConstants.genericerror
      }
      this.snackbarservice.opensnackbar(this.responsemessage, GlobalConstants.error)
    })
  }

  getProductDetails(value: any) {
    this.productservice.getProductById(value.id).subscribe((res: any) => {
      this.price = res[0].price
      this.manageorderForm.controls['price'].setValue(res[0].price)
      this.manageorderForm.controls['quantity'].setValue('1')
      this.manageorderForm.controls['total'].setValue(this.price)
    }, (error: any) => {
      if (error) {
        console.log(error)
        this.responsemessage = error.error.text
      } else {
        this.responsemessage = GlobalConstants.genericerror
      }
      this.snackbarservice.opensnackbar(this.responsemessage, GlobalConstants.error)
    })
  }

  setQuntity(value: any) {
    const temp = this.manageorderForm.controls['quantity'].value
    if (temp > 0) {
      this.manageorderForm.controls['total'].setValue(
        this.manageorderForm.controls['quantity'].value * this.manageorderForm.controls['price'].value
      )
    } else if (temp != '') {
      this.manageorderForm.controls['quantity'].setValue('1')
      this.manageorderForm.controls['total'].setValue(
        this.manageorderForm.controls['quantity'].value * this.manageorderForm.controls['price'].value
      )
    }
  }

  ValidateProductAdd() {
    if (this.manageorderForm.controls['total'].value == 0 || this.manageorderForm.controls['total'].value == null || this.manageorderForm.controls['quantity'].value <= 0) {
      return true
    } else {
      return false
    }
  }

  

  add() {
    const formData = this.manageorderForm.value
    const productName = this.dataSource.find((e: { id: number }) => e.id == formData.product.id)
    if (productName === undefined) {
      this.totalAmount += formData.total
      this.dataSource.push({
        id: formData.product.id,
        name: formData.product.name,
        category: formData.category.name,
        quantity: formData.quantity,
        price: formData.price,
        total: formData.total
      })
      // console.log(this.dataSource)
      // console.log(formData.category)
      this.dataSource = [...this.dataSource]
      const message = 'Product Added Suceessfully'
      this.snackbarservice.opensnackbar(message, "")
    } else {
      this.snackbarservice.opensnackbar(GlobalConstants.productexisterror, GlobalConstants.error)
    }
  }

  handledeleteaction(value: any, element: any) {
    this.totalAmount = this.totalAmount - element.total
    this.dataSource.splice(value, 1)
    this.dataSource = [...this.dataSource]
  }

  onSubmit() {
    const formData = this.manageorderForm.value
    // console.log(formData)
    const data = {
      name: formData.name,
      email: formData.email,
      contactnumber: formData.contactnumber,
      paymentmethod: formData.paymentmethod,
      totalAmount: this.totalAmount,
      productDetails: JSON.stringify(this.dataSource)
    }
    console.log(data)
    // console.log(JSON.stringify(this.dataSource))
    this.billservice.generateReport(data).subscribe((res: any) => {
      this.downloadFile(res?.uuid)
      this.manageorderForm.reset()
      this.dataSource = []
      this.totalAmount = 0
    }, (error: any) => {
      if (error) {
        console.log(error)
        this.responsemessage = error.error.text
      } else {
        this.responsemessage = GlobalConstants.genericerror
      }
      this.snackbarservice.opensnackbar(this.responsemessage, GlobalConstants.error)
    })
  }

  downloadFile(fileName: any) {
    const data = {
      uuid: fileName
    }
    this.billservice.getPdf(data).subscribe((res: any) => {
      saveAs(res, fileName + '.pdf')
    }, (error: any) => {
      if (error) {
        console.log(error)
        this.responsemessage = error.error.text
      } else {
        this.responsemessage = GlobalConstants.genericerror
      }
      this.snackbarservice.opensnackbar(this.responsemessage, GlobalConstants.error)
    })
  }

}
