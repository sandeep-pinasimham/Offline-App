import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatDividerModule } from '@angular/material/divider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedRoutingModule } from './shared/shared-routing.module';
// import { ListComponent } from './list/list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { MatButtonModule } from '@angular/material/button';
import { RequestListComponent } from './shared/components/request-list/request-list.component';
import { CardComponent } from './shared/components/card/card.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';
import { AuthGuard } from './user/auth.guard';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavComponent,
    HomeComponent,
    DashboardComponent,
    // ListComponent,
    // RequestListComponent,
    // CardComponent,
  ],
  imports: [
    BrowserModule,
    MatDividerModule,
    AppRoutingModule,
    MatMenuModule,
    MatSnackBarModule,
    NgxPaginationModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    SharedRoutingModule,
    MatListModule,
    HttpClientModule,
    SharedModule,
    UserModule,
    // RequestListComponent,
    // CardComponent,
    UserModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [AuthGuard],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],

  bootstrap: [AppComponent],
})
export class AppModule {}
