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
export class StoryService {
  
  storydataUrl = 'http://3.14.100.246:5002/api/stories';  // URL to web api
  private handleError: HandleError;

  constructor(private http: HttpClient,httpErrorHandler: HttpErrorHandlerService) { 
    this.handleError = httpErrorHandler.createHandleError('handleError');
  }


  /** GET Story list  from the server */
  getStoryData (): Observable<any> {
    const url =`${this.storydataUrl}?q=&limit=20&offset=0`; // GET api/stories?q=&limit=20&offset=0  
    return this.http.get<any[]>(url,httpOptions)
      .pipe(
        catchError(this.handleError('getStoryData', []))
      );
  }

    setToken (data:any): void {    
      httpOptions=data;
      console.log("story載入httpOptions success");
    }
}
