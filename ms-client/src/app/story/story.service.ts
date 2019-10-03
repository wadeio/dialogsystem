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
  token:string="";
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

  /** GET Domain  from the server **/
  getDomainData (): Observable<any> {
    const url =`http://3.14.100.246:5002/api/domain`; // GET api/domain
    
    
    //D5mhVVJ1fUTH
      return this.http.get(url, { headers: new HttpHeaders({'Content-Type':  'application/json','Authorization': this.token,}),
      responseType:'text'})
      .pipe(
            catchError(this.handleError('getDomainData', ""))
          );
        
  }
  
  //http://3.14.100.246:5002/api/stories/4
  /** GET Update story path to the server **/

  updateStory (id: number, edittext:string): Observable<any> {
    const url =`${this.storydataUrl}/${id}`;// update api/stories/id
 
    return this.http.put<any>(url, edittext, httpOptions)
      .pipe(
        catchError(this.handleError('updateStory', ""))
      );
  }



    setToken (data:any): void {    
      httpOptions=data;
      console.log("story載入httpOptions success");
    }


    setTokenValue (data:any): void {    
      this.token=data;
      console.log("story載入value success");
    }
}
