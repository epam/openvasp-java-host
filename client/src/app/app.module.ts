import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './core/interceptors/auth.interceptor';
import { TransferModule } from './components/transfer/transfer.module';
import { CommonModule } from '@angular/common';
import { TransferTableHeaderPipe } from './shared/pipes/transfer-table-header.pipe';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DialogService } from './components/dialog/dialog.service';
import { CounterpartyModule } from './components/counterparty/counterparty.module';
import { DialogModule } from './components/dialog/dialog.module';
import { VASPModule } from './components/vasp/vasp.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    CounterpartyModule,
    DialogModule,
    SharedModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatButtonModule,
    HttpClientModule,
    TransferModule,
    VASPModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    TransferTableHeaderPipe,
    DialogService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
