import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConeViewComponent } from './cone-view.component';

describe('ConeViewComponent', () => {
  let component: ConeViewComponent;
  let fixture: ComponentFixture<ConeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ConeViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
