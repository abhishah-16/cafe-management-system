import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
import { GlobalConstants } from 'src/app/shared/global-constant';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {
  changepasswordForm: any = FormGroup
  responsemessage: any
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private userservice: UserService,
    private snackbarservice: SnackbarService,
    private dialogref: MatDialogRef<ChangepasswordComponent>) { }

  ngOnInit(): void {
    this.changepasswordForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(GlobalConstants.emailregex)]],
      oldpassword: [null, [Validators.required]],
      newpassword: [null, [Validators.required]],
    })
  }

  onSubmit() {
    const formData = this.changepasswordForm.value
    const data = {
      email: formData.email,
      oldpassword: formData.oldpassword,
      newpassword: formData.newpassword
    }
    this.userservice.changePassword(data).subscribe((response: any) => {
      this.dialogref.close()
      this.responsemessage = response
      this.snackbarservice.opensnackbar(this.responsemessage, "")
    }, (error: any) => {
      if (error) {
        this.responsemessage = error.error.text
      } else {
        this.responsemessage = GlobalConstants.genericerror
      }
      this.snackbarservice.opensnackbar(this.responsemessage, GlobalConstants.error)
    })
  }
}
