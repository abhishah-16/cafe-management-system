import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { LoginComponent } from '../login/login.component';
import { UserService } from '../services/user.service';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private userservice: UserService) { }

  ngOnInit(): void {
    if (localStorage.getItem('token') != null) {
      this.userservice.checktoken().subscribe((response:any) => {
        this.router.navigate(['/cafe/dashboard'])
      },(error:any) => {
        console.log(error)
      })
    }
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
