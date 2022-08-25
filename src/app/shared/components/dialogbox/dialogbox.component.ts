import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { DatastoreService } from 'src/app/service/datastore/datastore.service';
import { first } from 'rxjs';
@Component({
  selector: 'app-dialogbox',
  templateUrl: './dialogbox.component.html',
  styleUrls: ['./dialogbox.component.scss'],
})
export class DialogboxComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogboxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _dataStore: DatastoreService
  ) {}

  onSubmitReason = new EventEmitter();
  previous() {
    // this.data.button = 'prev';
    // console.log(this.data);
    this.onSubmitReason.emit(this.data);

    this.data.button = 'prev';
    this._dataStore.setprevNextData(this.data);
    this._dataStore
      .getSubject()
      .pipe(first())
      .subscribe((dat) => {
        this.data = dat;
      });
  }
  goToNext = () => {
    this.data.button = 'next';
    this._dataStore.setprevNextData(this.data);
    this._dataStore
      .getSubject()
      .pipe(first())
      .subscribe((dat) => {
        // console.log('prev', dat);
        this.data = dat;
      });
  };

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
