import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-material-modal',
  templateUrl: './material-modal.component.html',
  styleUrls: ['./material-modal.component.scss']
})
export class MaterialModalComponent implements OnInit {
  
  form: FormGroup;
  description:string;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<MaterialModalComponent>,
    @Inject(MAT_DIALOG_DATA) {description,longDescription,
        category}:any ) {

    this.description = description;


    this.form = fb.group({
        description: [description, Validators.required],
        category: [category, Validators.required],
        longDescription: [longDescription,Validators.required]
    });

}

  ngOnInit() {
    
  }

  save() {
      this.dialogRef.close(this.form.value);
  }

  close() {
      this.dialogRef.close();
  }
}