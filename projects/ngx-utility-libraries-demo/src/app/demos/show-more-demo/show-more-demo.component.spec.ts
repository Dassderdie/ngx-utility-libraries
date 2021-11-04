import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMoreDemoComponent } from './show-more-demo.component';

describe('ShowMoreDemoComponent', () => {
  let component: ShowMoreDemoComponent;
  let fixture: ComponentFixture<ShowMoreDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowMoreDemoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowMoreDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
