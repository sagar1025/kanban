import { TestBed } from '@angular/core/testing';
import { boardKey, activeBoardKey } from '../constants';
import {  StorageService } from './storageService';
export const BOARDS_DATA = [{"name":"Platform Launch","id":0},{"name":"Marketing Plan","id":1,"columns":[{"id":0,"name":"todo","tasks":[{"id":0,"title":"Something in beta","description":"this is a test description in Beta column","columnId":0,"subTasks":[{"id":0,"description":"sub task 1 for beta","complete":true},{"id":1,"description":"sub task 2 for beta","complete":true}]},{"id":1,"title":"setup events","description":"create new events","columnId":0,"subTasks":[{"id":0,"description":"create pageview event","complete":true}]},{"id":2,"title":"test","description":"test","columnId":0,"subTasks":[{"id":0,"description":"s1","complete":false}]}]},{"id":1,"name":"In Progress","tasks":[{"id":0,"title":"In Progress","description":"stuff to do","columnId":1,"subTasks":[{"id":0,"description":"sub task 1","complete":false}]},{"id":1,"title":"setup events","description":"create new events","columnId":{"id":2,"title":"test","description":"test","columnId":1,"subTasks":[{"id":0,"description":"s1","complete":false}]},"subTasks":[{"id":0,"description":"create pageview event","complete":false}],"colId":{"id":1,"title":"setup events","description":"create new events","columnId":1,"subTasks":[{"id":0,"description":"create pageview event","complete":true}]}}]},{"id":2,"name":"Beta","tasks":[{"id":0,"title":"Something in beta","description":"this is a test description in Beta column","columnId":2,"subTasks":[{"id":0,"description":"sub task 1 for beta","complete":true},{"id":1,"description":"sub task 2 for beta","complete":true}]},{"id":1,"title":"More tasks for Beta","description":"More tasks for BetaMore tasks for Beta","columnId":2,"subTasks":[{"id":0,"description":"ST 1","complete":true},{"id":1,"description":"ST2","complete":true}]},{"id":2,"title":"test","description":"test","columnId":2,"subTasks":[{"id":0,"description":"s1","complete":false}]}]}]},{"name":"Roadmap","id":2},{"name":"Release Prep","id":3},{"name":"test board","id":4,"columns":[{"id":0,"name":"Sprint 0","tasks":[{"id":0,"title":"Design sprint","description":"Review designs","columnId":0,"subTasks":[{"id":0,"description":"1. review design from sprint 0","complete":false}]}]}]}];
export const ACTIVE_BOARD_DATA = {"name":"Marketing Plan","id":1,"columns":[{"id":0,"name":"todo","tasks":[{"id":0,"title":"Something in beta","description":"this is a test description in Beta column","columnId":0,"subTasks":[{"id":0,"description":"sub task 1 for beta","complete":true},{"id":1,"description":"sub task 2 for beta","complete":true}]},{"id":1,"title":"setup events","description":"create new events","columnId":0,"subTasks":[{"id":0,"description":"create pageview event","complete":true}]},{"id":2,"title":"test","description":"test","columnId":0,"subTasks":[{"id":0,"description":"s1","complete":false}]}]},{"id":1,"name":"In Progress","tasks":[{"id":0,"title":"In Progress","description":"stuff to do","columnId":1,"subTasks":[{"id":0,"description":"sub task 1","complete":false}]},{"id":1,"title":"setup events","description":"create new events","columnId":{"id":2,"title":"test","description":"test","columnId":1,"subTasks":[{"id":0,"description":"s1","complete":false}]},"subTasks":[{"id":0,"description":"create pageview event","complete":false}],"colId":{"id":1,"title":"setup events","description":"create new events","columnId":1,"subTasks":[{"id":0,"description":"create pageview event","complete":true}]}}]},{"id":2,"name":"Beta","tasks":[{"id":0,"title":"Something in beta","description":"this is a test description in Beta column","columnId":2,"subTasks":[{"id":0,"description":"sub task 1 for beta","complete":true},{"id":1,"description":"sub task 2 for beta","complete":false}]},{"id":1,"title":"More tasks for Beta","description":"More tasks for BetaMore tasks for Beta","columnId":2,"subTasks":[{"id":0,"description":"ST 1","complete":true},{"id":1,"description":"ST2","complete":false}]},{"id":2,"title":"test","description":"test","columnId":2,"subTasks":[{"id":0,"description":"s1","complete":false}]}]}]};
let store: any = {};

const mockedLocalStorage = {
    get: (key: string): string => {
      return key in store ? store[key] : null;
    },
    set: (key: string, value: string) => {
      store[key] = `${value}`;
    },
    clear: () => {
      store = {};
    }
  };

describe('Test Storage Service', () => {
    let mockedStorageService: StorageService;

    beforeEach(() => {
        // spyOn(mockedStorageService, 'get').and.callFake(mockmockedStorageService.get);
        // spyOn(mockedStorageService, 'set').and.callFake(mockmockedStorageService.set);
        // spyOn(mockedStorageService, 'removeItem').and.callFake(mockmockedStorageService.removeItem);
        // spyOn(mockedStorageService, 'clear').and.callFake(mockmockedStorageService.clear);

        mockedStorageService = new StorageService();

        TestBed.configureTestingModule({
            providers:[
                StorageService
            ]
        });

        spyOn(mockedStorageService, 'get').and.callFake(mockedLocalStorage.get);
        spyOn(mockedStorageService, 'set').and.callFake(mockedLocalStorage.set);
        spyOn(mockedStorageService, 'clear').and.callFake(mockedLocalStorage.clear);

    });

    afterEach(() => {
        mockedStorageService.clear();
    });

    it('should set item', () => {
        BOARDS_DATA[0].id = 5;
        mockedStorageService.set(boardKey, JSON.stringify(BOARDS_DATA));
        const newData = mockedStorageService.get(boardKey);
        if(newData !== null) {
            expect(JSON.parse(newData)[0].id).toEqual(5);
        };
    });

    it('should get item', () => {
        mockedStorageService.set(boardKey, JSON.stringify(BOARDS_DATA));

        const items = mockedStorageService.get(boardKey);
        expect(items).toEqual(JSON.stringify(BOARDS_DATA));
    });

    it('should update item', () => {
        mockedStorageService.set(activeBoardKey, JSON.stringify(ACTIVE_BOARD_DATA));
        const existingData = mockedStorageService.get(activeBoardKey);
        if(existingData !== null) {
            const parsedData = JSON.parse(existingData);
            parsedData.id = 7;
            mockedStorageService.set(activeBoardKey, JSON.stringify(parsedData));
            
            const newData = mockedStorageService.get(boardKey);
            if(newData !== null) {
                expect(JSON.parse(newData)[0].id).toEqual(7);
            };
        }
    });

    it('should return null if no active board', () => {
        expect(mockedStorageService.get(activeBoardKey)).toBeNull();
        expect(mockedStorageService.get(boardKey)).toBeNull();
    });

})