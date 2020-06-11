import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CounterpartyService } from '../counterparty.service';
import { DialogService } from '../../dialog/dialog.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CounterpartyDialogData } from '../../../core/models/counterparty.model';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { CounterpartyActionComponent } from '../counterparty-action/counterparty-action.component';
import { CounterpartyActionFormService } from './counterparty-action.form.service';
import { VASPService } from '../../vasp/vasp.service';

describe('CounterpartyActionComponent', () => {
  let component: CounterpartyActionComponent;
  let fixture: ComponentFixture<CounterpartyActionComponent>;
  let counterpartyService;
  let dialogService;
  let formService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        MatSnackBarModule,
      ],
      declarations: [CounterpartyActionComponent],
      providers: [
        CounterpartyService,
        CounterpartyActionFormService,
        VASPService,
        DialogService,
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ]
    }).compileComponents();

    dialogService = TestBed.inject(DialogService);
    formService = TestBed.inject(CounterpartyActionFormService);
    counterpartyService = TestBed.inject(CounterpartyService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterpartyActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init form', () => {
    const spy = spyOn<any>(component, 'initForm').and.returnValue(of());
    const counterparty: CounterpartyDialogData = {counterparty: undefined, type: 'edit'};

    component.counterparty = counterparty;
    component.ngOnInit();

    expect(spy).toHaveBeenCalledWith(counterparty.type);
  });

  it('should get current vasp', () => {
    const spy = spyOn<any>(component, 'getCurrentVASP').and.returnValue(of());

    component.ngOnInit();

    expect(spy).toHaveBeenCalled();
  });

  xit('should reset form on destroy', () => {
    const formSpy = spyOn<any>(formService, 'counterpartyForm.reset').and.returnValue(of());

    component.ngOnDestroy();

    expect(formSpy).toHaveBeenCalled();
  });

  it('should create counterparty', () => {
    const spy = spyOn<any>(component, 'createCounterparty').and.returnValue(of());
    const counterparty: CounterpartyDialogData = {counterparty: undefined, type: 'create'};

    component.counterparty = counterparty;
    component.counterpartyAction();

    expect(spy).toHaveBeenCalled();
  });

  it('should edit counterparty', () => {
    const spy = spyOn<any>(component, 'editCounterparty').and.returnValue(of());
    const counterparty: CounterpartyDialogData = {counterparty: undefined, type: 'edit'};

    component.counterparty = counterparty;
    component.counterpartyAction();

    expect(spy).toHaveBeenCalled();
  });
});
