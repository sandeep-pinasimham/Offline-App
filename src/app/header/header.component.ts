import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakProfile } from 'keycloak-js';
import { AuthService } from '../user/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router, private auth: AuthService) {}
  isLoggedIn = true;
  public loggedIn: boolean = false;
  public userProfile: KeycloakProfile = {};
  firstName: string | undefined;

  logout() {
    this.auth.logout();
  }

  async ngOnInit(): Promise<void> {
    this.loggedIn = await this.auth.isLoggedIn();
    if (this.loggedIn) {
      this.userProfile = await this.auth.loadUserProfile();

      // console.log(this.userProfile);
      this.firstName = this.userProfile.firstName;
    } else {
      this.auth.login();
    }
  }

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }
}
