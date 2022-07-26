import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  signupaction() {
    const dialogconfig = new MatDialogConfig()
    dialogconfig.width = "550px"
    this.dialog.open(SignupComponent, dialogconfig)
  }
  forgotPasswordaction() {
    const dialogconfig = new MatDialogConfig()
    dialogconfig.width = "550px"
    this.dialog.open(ForgotPasswordComponent, dialogconfig)
  }
  loginaction() {
    const dialogconfig = new MatDialogConfig()
    dialogconfig.width = "550px"
    this.dialog.open(LoginComponent, dialogconfig)
  }
}
