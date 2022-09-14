import { SidebarComponent } from "./sidebar.component"
import { ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

describe('test sidebar component', () => {
    let fixture: ComponentFixture<SidebarComponent>;
    let component: SidebarComponent;
    let localStore: Storage;
    const BOARDS = [{"name":"Platform Launch","id":0},{"name":"Marketing Plan","id":1,"columns":[{"id":0,"name":"todo","tasks":[{"id":0,"title":"Something in beta","description":"this is a test description in Beta column","columnId":0,"subTasks":[{"id":0,"description":"sub task 1 for beta","complete":true},{"id":1,"description":"sub task 2 for beta","complete":true}]},{"id":1,"title":"setup events","description":"create new events","columnId":0,"subTasks":[{"id":0,"description":"create pageview event","complete":true}]},{"id":2,"title":"test","description":"test","columnId":0,"subTasks":[{"id":0,"description":"s1","complete":false}]}]},{"id":1,"name":"In Progress","tasks":[{"id":0,"title":"In Progress","description":"stuff to do","columnId":1,"subTasks":[{"id":0,"description":"sub task 1","complete":false}]},{"id":1,"title":"setup events","description":"create new events","columnId":{"id":2,"title":"test","description":"test","columnId":1,"subTasks":[{"id":0,"description":"s1","complete":false}]},"subTasks":[{"id":0,"description":"create pageview event","complete":false}],"colId":{"id":1,"title":"setup events","description":"create new events","columnId":1,"subTasks":[{"id":0,"description":"create pageview event","complete":true}]}}]},{"id":2,"name":"Beta","tasks":[{"id":0,"title":"Something in beta","description":"this is a test description in Beta column","columnId":2,"subTasks":[{"id":0,"description":"sub task 1 for beta","complete":true},{"id":1,"description":"sub task 2 for beta","complete":true}]},{"id":1,"title":"More tasks for Beta","description":"More tasks for BetaMore tasks for Beta","columnId":2,"subTasks":[{"id":0,"description":"ST 1","complete":true},{"id":1,"description":"ST2","complete":true}]},{"id":2,"title":"test","description":"test","columnId":2,"subTasks":[{"id":0,"description":"s1","complete":false}]}]}]},{"name":"Roadmap","id":2},{"name":"Release Prep","id":3},{"name":"test board","id":4,"columns":[{"id":0,"name":"Sprint 0","tasks":[{"id":0,"title":"Design sprint","description":"Review designs","columnId":0,"subTasks":[{"id":0,"description":"1. review design from sprint 0","complete":false}]}]}]}];
    const ACTIVE_BOARD = {"name":"Marketing Plan","id":1,"columns":[{"id":0,"name":"todo","tasks":[{"id":0,"title":"Something in beta","description":"this is a test description in Beta column","columnId":0,"subTasks":[{"id":0,"description":"sub task 1 for beta","complete":true},{"id":1,"description":"sub task 2 for beta","complete":true}]},{"id":1,"title":"setup events","description":"create new events","columnId":0,"subTasks":[{"id":0,"description":"create pageview event","complete":true}]},{"id":2,"title":"test","description":"test","columnId":0,"subTasks":[{"id":0,"description":"s1","complete":false}]}]},{"id":1,"name":"In Progress","tasks":[{"id":0,"title":"In Progress","description":"stuff to do","columnId":1,"subTasks":[{"id":0,"description":"sub task 1","complete":false}]},{"id":1,"title":"setup events","description":"create new events","columnId":{"id":2,"title":"test","description":"test","columnId":1,"subTasks":[{"id":0,"description":"s1","complete":false}]},"subTasks":[{"id":0,"description":"create pageview event","complete":false}],"colId":{"id":1,"title":"setup events","description":"create new events","columnId":1,"subTasks":[{"id":0,"description":"create pageview event","complete":true}]}}]},{"id":2,"name":"Beta","tasks":[{"id":0,"title":"Something in beta","description":"this is a test description in Beta column","columnId":2,"subTasks":[{"id":0,"description":"sub task 1 for beta","complete":true},{"id":1,"description":"sub task 2 for beta","complete":false}]},{"id":1,"title":"More tasks for Beta","description":"More tasks for BetaMore tasks for Beta","columnId":2,"subTasks":[{"id":0,"description":"ST 1","complete":true},{"id":1,"description":"ST2","complete":false}]},{"id":2,"title":"test","description":"test","columnId":2,"subTasks":[{"id":0,"description":"s1","complete":false}]}]}]};


    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [SidebarComponent],
            imports: [
                FontAwesomeModule,
                FormsModule, 
                ReactiveFormsModule
              ],
        });
        fixture = TestBed.createComponent(SidebarComponent);
        component = fixture.componentInstance;

        let store: any = {};
        const mockLocalStorage = {
          getItem: (key: string): string => {
            return key in store ? store[key] : null;
          },
          setItem: (key: string, value: string) => {
            store[key] = `${value}`;
          },
          removeItem: (key: string) => {
            delete store[key];
          },
          clear: () => {
            store = {};
          }
        };

        spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
        spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
        spyOn(localStorage, 'removeItem').and.callFake(mockLocalStorage.removeItem);
        spyOn(localStorage, 'clear').and.callFake(mockLocalStorage.clear);

        localStorage.setItem('BOARDS', JSON.stringify(BOARDS));
        localStorage.setItem('ACTIVE_BOARD', JSON.stringify(ACTIVE_BOARD));
    });

    it('should display sidebar component', () => {
        expect(component).toBeDefined();
    });

    it('number of boards in localStorage should be equal to number of boards set', () => {
        component.ngOnInit();

        const boards= JSON.parse(localStorage.getItem('BOARDS') || '');
        expect(component.boardsCount).toEqual(boards.length)
    });

    it('should set active board', fakeAsync (() => {
        component.ngOnInit();
        fixture.detectChanges();
        
        spyOn(component, 'setActiveBoard');
        let btn = fixture.debugElement.nativeElement.querySelector('.nav-link');
        btn.click();
        tick();
        expect(component.setActiveBoard).toHaveBeenCalled();
    }));
})