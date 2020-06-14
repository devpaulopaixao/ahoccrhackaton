import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PodcastsPage } from './podcasts.page';

describe('PodcastsPage', () => {
  let component: PodcastsPage;
  let fixture: ComponentFixture<PodcastsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PodcastsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PodcastsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
