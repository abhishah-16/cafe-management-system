import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constant';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ProductComponent } from '../product/product.component';
import { ConfirmationComponent } from '../confirmation/confirmation.component';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.scss']
})
export class ManageProductComponent implements OnInit {
  displaycolumn: string[] = ['name', 'categoryName', 'description', 'price', 'edit']
  dataSource: any
  responsemessage: any
  constructor(
    private productservice: ProductService,
    private snackbarservice: SnackbarService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.tableData()
  }

  handleaddaction() {
    const dialogconfig = new MatDialogConfig()
    dialogconfig.data = {
      action: 'Add'
    }
    dialogconfig.width = "850px"
    const dialogref = this.dialog.open(ProductComponent, dialogconfig)
    this.router.events.subscribe(() => {
      dialogref.close()
    })
    const sub = dialogref.componentInstance.onAddproduct.subscribe((res) => {
      this.tableData()
    })
  }

  handleeditaction(value: any) {
    const dialogconfig = new MatDialogConfig()
    dialogconfig.data = {
      action: 'Edit',
      data: value
    }
    dialogconfig.width = "850px"
    const dialogref = this.dialog.open(ProductComponent, dialogconfig)
    this.router.events.subscribe(() => {
      dialogref.close()
    })
    const sub = dialogref.componentInstance.onEditproduct.subscribe((res) => {
      this.tableData()
    })
  }

  handledeleteaction(value: any) {
    const dialogconfig = new MatDialogConfig()
    dialogconfig.data = {
      message: 'delete ' + value.name + ' product',
    }
    const dialogRef = this.dialog.open(ConfirmationComponent, dialogconfig)
    const sub = dialogRef.componentInstance.onemitstatuschange.subscribe((response: any) => {
      this.deleteProduct(value.id)
      dialogRef.close()
      this.tableData()
    })

  }

  deleteProduct(id: any) {
    this.productservice.deleteProduct(id).subscribe((response: any) => {
      this.tableData()
      this.responsemessage = response
      this.snackbarservice.opensnackbar(this.responsemessage, "")
    }, (error: any) => {
      if (error) {
        console.log(error)
        this.responsemessage = error.error.text
      } else {
        this.responsemessage = GlobalConstants.genericerror
      }
      this.snackbarservice.opensnackbar(this.responsemessage, "")
    })
  }

  onChange(status: any, id: any) {
    const data = {
      status: status.toString(),
      id: id
    }
    this.productservice.updateProductStatus(data).subscribe((response: any) => {
      this.responsemessage = response
      this.snackbarservice.opensnackbar(this.responsemessage, "")
    }, (error: any) => {
      if (error) {
        console.log(error)
        this.responsemessage = error.error.text
      } else {
        this.responsemessage = GlobalConstants.genericerror
      }
      this.snackbarservice.opensnackbar(this.responsemessage, "")
    })
  }

  applyFilter(event: Event) {
    const filtervalue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filtervalue.trim().toLowerCase()
  }
  
  tableData() {
    this.productservice.getProducts().subscribe((response: any) => {
      this.dataSource = new MatTableDataSource(response)
    }, (error: any) => {
      if (error.error) {
        this.responsemessage = error.error.text
      } else {
        this.responsemessage = GlobalConstants.genericerror
      }
      this.snackbarservice.opensnackbar(this.responsemessage, GlobalConstants.error)
    })
  }
}
