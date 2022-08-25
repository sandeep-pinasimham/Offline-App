import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auditor } from 'src/app/models/auditor';
import { Request } from 'src/app/models/request';
// import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { Actor } from 'src/app/models/actor';
@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(private _httpClient: HttpClient) {}

  getAllRequestsForManager(name: any): Observable<Request[]> {
    const url = `http://localhost:9092/request/manager/${name}`;
    return this._httpClient.get<any[]>(url);
  }

  getAllRequestsForAuditor(name: any): Observable<Request[]> {
    const url = `http://localhost:9092/request/auditor/${name}`;
    return this._httpClient.get<any[]>(url);
  }

  getAllRequests = (): Observable<Request[]> => {
    const url = 'http://localhost:9092/requests';
    return this._httpClient.get<Request[]>(url);
  };

  getAllActors = (): Observable<Actor[]> => {
    const url = 'http://localhost:9092/actors';
    return this._httpClient.get<Actor[]>(url);
  };

  getAllAuditors = (): Observable<Auditor[]> => {
    const auditors_url = 'http://localhost:9092/auditors';
    return this._httpClient.get<any[]>(auditors_url);
  };

  createRequest = (data: Request): Observable<void> => {
    const baseURL = 'http://localhost:9092/requests';
    return this._httpClient.post<void>(baseURL, data, {
      responseType: 'text' as 'json',
    });
  };

  updateRequest = (data: any): Observable<void> => {
    const baseURL = 'http://localhost:9092/requests';
    return this._httpClient.put<void>(baseURL, data, {
      responseType: 'text' as 'json',
    });
  };

  private _listners = new Subject<any>();

  listen(): Observable<any> {
    return this._listners.asObservable();
  }

  filter(filterBy: string) {
    this._listners.next(filterBy);
  }
}
