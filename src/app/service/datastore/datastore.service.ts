import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DatastoreService {
  constructor() {}
  private subject = new BehaviorSubject<any>('');
  public prevNextSubject = new BehaviorSubject<any>('');
  private data: any;
  private prevNextData: any;

  setprevNextData(someData: any) {
    this.prevNextSubject.next(someData);
  }
  getprevNextData(): Observable<any> {
    return this.prevNextSubject.asObservable();
  }

  setSubject(data: any) {
    this.subject.next(data);
  }
  getSubject(): Observable<any> {
    return this.subject.asObservable();
  }

  setData(someData: any) {
    this.subject.next(someData);
  }
  getData(): Observable<any> {
    return this.subject.asObservable();
  }
}
