import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAccountsComponent } from './manage-accounts';

describe('ManageAccountsComponent', () => {
  let component: ManageAccountsComponent;
  let fixture: ComponentFixture<ManageAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageAccountsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageAccountsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
