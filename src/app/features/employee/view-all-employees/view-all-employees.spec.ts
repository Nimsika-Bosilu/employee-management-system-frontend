import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllEmployees } from './view-all-employees';

describe('ViewAllEmployees', () => {
  let component: ViewAllEmployees;
  let fixture: ComponentFixture<ViewAllEmployees>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewAllEmployees]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAllEmployees);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
