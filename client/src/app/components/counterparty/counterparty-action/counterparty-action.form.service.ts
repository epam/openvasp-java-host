import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Counterparty } from '../../../core/models/counterparty.model';

@Injectable()
export class CounterpartyActionFormService {
  public counterpartyForm;

  constructor() {
    this.counterpartyForm = new FormGroup({
      type: new FormControl(''),
      vaan: new FormControl(''),
      customerNr: new FormControl('', [Validators.pattern('([0-9a-fA-F]){14}')]),
      role: new FormControl(''),
      name: new FormControl(''),
      bic: new FormControl(''),
      birth: new FormGroup({
        birthTown: new FormControl(''),
        birthCountry: new FormControl(''),
        birthDate: new FormControl(''),
      }),
      postalAddress: new FormGroup({
        street: new FormControl(''),
        number: new FormControl(''),
        adrline: new FormControl(''),
        postCode: new FormControl(''),
        town: new FormControl(''),
        country: new FormControl(''),
      }),
      natIds: new FormArray([
        new FormGroup({
          idStr: new FormControl(''),
          country: new FormControl(''),
          issuer: new FormControl(''),
          idType: new FormControl(''),
        })
      ]),
      jurIds: new FormArray([
        new FormGroup({
          idStr: new FormControl(''),
          country: new FormControl(''),
          issuer: new FormControl(''),
          idType: new FormControl(''),
        })
      ])
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

  public initForm(type: string, counterparty: Counterparty | {}): void {
    if (type === 'edit') {
      this.counterpartyForm.removeControl('customerNr');
    }
    if (counterparty) {
      this.counterpartyForm.controls.type.setValue((counterparty as Counterparty).type);
      this.counterpartyForm.controls.name.setValue((counterparty as Counterparty).name);

      if((counterparty as Counterparty).vaan) {
        this.counterpartyForm.controls.vaan.setValue((counterparty as Counterparty).vaan);
      }

      if((counterparty as Counterparty).role) {
        this.counterpartyForm.controls.role.setValue((counterparty as Counterparty).role);
      }

      if((counterparty as Counterparty).bic) {
        this.counterpartyForm.controls.bic.setValue((counterparty as Counterparty).bic);
      }

      if((counterparty as Counterparty).birth) {
        this.counterpartyForm.controls.birth.controls.birthTown.setValue((counterparty as Counterparty).birth.birthTown);
        this.counterpartyForm.controls.birth.controls.birthDate.setValue((counterparty as Counterparty).birth.birthDate);
        this.counterpartyForm.controls.birth.controls.birthCountry.setValue((counterparty as Counterparty).birth.birthCountry);
      }

      if((counterparty as Counterparty).postalAddress) {
        this.counterpartyForm.controls.postalAddress.controls.street.setValue((counterparty as Counterparty).postalAddress.street);
        this.counterpartyForm.controls.postalAddress.controls.number.setValue((counterparty as Counterparty).postalAddress.number);
        this.counterpartyForm.controls.postalAddress.controls.adrline.setValue((counterparty as Counterparty).postalAddress.adrline);
        this.counterpartyForm.controls.postalAddress.controls.postCode.setValue((counterparty as Counterparty).postalAddress.postCode);
        this.counterpartyForm.controls.postalAddress.controls.town.setValue((counterparty as Counterparty).postalAddress.town);
        this.counterpartyForm.controls.postalAddress.controls.country.setValue((counterparty as Counterparty).postalAddress.country);
      }

      if((counterparty as Counterparty).natIds[0]) {
        this.counterpartyForm.controls.natIds.controls[0].controls.idStr.setValue((counterparty as Counterparty).natIds[0].idStr);
        this.counterpartyForm.controls.natIds.controls[0].controls.country.setValue((counterparty as Counterparty).natIds[0].country);
        this.counterpartyForm.controls.natIds.controls[0].controls.issuer.setValue((counterparty as Counterparty).natIds[0].issuer);
        this.counterpartyForm.controls.natIds.controls[0].controls.idType.setValue((counterparty as Counterparty).natIds[0].idType);
      }

      if((counterparty as Counterparty).jurIds[0]) {
        this.counterpartyForm.controls.jurIds.controls[0].controls.idStr.setValue((counterparty as Counterparty).jurIds[0].idStr);
        this.counterpartyForm.controls.jurIds.controls[0].controls.country.setValue((counterparty as Counterparty).jurIds[0].country);
        this.counterpartyForm.controls.jurIds.controls[0].controls.issuer.setValue((counterparty as Counterparty).jurIds[0].issuer);
        this.counterpartyForm.controls.jurIds.controls[0].controls.idType.setValue((counterparty as Counterparty).jurIds[0].idType);
      }
    }
  }
}
