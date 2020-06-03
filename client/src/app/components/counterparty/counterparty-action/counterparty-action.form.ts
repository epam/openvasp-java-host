import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Counterparty } from '../../../core/models/counterparty.model';

@Injectable()
export class CounterpartyActionFormService {
  public counterpartyForm;

  constructor() {
    this.counterpartyForm = new FormGroup({
      type: new FormControl('', [Validators.required]),
      vaan: new FormControl('', [Validators.required, Validators.pattern('([0-9a-fA-F]){8}')]),
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

  public initForm(counterparty: Counterparty | {}): void {
    if (counterparty) {
      // this.transferForm.controls.originatorId.setValue((transfer as Transfer).originator.id);
      // this.transferForm.controls.beneficiaryId.setValue((transfer as Transfer).beneficiary.id);
      // this.transferForm.controls.assetType.setValue((transfer as Transfer).assetType);
      // this.transferForm.controls.amount.setValue((transfer as Transfer).amount);
    }
  }
}
