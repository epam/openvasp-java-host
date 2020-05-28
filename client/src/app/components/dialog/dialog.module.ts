import { NgModule } from '@angular/core';
import { DialogConfirmComponent } from './dialog-confirm/dialog-confirm.component';
import { DialogService } from './dialog.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  imports: [
    MatButtonModule,
    MatDialogModule
  ],
  exports: [DialogConfirmComponent],
  declarations: [DialogConfirmComponent],
  providers: [DialogService]
})
export class DialogModule {}
