import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Intents } from './intents';


import { HttpErrorHandlerService, HandleError } from '../http-error-handler.service';

let httpOptions=null;

/*
const httpOptions={
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': '123'
  
};*/

@Injectable({
  providedIn: 'root'
})
export class IntentsService {
  intensdataUrl = 'http://3.14.100.246:5002/api/projects/default/data';  // URL to web api

  private handleError: HandleError;

  constructor(private http: HttpClient,httpErrorHandler: HttpErrorHandlerService) { 
    this.handleError = httpErrorHandler.createHandleError('IntentsService');
  }

  /** GET Intents training examples from the server */
  getIntentsData (): Observable<any> {
    const url =`${this.intensdataUrl}?q=&intent=&limit=40&offset=0`; // GET api/projects/default/data?q=&intent=&limit=20&offset=0
    return this.http.get<Intents[]>(url,httpOptions)
      .pipe(
        catchError(this.handleError('getIntentsData', []))
      );
  }


  //////// Save methods //////////
 
  /** DELETE: delete the  Intents training examples from the server */
  deleteIntentsData (id: number): Observable<{}> {
    const url = `${this.intensdataUrl}/${id}`; // DELETE api/projects/default/data/id
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError('deleteIntentsData'))
      );
  }


/** POST: add a new  Train Data intent to the database */

addtrainintent (newtrainintent: any): Observable<any> {
  return this.http.post<any>(this.intensdataUrl, newtrainintent,httpOptions)
    .pipe(
      catchError(this.handleError('addtrainintent', newtrainintent))
    );
}

/* PUT: update the intents on the server. Returns the updated intents upon success. */
updatetrainintent (intents: Intents): Observable<any> {
  let id=intents.id;
  const url = `${this.intensdataUrl}/${id}`;
  return this.http.put<Intents>(url, intents, httpOptions)
    .pipe(
      catchError(this.handleError('updatetrainintent', intents))
    );
}

//http://3.14.100.246:5002/api/projects/default/data/1


/** PUT: update the intents on the server. Returns the updated intents upon success. */
/*
updatetrainintent (intents: Intents): Observable<Intents> {
  const url = `${this.intensdataUrl}/${id}`;
  return this.http.put<Intents>(this.intensdataUrl, intents, httpOptions)
    .pipe(
      catchError(this.handleError('updatetrainintent', intents))
    );
}*/


 
  setToken (data: any): void {    
     httpOptions=data;
     console.log("intents載入httpOptions success");
 
  }




 


}
