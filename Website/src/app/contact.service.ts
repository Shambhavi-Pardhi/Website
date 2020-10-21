import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, combineAll, map, tap } from 'rxjs/operators';


import { Contact } from './contact';
import { MessageService } from './message.service';



@Injectable({ providedIn: 'root' })
export class ContactService {

    private getUrl = 'https://cs251-outlab-6.herokuapp.com/initial_values/';  // URL to web api
    private postUrl = 'https://cs251-outlab-6.herokuapp.com/add_new_feedback/'

    httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  
    constructor(
      private http: HttpClient,
      private messageService: MessageService) { }

    getContact(): Observable<Contact> {
        return this.http.get<Contact>(this.getUrl);
    }

    /** POST: add a new hero to the database */
    postContact(contact: Contact): Observable<any> {
      return this.http.post<Contact>(this.postUrl, contact, this.httpOptions).pipe(
        catchError(this.handleError<Contact>('postContact')));
    }

  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); 
      console.log(error.message);
      alert('An error occured while posting data. Please try again with valid inputs!');
      return of(result as T);
    };
  }

}