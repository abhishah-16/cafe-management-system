import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constant';
import { CategoryComponent } from '../category/category.component';

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.scss']
})
export class ManageCategoryComponent implements OnInit {
  displaycolumn: string[] = ['name', 'edit']
  dataSource: any
  responsemessage: any
  constructor(
    private categoryservice: CategoryService,
    private snackbarservice: SnackbarService,
    private dialog: MatDialog,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.tableData()
  }

  applyFilter(event: Event) {
    const filtervalue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filtervalue.trim().toLowerCase()
  }

  handleaddaction() {
    const dialogconfig = new MatDialogConfig()
    dialogconfig.data = {
      action: 'Add'
    }
    dialogconfig.width = "850px"
    const dialogref = this.dialog.open(CategoryComponent, dialogconfig)
    this.router.events.subscribe(() => {
      dialogref.close()
    })

    // this.tableData()
  }
  handleeditaction(value: any) {
    const dialogconfig = new MatDialogConfig()
    dialogconfig.data = {
      action: 'Edit',
      data: value
    }
    dialogconfig.width = "850px"
    const dialogref = this.dialog.open(CategoryComponent, dialogconfig)
    this.router.events.subscribe(() => {
      dialogref.close()
    })
    const sub = dialogref.componentInstance.onEditcategory.subscribe((res) => {
      // console.log(res)
      // this.tableData()
    })
    // this.categoryservice.getCategory().subscribe((response: any) => {
    //   console.log(response)
    // })
  }

  tableData() {
    this.categoryservice.getCategory().subscribe((response: any) => {
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
