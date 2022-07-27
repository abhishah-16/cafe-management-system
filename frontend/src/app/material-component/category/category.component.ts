import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constant';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  onAddcategory = new EventEmitter()
  onEditcategory = new EventEmitter()
  categoryForm: any = FormGroup
  dialogaction: any = 'Add'
  action: any = 'Add'
  responsemessage: any
  constructor(@Inject(MAT_DIALOG_DATA) public dialogdata: any,
    private formbuider: FormBuilder,
    private categoryservice: CategoryService,
    private snackbarservice: SnackbarService,
    private dialog: MatDialogRef<CategoryComponent>,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.categoryForm = this.formbuider.group({
      name: [null, [Validators.required]]
    })
    if (this.dialogdata.action === 'Edit') {
      this.dialogaction = 'Edit'
      this.action = 'Update'
      this.categoryForm.patchValue(this.dialogdata.data)
    }
  }
  onSubmit() {
    if (this.dialogdata.action === 'Edit') {
      this.edit()
    } else {
      this.add()
    }
  }

  add() {
    const formData = this.categoryForm.value
    const data = {
      name: formData.name

    }
    this.categoryservice.addCategory(data).subscribe((response: any) => {
      this.dialog.close()
      this.responsemessage = response?.message
      this.onAddcategory.emit()
      this.snackbarservice.opensnackbar(this.responsemessage, "")
    }, (error: any) => {
      if (error) {
        console.log(error)
        this.onAddcategory.emit()
        this.dialog.close()
        this.responsemessage = error.error.text
      } else {
        this.responsemessage = GlobalConstants.genericerror
      }
      this.snackbarservice.opensnackbar(this.responsemessage, "")
    })
  }

  edit() {
    const formData = this.categoryForm.value
    const data = {
      id: this.dialogdata.data.id,
      name: formData.name,
    }
    // console.log(data)
    this.categoryservice.updateCategory(data).subscribe((response: any) => {
      this.dialog.close();
      this.responsemessage = response;
      this.onEditcategory.emit();
      this.snackbarservice.opensnackbar(this.responsemessage, "");
    }, (error: any) => {
      if (error) {
        this.dialog.close();
        this.onEditcategory.emit();
        this.responsemessage = error.error.text;
      } else {
        this.responsemessage = GlobalConstants.genericerror;
      }
      this.snackbarservice.opensnackbar(this.responsemessage, "success");
    })
  }

}
