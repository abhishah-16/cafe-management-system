import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
import { GlobalConstants } from 'src/app/shared/global-constant';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit {
  displaycolumn: string[] = ['name', 'email', 'contactnumber', 'status']
  dataSource: any
  responsemessage: any
  constructor(
    private userservice: UserService,
    private snackbarservice: SnackbarService
  ) { }

  ngOnInit(): void {
    this.tableData()
  }

  tableData() {
    this.userservice.getUser().subscribe((response: any) => {
      this.dataSource = new MatTableDataSource(response)
      console.log(this.dataSource)
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

  handlechangeaction(status: any, id: any) {
    const data = {
      status: status.toString(),
      id: id
    }
    this.userservice.update(data).subscribe((res: any) => {
      this.responsemessage = res
      this.snackbarservice.opensnackbar(this.responsemessage, "success")
    }, (error: any) => {
      if (error.error) {
        this.tableData()
        this.responsemessage = error.error.text
      } else {
        this.responsemessage = GlobalConstants.genericerror
      }
      this.snackbarservice.opensnackbar(this.responsemessage, "")
    })
  }
}
