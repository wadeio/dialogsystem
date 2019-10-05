import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { HttpErrorHandlerService, HandleError } from '../http-error-handler.service';

let httpOptions=null;
/*
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Im1lIiwiZXhwIjoxNTY5MzQzNTk0LCJ1c2VyIjp7InVzZXJuYW1lIjoibWUiLCJyb2xlcyI6WyJhZG1pbiJdLCJhcGlfdG9rZW4iOiJmNmIyNGY1MDZlYzI4NTliZjRjZGZjNTRkOTFkMmMzMzVlMzYwZTA2In0sInNjb3BlcyI6WyJidWxrRGF0YTp1cGRhdGUiLCJjb252ZXJzYXRpb25BY3Rpb25zOmxpc3QiLCJtb2RlbHM6bGlzdCIsIm1ldGFkYXRhOmxpc3QiLCJtb2RlbHMuZXZhbHVhdGlvbnM6bGlzdCIsIm1vZGVsczpjcmVhdGUiLCJtb2RlbHM6ZGVsZXRlIiwiaW50ZW50czpjcmVhdGUiLCJ1c2Vycy5yb2xlczpkZWxldGUiLCJjaGF0VG9rZW46Z2V0Iiwid2FybmluZ3M6Z2V0IiwibWVzc2FnZUludGVudHM6ZGVsZXRlIiwidXNlckdvYWxzOmNyZWF0ZSIsImNsaWVudEV2YWx1YXRpb246dXBkYXRlIiwiZW52aXJvbm1lbnRzOnVwZGF0ZSIsImxvZ3M6Y3JlYXRlIiwiY2xpZW50RXZhbHVhdGlvbjpkZWxldGUiLCJwcm9qZWN0czpjcmVhdGUiLCJpbnRlbnRzOnVwZGF0ZSIsImNoYXRUb2tlbjp1cGRhdGUiLCJjb252ZXJzYXRpb25JbnRlbnRzOmxpc3QiLCJzdGF0aXN0aWNzOmdldCIsImNsaWVudEV2YWx1YXRpb246Z2V0Iiwic3Rvcmllczp1cGRhdGUiLCJkb21haW5BY3Rpb25zOmdldCIsInJvbGVzOmNyZWF0ZSIsInJvbGVzOmdldCIsInN0b3JpZXM6Z2V0IiwiY2xpZW50RXZlbnRzOmNyZWF0ZSIsImxvZ3M6ZGVsZXRlIiwibW9kZWxzLnNldHRpbmdzOmdldCIsInVzZXIucGFzc3dvcmQ6dXBkYXRlIiwidXNlcjpnZXQiLCJjb252ZXJzYXRpb25FbnRpdGllczpsaXN0IiwiZXhhbXBsZXM6dXBkYXRlIiwibG9nczpsaXN0IiwibWVzc2FnZUZsYWdzOnVwZGF0ZSIsImludGVudHM6bGlzdCIsImxvZ3M6bGlzdCIsImVudGl0aWVzOmxpc3QiLCJleGFtcGxlczpnZXQiLCJidWxrU3Rvcmllczp1cGRhdGUiLCJhbGxFdmFsdWF0aW9uczpjcmVhdGUiLCJ1c2VyR29hbHM6ZGVsZXRlIiwidXNlcnM6bGlzdCIsImJ1bGtEYXRhOmdldCIsIm1vZGVsczpnZXQiLCJ1c2VyczpjcmVhdGUiLCJhbGxFdmFsdWF0aW9uczpsaXN0Iiwic3RvcmllczpjcmVhdGUiLCJtZXNzYWdlRmxhZ3M6ZGVsZXRlIiwidXNlcnMucm9sZXM6bGlzdCIsInN0b3JpZXM6bGlzdCIsIm1ldGFkYXRhOmNyZWF0ZSIsImRvbWFpbldhcm5pbmdzOmdldCIsImxvZ3M6Z2V0IiwidXNlcnM6ZGVsZXRlIiwiZW52aXJvbm1lbnRzOmxpc3QiLCJyb2xlczpkZWxldGUiLCJyb2xlcy51c2VyczpsaXN0IiwiYnVsa1Jlc3BvbnNlVGVtcGxhdGVzOnVwZGF0ZSIsIm1vZGVscy50YWdzOnVwZGF0ZSIsIm1ldGFkYXRhOmdldCIsImFuYWx5dGljczpnZXQiLCJ1c2Vycy5yb2xlczp1cGRhdGUiLCJyZXNwb25zZVRlbXBsYXRlczpkZWxldGUiLCJ1c2VyOnVwZGF0ZSIsIm1vZGVscy5ldmFsdWF0aW9uczp1cGRhdGUiLCJtZXNzYWdlSW50ZW50czp1cGRhdGUiLCJtZXNzYWdlczpjcmVhdGUiLCJubGdSZXNwb25zZTpjcmVhdGUiLCJjb252ZXJzYXRpb25Qb2xpY2llczpsaXN0IiwibW9kZWxzLmpvYnM6Y3JlYXRlIiwiZXhhbXBsZXM6Y3JlYXRlIiwicm9sZXM6bGlzdCIsIm1vZGVscy5ldmFsdWF0aW9uczpnZXQiLCJjbGllbnRzOmdldCIsInN0b3JpZXM6ZGVsZXRlIiwibW9kZWxzLm1vZGVsQnlUYWc6Z2V0IiwicmVzcG9uc2VUZW1wbGF0ZXM6Y3JlYXRlIiwicm9sZXMudXNlcnM6dXBkYXRlIiwiZXhhbXBsZXM6bGlzdCIsImZlYXR1cmVzOmNyZWF0ZSIsImFjdGlvblByZWRpY3Rpb246Z2V0IiwicmVzcG9uc2VUZW1wbGF0ZXM6bGlzdCIsImludGVudHM6ZGVsZXRlIiwiYWN0aW9uUHJlZGljdGlvbjpjcmVhdGUiLCJidWxrU3RvcmllczpnZXQiLCJleGFtcGxlczpkZWxldGUiLCJkb21haW46dXBkYXRlIiwiY2xpZW50RXZlbnRzOnVwZGF0ZSIsImRvbWFpbjpnZXQiLCJyZXNwb25zZVRlbXBsYXRlczp1cGRhdGUiLCJtb2RlbHMudGFnczpkZWxldGUiLCJyb2xlczp1cGRhdGUiLCJtb2RlbHMuc2V0dGluZ3M6dXBkYXRlIiwiY2xpZW50TWVzc2FnZXM6bGlzdCIsIm1vZGVscy5ldmFsdWF0aW9uczpkZWxldGUiXX0.eHUVlfsxTKNZTnp-71EaqASqmyyqu2hsfCkv6q97lxo'
  })
};*/

