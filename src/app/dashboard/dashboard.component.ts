import { Component, OnInit } from '@angular/core';
import { CreateRequestComponent } from '../shared/components/create-request/create-request.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../user/auth.service';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  requests: any[] = [];
  public userProfile: KeycloakProfile = {};
  activeRole: any = '';
  constructor(
    private dialog: MatDialog,
    private auth: AuthService,
    private _keycloakService: KeycloakService
  ) {}

  async ngOnInit(): Promise<void> {
    this.userProfile = await this.auth.loadUserProfile();
    let fname = this.userProfile.firstName;
    console.log(fname);

    this.activeRole = this.getTheNames();
    console.log(this.activeRole);

    // if (activeRole === 'manager') {
    //   this._requestService
    //     .getAllRequestsForManager(fname)
    //     .subscribe((request: any[]) => {
    //       console.log(request);
    //       this.requests = request;
    //     });
    // } else if (activeRole === 'auditor') {
    //   this._requestService
    //     .getAllRequestsForAuditor(fname)
    //     .subscribe((request: any[]) => {
    //       console.log(request);
    //       this.requests = request;
    //     });
    // }
  }

  createRequesOpenModel = () => {
    this.dialog.open(CreateRequestComponent, {
      width: '500px',
      height: '500px',
    });
  };

  getTheNames(): string | undefined {
    let roles =
      this._keycloakService.getKeycloakInstance().realmAccess?.['roles'];
    console.log(roles);

    if (roles?.indexOf('auditor') != -1) {
      return 'auditor';
    } else if (roles?.indexOf('manager') != -1) {
      return 'manager';
    }
    return 'auditor';
  }
}
