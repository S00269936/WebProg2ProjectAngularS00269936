import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BikeDetails } from './bike-details';

describe('BikeDetails', () => {
  let component: BikeDetails;
  let fixture: ComponentFixture<BikeDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BikeDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(BikeDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
