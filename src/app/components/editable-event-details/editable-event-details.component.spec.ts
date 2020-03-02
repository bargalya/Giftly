import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableEventDetailsComponent } from './editable-event-details.component';

describe('EditableEventDetailsComponent', () => {
  let component: EditableEventDetailsComponent;
  let fixture: ComponentFixture<EditableEventDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditableEventDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditableEventDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
