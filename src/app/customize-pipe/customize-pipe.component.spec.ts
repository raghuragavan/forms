import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizePipeComponent } from './customize-pipe.component';

describe('CustomizePipeComponent', () => {
  let component: CustomizePipeComponent;
  let fixture: ComponentFixture<CustomizePipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomizePipeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomizePipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
