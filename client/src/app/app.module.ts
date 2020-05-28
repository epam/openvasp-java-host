import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SettingsComponent } from './components/settings/settings.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './core/interceptors/auth.interceptor';
import { TransferModule } from './components/transfer/transfer.module';
import { CommonModule } from '@angular/common';
import { TransferTableHeaderPipe } from './shared/pipes/transfer-table-header.pipe';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DialogService } from './core/services/dialog/dialog.service';
import { CounterpartyModule } from './components/counterparty/counterparty.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    CounterpartyModule,
    SharedModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatButtonModule,
    HttpClientModule,
    TransferModule,
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
