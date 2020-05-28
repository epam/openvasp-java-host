import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { TransferComponent } from './transfer.component';
import { TransferService } from './transfer.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { TransferTableHeaderPipe } from '../../shared/pipes/transfer-table-header.pipe';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TransferActionComponent } from './transfer-action/transfer-action.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TransferDetailsComponent } from './transfer-details/transfer-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TransferActionFormService } from './transfer-action/transfer-action.form.service';
import { TransferActionService } from './transfer-action/transfer-action.service';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TransferDetailsService } from './transfer-details/transfer-details.service';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatSelectModule,
    MatIconModule,
    MatTooltipModule
  ],
  declarations: [
    TransferComponent,
    TransferTableHeaderPipe,
    TransferActionComponent,
    TransferDetailsComponent
  ],
  exports: [
    TransferComponent,
    TransferActionComponent,
    TransferDetailsComponent
  ],
  providers: [
    TransferActionService,
    TransferActionFormService,
    TransferService,
    TransferDetailsService,
    TransferTableHeaderPipe,
    MatSnackBar,
  ]
})

export class TransferModule {}
