import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SnackbarService } from '../services/snackbar.service';
import { UserService } from '../services/user.service';
import { GlobalConstants } from '../shared/global-constant';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: any = FormGroup
  responsemessage: any
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userservice: UserService,
    private snackbarservice: SnackbarService,
    private dialogref: MatDialogRef<SignupComponent>) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.pattern(GlobalConstants.nameregex)]],
      email: [null, [Validators.required, Validators.pattern(GlobalConstants.emailregex)]],
      contactnumber: [null, [Validators.required, Validators.pattern(GlobalConstants.contactnumberregex)]],
      password: [null, [Validators.required]],
    })
  }
  onSubmit() {
    const formData = this.signupForm.value
    const data = {
      name: formData.name,
      email: formData.email,
      contactnumber: formData.contactnumber,
      password: formData.password
    }
    this.userservice.signup(data).subscribe((response: any) => {
      this.dialogref.close()
      this.responsemessage = response
      console.log(response)
      this.snackbarservice.opensnackbar(this.responsemessage, "")
      this.router.navigate(['/'])
    }, (error) => {
      // console.log(error.error)
      // if(error.error.text){
      //   this.responsemessage = error.error.text
      // }
      if (error) {
        console.log(error.error.text)
        if (error.error.text) {
          this.responsemessage = error.error.text
        } else {
          this.responsemessage = error.error
        }
        console.log(this.responsemessage)
      } else {
        console.log(this.responsemessage)
        this.responsemessage = GlobalConstants.genericerror
      }
      // this.responsemessage = GlobalConstants.genericerror
      console.log(this.responsemessage)
      this.snackbarservice.opensnackbar(this.responsemessage, "")
    })
  }
}
