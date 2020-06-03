import { NgModule } from '@angular/core';
import { VASPComponent } from './vasp.component';
import { VASPService } from './vasp.service';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  imports: [
    MatTableModule,
    MatProgressSpinnerModule,
    MatPaginatorModule
  ],
  declarations: [VASPComponent],
  exports: [VASPComponent],
  providers: [VASPService]
})
export class VASPModule{}
