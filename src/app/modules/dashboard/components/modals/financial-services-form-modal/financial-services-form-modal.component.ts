import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FsService } from 'src/app/core/services/financial-services/fs.service';
import { RefreshDataService } from 'src/app/core/services/shared/refresh-data.service';
import { mimeType } from 'src/app/shared/helpers/mime-type.validator';

@Component({
  selector: 'app-financial-services-form-modal',
  templateUrl: './financial-services-form-modal.component.html',
  styleUrls: ['./financial-services-form-modal.component.scss']
})
export class FinancialServicesFormModalComponent implements OnInit {
  public fsForm: FormGroup = <FormGroup>{};
  public imgPreview: string = <string>('');
  public imgSaved: boolean = true;
  public fileName: string = <string>('');
  public submitting: boolean = false;

  constructor(private dialogRef: MatDialogRef<FinancialServicesFormModalComponent>,
              private snackBar: MatSnackBar,
              private refreshDataService: RefreshDataService,
              private fsService: FsService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }

  cancelImg() {
    this.imgPreview = '';
    this.imgSaved = true;
  }

  saveImg() {
    this.imgSaved = true;
  }

  onImagePicked(event: any) {
    const file = (event.target as HTMLInputElement).files![0];
    this.fileName = file.name;
    this.fsForm.controls['imgName'].setValue(this.fileName);
    this.fsForm.patchValue({receiptImg: file});
    this.fsForm.get('receiptImage')?.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imgPreview = reader.result as string;
    };
    reader.readAsDataURL(file);
    this.imgSaved = false;
  }

  getFormErrors(el: string) {
    switch(el) {
      case 'receiptPurpose':
        if (this.fsForm.controls['receiptPurpose'].hasError('required')) {
          return 'Purpose of receipt is required.';
        }
        else return;
      case 'firstName':
        if (this.fsForm.controls['firstName'].hasError('required')) {
          return 'Your first name is required.';
        }
        else return;
      case 'lastName':
        if (this.fsForm.controls['lastName'].hasError('required')) {
          return 'Your last name is required';
        }
        else return;
      default:
        return
    }
  }

  createForm() {
    this.fsForm = this.fb.group({
      'receiptPurpose': ['', [Validators.required]],
      'receiptImg': new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      }),
      'imgName': [''],
      'firstName': ['', [Validators.required]],
      'lastName': ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.fsForm.invalid) {
      return
    }
    this.fsService.addFinancialService(
      this.fsForm.value.receiptPurpose,
      this.fsForm.value.receiptImg,
      this.fsForm.value.imgName,
      this.fsForm.value.firstName,
      this.fsForm.value.lastName).subscribe(data => {
      if (data.success) {
        this.refreshDataService.refreshData(true);
        this.dialogRef.close();
        this.snackBar.open('Data submitted successfully!', 'Dismiss', {
          duration: 1000
        });
      }
    });
  }
}
