import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { DialogboxComponent } from '../dialogbox/dialogbox.component';
import { DetailsComponent } from '../details/details.component';
import { RequestService } from 'src/app/service/request/request.service';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { AuthService } from 'src/app/user/auth.service';
import { DatastoreService } from 'src/app/service/datastore/datastore.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() parentData: any = {};
  activeRole: any = '';

  dialogData: any;

  @Output() newItemEvent = new EventEmitter<any>();
  addNewItem(value: string) {
    this.newItemEvent.emit(this.dialogData);
  }

  constructor(
    private dialog: MatDialog,
    private auth: AuthService,
    private _requestService: RequestService,
    private _keycloakService: KeycloakService,
    private _dataStore: DatastoreService
  ) {}

  public userProfile: KeycloakProfile = {};

  async ngOnInit(): Promise<void> {
    this.userProfile = await this.auth.loadUserProfile();
    let fname = this.userProfile.firstName;
    console.log(fname);

    this.activeRole = this.getTheNames();
  }

  viewMore = (parentData: any) => {
    this.dialog.open(DialogboxComponent, {
      width: '650px',
      height: '650px',
      data: parentData,
    });
  };

  AddMoreDetails = (parentData: any) => {
    this.parentData.status = 'In_Progress';

    this._requestService.updateRequest(this.parentData).subscribe((some) => {
      this._requestService.filter('Update Click');
    });

    const dialogRef = this.dialog.open(DetailsComponent, {
      width: '900px',
      height: '700px',
      data: parentData,
    });

    dialogRef.componentInstance.onSubmitReason.subscribe((reason) => {
      this.dialogData = reason;
      this._dataStore.setData(reason);
    });
  };

  getTheNames(): string | undefined {
    let roles =
      this._keycloakService.getKeycloakInstance().realmAccess?.['roles'];

    if (roles?.indexOf('auditor') != -1) {
      return 'auditor';
    } else if (roles?.indexOf('manager') != -1) {
      return 'manager';
    }
    return 'auditor';
  }
}
