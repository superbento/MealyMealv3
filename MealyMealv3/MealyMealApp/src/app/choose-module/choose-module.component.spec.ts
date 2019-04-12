import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseModuleComponent } from './choose-module.component';

describe('ChooseModuleComponent', () => {
  let component: ChooseModuleComponent;
  let fixture: ComponentFixture<ChooseModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
