import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StorageService {
  constructor() {}

  set(key: string, data: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error(e);
    }
  }

  get(key: string) {
    try {
      const data = localStorage.getItem(key) || '';
      if(data !== '') {
        return JSON.parse(data);
      }
      return null;
      
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  clear() {
    try {
      localStorage.clear();
    }
    catch(e) {
      console.error(e)
    }
  }
}
