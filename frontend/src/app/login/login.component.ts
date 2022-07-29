import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SnackbarService } from '../services/snackbar.service';
import { UserService } from '../services/user.service';
import { GlobalConstants } from '../shared/global-constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: any = FormGroup
  responsemessage: any
  constructor(
    private formbuilder: FormBuilder,
    private userservice: UserService,
    private dialogref: MatDialogRef<LoginComponent>,
    private snackbarservice: SnackbarService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      email: [null, [Validators.required, Validators.pattern(GlobalConstants.emailregex)]],
      password: [null, [Validators.required]],
    })
  }

  onSubmit() {
    const formData = this.loginForm.value
    const data = {
      email: formData.email,
      password: formData.password
    }
    this.userservice.login(data).subscribe((response: any) => {
      this.responsemessage = response
      this.dialogref.close()
      localStorage.setItem('token', response.token)
      this.router.navigate(['/cafe/dashboard'])
    }, (error) => {
      if (error.error) {
        this.dialogref.close()
        this.responsemessage = error.error
      } else {
        this.responsemessage = GlobalConstants.genericerror
      }
      this.snackbarservice.opensnackbar(this.responsemessage, GlobalConstants.error)
    })
  }
}
