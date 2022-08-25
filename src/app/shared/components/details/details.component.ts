import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Actor } from 'src/app/models/actor';
import { DatastoreService } from 'src/app/service/datastore/datastore.service';
import { RequestService } from 'src/app/service/request/request.service';
import { filter, first } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  actors1: Actor[] = [];
  //auditorRequest = new FormGroup({});

  // requestList: string | null = '';

  // @Output() newItemEvent = new EventEmitter<string>();

  userData = JSON.parse(
    localStorage.getItem(`requestFormData${this.data.requestId}`) || '{}'
  );

  if(userData: any) {
    console.log(userData);
  }

  constructor(
    public dialogRef: MatDialogRef<DetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _requestService: RequestService,
    private _dataStore: DatastoreService,
    private _snackBar: MatSnackBar
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

  localData: any = {};

  ngOnInit(): void {
    //this.initializeForm();
    let auditForm: any = JSON.parse(
      localStorage.getItem(`requestFormData${this.data.requestId}`) || '{}'
    );

    this._requestService
      .getAllActors()
      .subscribe((actor: Actor[]) => [(this.actors1 = actor)]);
    this.auditorRequest.controls['actors'].setValue(auditForm.actors);
  }

  auditorRequest = new FormGroup({
    directorName: new FormControl(this.userData.directorName),
    actors: new FormControl(this.userData.actors),
    episodeDescription: new FormControl(this.userData.episodeDescription),
    genre: new FormControl(this.userData.genre),
    language: new FormControl(this.userData.language),
    producerName: new FormControl(this.userData.producerName),
    rating: new FormControl(this.userData.rating),
    seriesReleaseYear: new FormControl(this.userData.seriesReleaseYear),
  });

  closeDialog() {
    this.dialogRef.close();
  }

  openSnackBar() {
    this._snackBar.open('Updated Requested', 'close', {
      duration: 2000,
      panelClass: ['mat-toolbar', 'mat-accent'],
    });
  }

  onSubmit(event: any) {
    if (event.submitter.name == 'submitbtn') {
      console.log('submitbtn');
      console.log(this.auditorRequest.value);
      let requestObj = {
        requestId: this.data.requestId,
        seriesName: this.data.seriesName,
        directorName: this.auditorRequest.value.directorName,
        episodeNumber: this.data.episodeNumber,
        actors: this.auditorRequest.value.actors,
        createdBy: this.data.createdBy,
        createdAt: this.data.createdAt,
        episodeDescription: this.auditorRequest.value.episodeDescription,
        genre: this.auditorRequest.value.genre,
        language: this.auditorRequest.value.language,
        producerName: this.auditorRequest.value.producerName,
        rating: this.auditorRequest.value.rating,
        seriesReleaseYear: this.auditorRequest.value.seriesReleaseYear,
        status: 'Completed',
        deleted: true,
      };
      let actorsObj: any = [];

      requestObj.actors.forEach((actor: any) => {
        this.actors1.forEach((eachActor) => {
          if (actor == eachActor.actorId) {
            actorsObj.push(eachActor);
          }
        });
      });
      let updateObj = requestObj;
      updateObj.actors = actorsObj;
      this._requestService.updateRequest(updateObj).subscribe((some) => {
        alert('Updated the request');
        this.dialogRef.close(this.data);
        this._requestService.filter('Update Click');
      });
    } else if (event.submitter.name === 'savebtn') {
      let saveRequestObj = {
        requestId: this.data.requestId,
        seriesName: this.data.seriesName,
        directorName: this.auditorRequest.value.directorName,
        episodeNumber: this.data.episodeNumber,
        actors: this.auditorRequest.value.actors,
        createdBy: this.auditorRequest.value.createdBy,
        createdAt: this.auditorRequest.value.createdAt,
        episodeDescription: this.auditorRequest.value.episodeDescription,
        genre: this.auditorRequest.value.genre,
        language: this.auditorRequest.value.language,
        producerName: this.auditorRequest.value.producerName,
        rating: this.auditorRequest.value.rating,
        seriesReleaseYear: this.auditorRequest.value.seriesReleaseYear,
        status: 'In_Progress',
        deleted: true,
      };

      localStorage.setItem(
        `requestFormData${this.data.requestId}`,
        JSON.stringify(saveRequestObj)
      );
    }
  }
}
