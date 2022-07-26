import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from '../services/snackbar.service';
import { UserService } from '../services/user.service';
import { GlobalConstants } from '../shared/global-constant';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotpasswordForm: any = FormGroup
  responsemessage: any
  constructor(private formbuilder: FormBuilder,
    private userservice: UserService,
    private dialogref: MatDialogRef<ForgotPasswordComponent>,
    private snackbarservice: SnackbarService) { }

  ngOnInit(): void {
    this.forgotpasswordForm = this.formbuilder.group({
      email: [null, [Validators.required, Validators.pattern(GlobalConstants.emailregex)]],
    })
  }
  onSubmit() {
    const formData = this.forgotpasswordForm.value
    const data = {
      email: formData.email
    }
    this.userservice.forgotpassword(data).subscribe((response) => {
      this.responsemessage = response
      this.dialogref.close()
      this.snackbarservice.opensnackbar(this.responsemessage, "")
    }, (error) => {
      if (error.error.text) {
        this.responsemessage = error.error.text
      } else {
        console.log(this.responsemessage)
        this.responsemessage = GlobalConstants.genericerror
      }
      this.snackbarservice.opensnackbar(this.responsemessage, "")
    })
  }
}
