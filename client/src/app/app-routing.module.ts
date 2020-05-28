import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransferComponent } from './components/transfer/transfer.component';
import { SettingsComponent } from './components/settings/settings.component';
import { CounterpartyComponent } from './components/counterparty/counterparty.component';


const routes: Routes = [
  { path: 'counterparties', component: CounterpartyComponent },
  { path: 'transfers', component: TransferComponent },
  { path: 'settings', component: SettingsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
