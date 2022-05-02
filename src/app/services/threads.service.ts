import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class ThreadsService {

  constructor(private http: HttpClient) { }

  loadThread(threadURL: string) {
    return this.http.get(environment.API_URL,{
      params: {
        url: threadURL
      }
    })
  }

}