import { CounterpartyDetailsComponent } from './counterparty-details.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CounterpartyService } from '../counterparty.service';
import { DialogService } from '../../dialog/dialog.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { Counterparty } from '../../../core/models/counterparty.model';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { CounterpartyActionComponent } from '../counterparty-action/counterparty-action.component';
import { DialogConfirmComponent } from '../../dialog/dialog-confirm/dialog-confirm.component';

describe('CounterpartyDetailsComponent', () => {
  let component: CounterpartyDetailsComponent;
  let fixture: ComponentFixture<CounterpartyDetailsComponent>;
  let counterpartyService;
  let dialogService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        MatSnackBarModule
      ],
      declarations: [CounterpartyDetailsComponent],
      providers: [
        CounterpartyService,
        DialogService
      ]
    }).compileComponents();

    dialogService = TestBed.inject(DialogService);
    counterpartyService = TestBed.inject(CounterpartyService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterpartyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get counterparties on init', () => {
    const spy = spyOn<any>(component, 'getCounterparty').and.returnValue(of());

    component.ngOnInit();

    expect(spy).toHaveBeenCalled();

  });

  it('should open counterparty dialog', () => {
    const dialogSpy = spyOn<any>(dialogService, 'openDialog').and.returnValue(of());
    const type = 'edit';
    const counterparty: Counterparty = {id: 1, name: 'test', vaspCode: 'test'};

    component.counterpartyData = counterparty;

    component.openCounterpartyDialog(type);

    expect(dialogSpy).toHaveBeenCalledWith({counterparty: counterparty, type: type}, CounterpartyActionComponent, '', '900px', '850px');
  });

  it('should open delete dialog', () => {
    const dialogSpy = spyOn<any>(dialogService, 'openDialog').and.returnValue(of());

    component.openDeleteDialog();

    expect(dialogSpy).toHaveBeenCalledWith({}, DialogConfirmComponent, 'Are you sure you want to delete?', '400px', '150px');
  });
});
