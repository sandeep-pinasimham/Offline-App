import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { RequestListComponent } from './components/request-list/request-list.component';
import { CardComponent } from './components/card/card.component';
import { RouterModule } from '@angular/router';
import {
  MatDialogModule,
  MAT_DIALOG_DEFAULT_OPTIONS,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DialogboxComponent } from './components/dialogbox/dialogbox.component';
import { CreateRequestComponent } from './components/create-request/create-request.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DetailsComponent } from './components/details/details.component';
@NgModule({
  declarations: [
    RequestListComponent,
    CardComponent,
    DialogboxComponent,
    CreateRequestComponent,
    DetailsComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSelectModule,
    NgxPaginationModule,
    MatSnackBarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    RouterModule.forChild([]),
  ],
  exports: [RequestListComponent, CardComponent],
})
export class SharedModule {}
