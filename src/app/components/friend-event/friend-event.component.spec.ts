import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendEventComponent } from './friend-event.component';

describe('FriendEventComponent', () => {
  let component: FriendEventComponent;
  let fixture: ComponentFixture<FriendEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
