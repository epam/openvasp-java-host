import { NgModule } from '@angular/core';
import { CounterpartyService } from './counterparty.service';
import { CounterpartyComponent } from './counterparty.component';
// import { CounterpartyDetailsComponent } from './counterparty-details/counterparty-details.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { CounterpartyDetailsComponent } from './counterparty-details/counterparty-details.component';

@NgModule({
  imports: [
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    CommonModule
  ],
  declarations: [
    CounterpartyComponent,
    CounterpartyDetailsComponent
  ],
  exports: [
    CounterpartyComponent,
    CounterpartyDetailsComponent
  ],
  providers: [CounterpartyService]
})
export class CounterpartyModule{}
