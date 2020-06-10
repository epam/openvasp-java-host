import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HeaderComponent } from './header.component';
import { VASPService } from '../vasp/vasp.service';
import { DialogService } from '../dialog/dialog.service';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { TransferActionComponent } from '../transfer/transfer-action/transfer-action.component';
import { of } from 'rxjs';
import { CounterpartyActionComponent } from '../counterparty/counterparty-action/counterparty-action.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let vaspService: VASPService;
  let dialogService: DialogService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        MatDialogModule,
        RouterTestingModule
      ],
      declarations: [HeaderComponent],
      providers: [
        VASPService,
        DialogService
      ]
    }).compileComponents();

    vaspService = TestBed.inject(VASPService);
    dialogService = TestBed.inject(DialogService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get vasps on init', () => {
    const componentSpy = spyOn<any>(component, 'setCurrentVASPInfo');

    component.ngOnInit();

    expect(componentSpy).toHaveBeenCalled();
  });

  it('should open transfer dialog', () => {
    const dialogSpy = spyOn<any>(dialogService, 'openDialog').and.returnValue(of());
    const type = 'edit';

    component.openTransferDialog(type);

    expect(dialogSpy).toHaveBeenCalledWith({type}, TransferActionComponent);
  });

  it('should open counterparty dialog', () => {
    const dialogSpy = spyOn<any>(dialogService, 'openDialog').and.returnValue(of());
    const type = 'edit';
    const title = '';
    const width = '900px';
    const height = '900px';

    component.openCounterpartyDialog(type);

    expect(dialogSpy).toHaveBeenCalledWith({type}, CounterpartyActionComponent, title, width, height);
  });
});
