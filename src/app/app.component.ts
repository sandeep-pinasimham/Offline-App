import { Component } from '@angular/core';
import { KeycloakProfile } from 'keycloak-js';
import { AuthService } from './user/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'offlineapp';
  isLoggedIn = true;
  public loggedIn: boolean = false;
  public userProfile: KeycloakProfile = {};

  logout() {
    this.auth.logout();
  }

  constructor(private auth: AuthService) {}

  async ngOnInit(): Promise<void> {
    localStorage.setItem('testList', JSON.stringify([]));

    this.loggedIn = await this.auth.isLoggedIn();
    if (this.loggedIn) {
      this.userProfile = await this.auth.loadUserProfile();
      console.log(this.userProfile);
    } else {
      this.auth.login();
    }
  }

  sideBarOpen = true;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
