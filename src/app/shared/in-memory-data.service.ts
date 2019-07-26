import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';
import { Profile, Gender, hobby } from '../model/profile';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const profiles: Profile[] = [];
    return { profiles };
  }

  // ID Generator
  genId(profiles: Profile[]): number {
    return profiles.length > 0 ? Math.max(...profiles.map(profile => profile.id)) + 1 : 11;
  }

  constructor() { }
}
