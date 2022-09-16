import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavbarComponent } from '../navbar/navbar.component';
import { StorageService } from '../services/storageService';
import { ColumnsComponent } from './columns.component';

describe('ColumnsComponent', () => {
  let component: ColumnsComponent;
  let fixture: ComponentFixture<ColumnsComponent>;
  let storageService: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ColumnsComponent, NavbarComponent ],
      imports: [
        FontAwesomeModule,
        FormsModule, 
        ReactiveFormsModule
      ],
      providers: [
        StorageService
      ]
    });


    fixture = TestBed.createComponent(ColumnsComponent);
    component = fixture.componentInstance;
    storageService = TestBed.inject(StorageService);

  });

  afterEach(() => {
    storageService.clear();
  });

  it('should create component', () => {
    expect(component).toBeDefined();
  });

  it('should display new column button', () => {
    const btn = document.querySelector('.btn');
    expect(btn).not.toBeNull();
  });
});
