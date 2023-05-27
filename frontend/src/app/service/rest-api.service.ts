import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Machine} from "../model/machine";

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  private baseURL = "http://192.168.1.98:8080/api/v1/";

  constructor(private httpClient: HttpClient) { }

  getMachinesList() : Observable<Machine[]>{
    return this.httpClient.get<Machine[]>(this.baseURL +"machines").pipe(
      catchError(this.errorHandler)
    );
  }

  getMachineHealth(id: number) : Observable<any>{
    return this.httpClient.get<any>(this.baseURL + "machines/" + id +"?endpoint=health").pipe(
      catchError(this.errorHandler)
    );
  }

  addMachine(machine:Machine) : Observable<Machine>{
    return this.httpClient.post<Machine>(this.baseURL + "machines", machine).pipe(
      catchError(this.errorHandler)
    );
  }

  deleteMachine(id:number){
    // @ts-ignore
    return this.httpClient.delete<string>(this.baseURL + "machines/" + id, { responseType: 'text' }).pipe(
      catchError(this.errorHandler)
    );
  }

  updateMachine(machine:Machine) : Observable<Machine>{
    return this.httpClient.put<Machine>(this.baseURL + "machines", machine).pipe(
      catchError(this.errorHandler)
    );
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
