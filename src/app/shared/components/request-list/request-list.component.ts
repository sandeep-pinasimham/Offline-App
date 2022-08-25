import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { RequestService } from 'src/app/service/request/request.service';
import { Request } from 'src/app/models/request';
import { AuthService } from 'src/app/user/auth.service';
import { KeycloakProfile } from 'keycloak-js';
import { KeycloakService } from 'keycloak-angular';
import { last, filter, Observable, Subject, Subscription } from 'rxjs';
import { CardComponent } from '../card/card.component';
import { DatastoreService } from 'src/app/service/datastore/datastore.service';
@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.scss'],
})
export class RequestListComponent implements OnInit {
  requests!: any;
  pageSize: number = 6;
  pageNumber: number = 1;
  childData: any;
  prevData: any;

  prevButton: string = '';

  public userProfile: KeycloakProfile = {};

  constructor(
    private _requestService: RequestService,
    private auth: AuthService,
    private _keycloakService: KeycloakService,
    private _datastoreService: DatastoreService
  ) {
    this._requestService.listen().subscribe((m: any) => {
      console.log(m);
      this.getDetails();
    });

    this._datastoreService
      .getprevNextData()

      .subscribe((datass) => {
        if (datass.button === 'prev') {
          const index = this.requests.findIndex((request: any) => {
            return request.requestId === datass.requestId;
          });
          if (this.requests[index - 1]) {
            this._datastoreService.setSubject(this.requests[index - 1]);
          } else {
            this._datastoreService.setSubject(this.requests[index]);
          }
        } else if (datass.button === 'next') {
          const index = this.requests.findIndex((request: any) => {
            return request.requestId === datass.requestId;
          });
          if (this.requests[index + 1]) {
            this._datastoreService.setSubject(this.requests[index + 1]);
          } else {
            this._datastoreService.setSubject(this.requests[index]);
          }
        }
      });

    // this._datastoreService.getData().subscribe((data) => {
    //   if (data) {
    //     // console.log(data);

    //     const res = this.requests.findIndex((request: any) => {
    //       return request.requestId === data.requestId;
    //     });
    //     console.log(res);
    //     // console.log('mani', this.requests[res]);

    //     this._datastoreService.prevNextSubject.next(this.requests[res + 1]);

    //     this.prevData = this.requests[res];
    //     if (data.button === 'prev') {
    //       this.prevButton = res;
    //     }
    //   }
    // });
  }

  async ngOnInit(): Promise<void> {
    this.userProfile = await this.auth.loadUserProfile();
    let fname = this.userProfile.firstName;
    console.log(fname);

    let activeRole = this.getTheNames();
    console.log(activeRole);

    if (activeRole === 'manager') {
      this._requestService
        .getAllRequestsForManager(fname)
        .subscribe((request: any[]) => {
          console.log(request);
          this.requests = request;
        });
    } else if (activeRole === 'auditor') {
      this._requestService
        .getAllRequestsForAuditor(fname)
        // .pipe(filter((request: any) => request.status !== 'Completed'))
        .subscribe((request: any[]) => {
          if (request) {
            const updateDat = request.filter(
              (item: any) => item.status !== 'Completed'
            );

            this.requests = updateDat;
          }
        });
    }
  }

  getDetails = async () => {
    this.userProfile = await this.auth.loadUserProfile();
    let fname = this.userProfile.firstName;
    console.log(fname);

    let activeRole = this.getTheNames();
    console.log(activeRole);

    if (activeRole === 'manager') {
      this._requestService
        .getAllRequestsForManager(fname)
        .subscribe((request: any[]) => {
          console.log(request);
          this.requests = request;
        });
    } else if (activeRole === 'auditor') {
      this._requestService
        .getAllRequestsForAuditor(fname)
        // .pipe(filter((request: any) => request.status !== 'Completed'))
        .subscribe((request: any[]) => {
          if (request) {
            const updateDat = request.filter(
              (item: any) => item.status !== 'Completed'
            );

            this.requests = updateDat;
          }
        });
    }
  };

  getTheNames(): string | undefined {
    let roles =
      this._keycloakService.getKeycloakInstance().realmAccess?.['roles'];
    // console.log(roles);

    if (roles?.indexOf('auditor') != -1) {
      return 'auditor';
    } else if (roles?.indexOf('manager') != -1) {
      return 'manager';
    }
    return 'auditor';
  }
}
