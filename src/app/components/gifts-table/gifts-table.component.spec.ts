import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftsTableComponent } from './gifts-table.component';

describe('GiftsTableComponent', () => {
  let component: GiftsTableComponent;
  let fixture: ComponentFixture<GiftsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiftsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiftsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
