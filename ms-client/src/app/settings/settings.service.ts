import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';


import { HttpErrorHandlerService, HandleError } from '../http-error-handler.service';
let httpOptions=null;


@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  configUrl = 'http://3.14.100.246:5002/api/projects/default/settings';  // URL to web api

  private handleError: HandleError;

  constructor(private http: HttpClient,httpErrorHandler: HttpErrorHandlerService) { 
    this.handleError = httpErrorHandler.createHandleError('SettingsService');
  }

   /** GET Config Data from the server */
   getConfigData (): Observable<any> {
    const url =`${this.configUrl}`; // GET api/projects/default/settings
    return this.http.get<any>(url,httpOptions)
      .pipe(
        catchError(this.handleError('getConfigData', []))
      );
  }

  setToken (data:any): void {    
    httpOptions=data;
    console.log("settings載入httpOptions success");
  }

}
