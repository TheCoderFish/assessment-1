import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Profile } from '../model/profile';



@Injectable({ providedIn: 'root' })
export class ProfileService {

    private profileUrl = 'api/profiles';  // URL to web api

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(private http: HttpClient) { }

    // Get all Profiles
    getProfiles(): Observable<Profile[]> {
        return this.http.get<Profile[]>(this.profileUrl);
    }

    // POST: add a new Profile to the server */
    addProfile(profile: Profile): Observable<Profile> {
        return this.http.post<Profile>(this.profileUrl, profile, this.httpOptions).pipe(
            catchError(this.handleError<Profile>('addProfile'))
        );
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            return of(result as T);
        };
    }
}
