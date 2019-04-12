import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { userPage } from './user.page';

describe('userPage', () => {
  let component: userPage;
  let fixture: ComponentFixture<userPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [userPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(userPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
