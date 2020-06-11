import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogService } from '../../dialog/dialog.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { DialogConfirmComponent } from './dialog-confirm.component';

describe('DialogConfirmComponent', () => {
  let component: DialogConfirmComponent;
  let fixture: ComponentFixture<DialogConfirmComponent>;
  let dialogService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        MatSnackBarModule
      ],
      declarations: [DialogConfirmComponent],
      providers: [
        DialogService,
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    }).compileComponents();

    dialogService = TestBed.inject(DialogService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should confirm', () => {
    const spy = spyOn<any>(dialogService, 'closeDialog').and.returnValue(of());

    component.confirm();

    expect(spy).toHaveBeenCalledWith(true);
  });
});
