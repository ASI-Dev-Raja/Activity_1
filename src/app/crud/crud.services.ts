import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, tap, throwError, map } from "rxjs";

import { ICrud } from "./crud";



@Injectable({
  providedIn: 'root'
})
export class CrudService {
  private productUrl = 'https://34.160.139.26.nip.io/test-dev';
  constructor(private http: HttpClient) { }

  getProducts(): Observable<ICrud[]> {
    return this.http.get<ICrud[]>(this.productUrl + "/fetch")
      .pipe(
        tap(data => console.log('All: ', JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }

  getProduct(id: number): Observable<ICrud | undefined> {
    return this.getProducts()
      .pipe(
        map((products: ICrud[]) => products.find(p => p.id === id))
      );
  }

  deleteProduct(id:number): Observable<any>{
    return this.http.delete(this.productUrl + "/delete/"+id)
    //https://34.160.139.26.nip.io/test-dev/delete/{id}
  }

  createProduct(input_name:string,input_email:string): Observable<any>{
    const data = {
      "name": input_name,
      "email": input_email
    }
    return this.http.post(this.productUrl+"/create",data)
  }

  updateProduct(id:number,input_name:string,input_email:string):Observable<any>{
    const data = {
      "name": input_name,
      "email": input_email
    }
    return this.http.put(this.productUrl+"/update/"+id,data)
  }

}
