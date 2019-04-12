import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {settingPage } from './setting.page';

describe('settingPage', () => {
  let component: settingPage;
  let fixture: ComponentFixture<settingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [settingPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(settingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
