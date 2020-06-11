import { NgModule } from '@angular/core';
import { CounterpartyService } from './counterparty.service';
import { CounterpartyComponent } from './counterparty.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule, DatePipe } from '@angular/common';
import { CounterpartyDetailsComponent } from './counterparty-details/counterparty-details.component';
import { CounterpartyActionComponent } from './counterparty-action/counterparty-action.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CounterpartyActionFormService } from './counterparty-action/counterparty-action.form.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  imports: [
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  declarations: [
    CounterpartyComponent,
    CounterpartyDetailsComponent,
    CounterpartyActionComponent
  ],
  exports: [
    CounterpartyComponent,
    CounterpartyDetailsComponent,
    CounterpartyActionComponent
  ],
  providers: [
    CounterpartyService,
    CounterpartyActionFormService
  ]
})
export class CounterpartyModule{}
