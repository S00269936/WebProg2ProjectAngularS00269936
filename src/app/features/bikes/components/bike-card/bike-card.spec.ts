import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BikeCard } from './bike-card';

describe('BikeCard', () => {
  let component: BikeCard;
  let fixture: ComponentFixture<BikeCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BikeCard],
    }).compileComponents();

    fixture = TestBed.createComponent(BikeCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
