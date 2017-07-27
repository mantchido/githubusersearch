import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';

import { Users } from '../../models/user';

@Injectable()
export class GithubUsersProvider {
  githubApiUrl: string;
  items: any;

  constructor(public http: Http) {
    this.githubApiUrl = 'https://api.github.com';
  }

  load(): Observable<Users[]> {
    return this.http.get(`${this.githubApiUrl}/users`)
      .map(res => <Users[]>res.json());
  }

  loadDetails(login: string): Observable<Users> {
    return this.http.get(`${this.githubApiUrl}/users/${login}`)
      .map(res => <Users>(res.json()));
  }

  searchUsers(searchParam: string): Observable<Users[]> {
    return this.http.get(`${this.githubApiUrl}/search/users?q=${searchParam}`)
      .map(res => <Users[]>(res.json().items))
  }

}
