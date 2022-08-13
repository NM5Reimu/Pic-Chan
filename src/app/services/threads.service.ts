import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ResponceDvachThread } from '../store/models/threads.model';

@Injectable()
export class ThreadsService {

  constructor(private http: HttpClient) { }

  loadThread(threadURL: string) {
    return this.http.get<ResponceDvachThread>(environment.API_URL,{
      params: {
        url: threadURL
      }
    })
  }

}