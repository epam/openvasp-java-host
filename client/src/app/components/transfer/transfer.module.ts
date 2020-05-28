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
import { CreateTransferComponent } from './create-transfer/create-transfer.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TransferDetailsComponent } from './transfer-details/transfer-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateTransferFormService } from './create-transfer/create-transfer.form.service';
import { CreateTransferService } from './create-transfer/create-transfer.service';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    MatSelectModule
  ],
  declarations: [
    TransferComponent,
    TransferTableHeaderPipe,
    CreateTransferComponent,
    TransferDetailsComponent
  ],
  exports: [
    TransferComponent,
    CreateTransferComponent,
    TransferDetailsComponent
  ],
  providers: [
    CreateTransferService,
    CreateTransferFormService,
    TransferService,
    TransferTableHeaderPipe,
    MatSnackBar,
  ]
})

export class TransferModule {}
