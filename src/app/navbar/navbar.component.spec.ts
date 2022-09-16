import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { activeBoardKey, boardKey } from '../constants';
import { StorageService } from '../services/storageService';
import { ACTIVE_BOARD_DATA, BOARDS_DATA } from '../services/storageService.spec';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let storageService: StorageService;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarComponent ],
      imports: [
        BrowserModule,
        FontAwesomeModule,
        FormsModule, 
        ReactiveFormsModule
      ],
      providers: [
        StorageService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    storageService = TestBed.inject(StorageService);
    fixture.detectChanges();
  });

  afterEach(() => {
    storageService.clear();
  });

  it('should create', () => {
    storageService.set(activeBoardKey, ACTIVE_BOARD_DATA);
    storageService.set(boardKey, BOARDS_DATA);
    fixture.detectChanges();
    component.ngOnInit();
    //fixture.detectChanges();
    expect(component).toBeDefined();
  });
});
