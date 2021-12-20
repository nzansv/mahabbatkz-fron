import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PersistenceService {
  public static readonly HEADER_USER_TOKEN = 'HEADER_USER_TOKEN';

  constructor() {
  }

  set(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  get(key: string): any {
    const value = localStorage.getItem(key);
    return value !== null ? (JSON.parse(value) || '') : null;
  }

  clear(key: string): void {
    localStorage.removeItem(key);
  }
}
