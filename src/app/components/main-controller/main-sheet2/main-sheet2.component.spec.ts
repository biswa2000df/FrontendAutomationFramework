import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSheet2Component } from './main-sheet2.component';

describe('MainSheet2Component', () => {
  let component: MainSheet2Component;
  let fixture: ComponentFixture<MainSheet2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainSheet2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainSheet2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
