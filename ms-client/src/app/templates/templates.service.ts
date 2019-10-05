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
export class TemplatesService {
  //http://3.14.100.246:5002/api/templates
  templatesdataUrl = 'http://3.14.100.246:5002/api/templates';  // URL to web api
  private handleError: HandleError;

  constructor(private http: HttpClient,httpErrorHandler: HttpErrorHandlerService) { 
    this.handleError = httpErrorHandler.createHandleError('TemplatesService');
  }

   /** GET All templates from the server */
   getTemplatesData (): Observable<any> {
    const url =`${this.templatesdataUrl}?q=&template=&limit=20&offset=0`; // GET api/templates?q=&template=&limit=20&offset=0
    return this.http.get<any[]>(url,httpOptions)
      .pipe(
        catchError(this.handleError('getTemplatesData', ""))
      );
  }

  /** POST: add a new  Train Data templates  to the database */
  addTemplates (newtemplates: any): Observable<any> {
    const url =`${this.templatesdataUrl}`; 
    return this.http.post<any>(url, newtemplates,httpOptions)
      .pipe(
        catchError(this.handleError('addtemplates', newtemplates))
      );
  }

  /** DELETE: delete the  Template data from the server */
    deleteTemplateData (id: number): Observable<{}> {
      const url = `${this.templatesdataUrl}/${id}`; // DELETE api/templates/id
      return this.http.delete(url, httpOptions)
        .pipe(
          catchError(this.handleError('deleteTemplateData'))
        );
    }
  

/* PUT: update the template on the server. Returns the updated template upon success. */
updatetemplate(templatedata: any): Observable<any> {
  let id=templatedata.id;
  const url = `${this.templatesdataUrl}/${id}`;
  return this.http.put<any>(url, templatedata, httpOptions)
    .pipe(
      catchError(this.handleError('updatetemplate', templatedata))
    );
}

  

  setToken (data: any): void {    
    httpOptions=data;
    console.log("templates載入httpOptions success");

 }


  

}
