import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { ApiError } from "../models/page.model";

@Injectable({
   providedIn: 'root'
 })
 export class ErrorHandleService {
 
   constructor() { }
 
   handleError(err: HttpErrorResponse): Observable<never> {
     const isApiError = (value: ApiError): value is ApiError => !!value?.logId;
     
     let errorMessage = '';
 
     if (!!err.error && isApiError(err.error)) { // handle ApiError
       errorMessage = `An error occurred: logId: ${err.error.logId}, status: ${err.error.httpStatus}, message: ${err.error.message}`;
     } else if (!!err.error && err.error instanceof ErrorEvent) {
       errorMessage = `An error occurred: ${err.error.message}`;  
     } else {
       errorMessage = `An error occurred: ${err.message}`;
     }
     return throwError(() => errorMessage);    
   }
 
 }
 