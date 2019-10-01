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
export class DialogtestService {

  dialogUrl = 'http://3.14.100.246:5002/api/chat?environment=production';  // URL to web api

  private handleError: HandleError;

  constructor(private http: HttpClient,httpErrorHandler: HttpErrorHandlerService) { 
    this.handleError = httpErrorHandler.createHandleError('DialogtestService');
  }

  /** POST: message to the database */

sendmessage(message:any): Observable<any[]> {
  return this.http.post<any>(this.dialogUrl, message,httpOptions)
    .pipe(
      catchError(this.handleError('sendmessage', message))
    );
}

  setToken (data: any): void {    
    httpOptions=data;
    console.log("dialogtest載入httpOptions success");

  }



}
