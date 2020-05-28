import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Transfer } from '../../../core/models/transfer.model';

@Injectable()
export class CreateTransferFormService {
  public transferForm;

  constructor() {
    this.transferForm = new FormGroup({
      assetType: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required, Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')]),
      txHash: new FormControl('', [Validators.required]),
      sendAddr: new FormControl('', [Validators.required]),
      destAddr: new FormControl('', [Validators.required]),
      originatorId: new FormControl('', [Validators.required]),
      beneficiaryId: new FormControl('', [Validators.required]),
      // commentary: new FormControl()
    });
  }

  public initForm(transfer: Transfer | {}): void {
    if (transfer) {
      this.transferForm.controls.assetType.setValue((transfer as Transfer).assetType);
      this.transferForm.controls.amount.setValue((transfer as Transfer).amount);
    }
    // this.transferForm.controls.commentary.setValue(transfer.commentary);
  }
}
