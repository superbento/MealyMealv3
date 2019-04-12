import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeInfoPage } from './change-info.page';

describe('ChangeInfoPage', () => {
  let component: ChangeInfoPage;
  let fixture: ComponentFixture<ChangeInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeInfoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
