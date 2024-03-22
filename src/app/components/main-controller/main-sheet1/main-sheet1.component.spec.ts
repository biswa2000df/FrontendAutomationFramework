import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSheet1Component } from './main-sheet1.component';

describe('MainSheet1Component', () => {
  let component: MainSheet1Component;
  let fixture: ComponentFixture<MainSheet1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainSheet1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainSheet1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
