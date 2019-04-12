import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { cartPage } from './cart.page';

describe('cartPage', () => {
  let component: cartPage;
  let fixture: ComponentFixture<cartPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [cartPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(cartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
