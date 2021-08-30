import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedTermComponent } from './fixed-term.component';

describe('FixedTermComponent', () => {
  let component: FixedTermComponent;
  let fixture: ComponentFixture<FixedTermComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FixedTermComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FixedTermComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
