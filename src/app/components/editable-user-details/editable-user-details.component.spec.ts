import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableUserDetailsComponent } from './editable-user-details.component';

describe('EditableUserDetailsComponent', () => {
  let component: EditableUserDetailsComponent;
  let fixture: ComponentFixture<EditableUserDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditableUserDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditableUserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
