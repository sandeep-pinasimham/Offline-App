import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { Auditor } from 'src/app/models/auditor';
import { RequestService } from 'src/app/service/request/request.service';
import { FormGroup, FormControl } from '@angular/forms';
import { DialogboxComponent } from '../dialogbox/dialogbox.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.scss'],
})
export class CreateRequestComponent implements OnInit {
  auditorsList: Auditor[] = [];

  constructor(
    public dialogRef: MatDialogRef<DialogboxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _requestService: RequestService,
    private _snackBar: MatSnackBar
  ) {}

  requestData = new FormGroup({
    seriesName: new FormControl(''),
    episodeNumber: new FormControl(''),
    auditor: new FormControl(''),
  });

  ngOnInit(): void {
    this._requestService.getAllAuditors().subscribe((auditors) => {
      this.auditorsList = auditors;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
    this._requestService.filter('Register Click');
  }
  closeDialog() {
    this.dialogRef.close();
    this._requestService.filter('Register Click');
  }

  onSubmit() {
    console.log(this.requestData.value);
    this._requestService
      .createRequest(this.requestData.value)
      .subscribe((dataaa) => {
        this.dialogRef.close();
        console.log(dataaa)
        this._requestService.filter('Register Click');
      });
  }

  openSnackBar() {
    this._snackBar.open('Created Requested', 'close', {
      duration: 2000,
      panelClass: ['mat-toolbar', 'mat-accent'],
    });
  }
}
