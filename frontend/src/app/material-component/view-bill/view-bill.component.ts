import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BillService } from 'src/app/services/bill.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constant';
import { ViewBillProductsComponent } from '../dialog/view-bill-products/view-bill-products.component';

@Component({
  selector: 'app-view-bill',
  templateUrl: './view-bill.component.html',
  styleUrls: ['./view-bill.component.scss']
})
export class ViewBillComponent implements OnInit {
  displaycolumn: string[] = ['name', 'email', 'contactnumber', 'paymentmethod', 'total', 'view']
  dataSource: any
  responsemessage: any
  constructor(
    private snackbarservice: SnackbarService,
    private dialog: MatDialog,
    private router: Router,
    private billservice: BillService
  ) { }

  ngOnInit(): void {
    this.tableData()
  }

  tableData() {
    this.billservice.getBill().subscribe((response: any) => {
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

  applyFilter(event: Event) {
    const filtervalue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filtervalue.trim().toLowerCase()
  }

  handleviewaction(value: any) {
    const dialogconfig = new MatDialogConfig()
    dialogconfig.data = {
      data: value
    }
    dialogconfig.width = "850px"
    const dialogref = this.dialog.open(ViewBillProductsComponent, dialogconfig)
    this.router.events.subscribe(() => {
      dialogref.close()
    })
  }

  handledownloadaction(value: any) {

  }
  handledeleteaction(value: any) {

  }
}
