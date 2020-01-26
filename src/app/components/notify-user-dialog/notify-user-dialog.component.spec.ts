import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifyUserDialogComponent } from './notify-user-dialog.component';

describe('NotifyUserDialogComponent', () => {
  let component: NotifyUserDialogComponent;
  let fixture: ComponentFixture<NotifyUserDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotifyUserDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifyUserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
