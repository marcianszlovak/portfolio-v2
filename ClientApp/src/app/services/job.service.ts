import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  constructor(private httpClient: HttpClient) {}

  public getAllJobs() {
    return this.httpClient.get('https://localhost:5001/api/jobs');
  }
}