@Injectable({
  providedIn: 'root'
})
export class TrainService {

  traindataUrl = 'http://3.14.100.246:5002/api/projects/default/models/jobs';  // URL to web api
  private handleError: HandleError;

  constructor(private http: HttpClient,httpErrorHandler: HttpErrorHandlerService) { 
    this.handleError = httpErrorHandler.createHandleError('TrainService');
  }

  /** POST: train to the database */

traindata(): Observable<any> {
  return this.http.post<any>(this.traindataUrl," ",httpOptions)
    .pipe(
      catchError(this.handleError('train',""))
    );
}

 /** GET All models from the server */
 getModels (): Observable<any> {
  const url =`http://3.14.100.246:5002/api/projects/default/models?limit=18&offset=0`; // GET api/models
  return this.http.get<any[]>(url,httpOptions)
    .pipe(
      catchError(this.handleError('getModels', ""))
    );
}


 /** GET cureent models from the server */
 getcureentModel (): Observable<any> {
  const url =`http://3.14.100.246:5002/api/projects/default/models?limit=1&offset=0`; // GET api/models
  return this.http.get<any[]>(url,httpOptions)
    .pipe(
      catchError(this.handleError('gegetcureentModeltModels', ""))
    );
}
setToken (data:any): void {    
  httpOptions=data;
  console.log("train載入httpOptions success");

}




}
