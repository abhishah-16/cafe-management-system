import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ChangepasswordComponent } from 'src/app/material-component/changepassword/changepassword.component';
import { ConfirmationComponent } from 'src/app/material-component/confirmation/confirmation.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class AppHeaderComponent {
  role: any;
  constructor(
    private router: Router,
    private dialog: MatDialog) {
  }

  logout() {
    const dialogconfig = new MatDialogConfig()
    dialogconfig.data = {
      message: 'Logout'
    }
    const dialogref = this.dialog.open(ConfirmationComponent, dialogconfig)
    const sub = dialogref.componentInstance.onemitstatuschange.subscribe((user) => {
      dialogref.close()
      localStorage.clear()
      this.router.navigate(['/'])
    })
  }

  changepassword() {
    const dialogconfig = new MatDialogConfig()
    dialogconfig.width = "550px"
    this.dialog.open(ChangepasswordComponent, dialogconfig)
  }
}
