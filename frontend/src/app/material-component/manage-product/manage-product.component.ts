import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constant';
import { MatTable, MatTableDataSource } from '@angular/material/table';

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

  }
  handleeditaction(value: any) {

  }
  handledeleteaction(value: any) {

  }
  onChange(status:any,id:any){

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
