import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Counterparty } from '../../../core/models/counterparty.model';
import { DatePipe } from '@angular/common';

@Injectable()
export class CounterpartyActionFormService {
  public counterpartyForm;

  constructor() {
    this.counterpartyForm = new FormGroup({
      type: new FormControl('', [Validators.required]),
      vaan: new FormControl(''),
      customerNr: new FormControl('', [Validators.required, Validators.pattern('([0-9a-fA-F]){14}')]),
      name: new FormControl('', [Validators.required]),
      bic: new FormControl('', [Validators.required]),
      birth: new FormGroup({
        birthTown: new FormControl('', [Validators.required]),
        birthCountry: new FormControl('', [Validators.required]),
        birthDate: new FormControl('', [Validators.required]),
      }),
      postalAddress: new FormGroup({
        street: new FormControl('', [Validators.required]),
        number: new FormControl('', [Validators.required]),
        adrline: new FormControl('', [Validators.required]),
        postCode: new FormControl('', [Validators.required]),
        town: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
      }),
      natIds: new FormGroup({
        idStr: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        issuer: new FormControl('', [Validators.required]),
        idType: new FormControl('', [Validators.required]),
      }),
      jurIds: new FormGroup({
        idStr: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        issuer: new FormControl('', [Validators.required]),
        idType: new FormControl('', [Validators.required]),
      })
    });
  }

  public setVAAN(vaan: string): void {
    this.counterpartyForm.controls.vaan.setValue(vaan);
  }

  public processBeforeSend(): void {
    const date = new Date(this.counterpartyForm.controls.birth.controls.birthDate.value);
    this.counterpartyForm.controls.birth.controls.birthDate.setValue(date.getFullYear() + '-' + ('0'+(date.getMonth()+1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2));
    this.counterpartyForm.removeControl('customerNr');
  }

  public initForm(counterparty: Counterparty | {}): void {
    if (counterparty) {
      // this.transferForm.controls.originatorId.setValue((transfer as Transfer).originator.id);
      // this.transferForm.controls.beneficiaryId.setValue((transfer as Transfer).beneficiary.id);
      // this.transferForm.controls.assetType.setValue((transfer as Transfer).assetType);
      // this.transferForm.controls.amount.setValue((transfer as Transfer).amount);
    }
  }
}
