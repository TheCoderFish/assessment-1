import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Profile } from '../model/profile';



@Injectable({ providedIn: 'root' })
export class ProfileService {

    private profileUrl = 'api/profiles';  // URL to web api

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(private http: HttpClient) { }

    getProfiles(): Observable<Profile[]> {
        return this.http.get<Profile[]>(this.profileUrl);
    }

    /** POST: add a new Profile to the server */
    addProfile(profile: Profile): Observable<Profile> {
        return this.http.post<Profile>(this.profileUrl, profile, this.httpOptions).pipe(
            catchError(this.handleError<Profile>('addProfile'))
        );
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            //this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}
