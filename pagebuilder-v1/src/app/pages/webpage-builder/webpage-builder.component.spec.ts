import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebpageBuilderComponent } from './webpage-builder.component';

describe('WebpageBuilderComponent', () => {
  let component: WebpageBuilderComponent;
  let fixture: ComponentFixture<WebpageBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebpageBuilderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WebpageBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
