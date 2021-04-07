import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Job } from '../interfaces/job/job';
import { JobQuery } from '../interfaces/job/job-query';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private readonly baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'https://localhost:5001/api/jobs/';
  }

  public getAll(): Observable<Job[]> {
    return this.httpClient.get<Job[]>(this.baseUrl);
  }

  public getByPageNumber(query: JobQuery): Observable<Job[]> {
    return this.httpClient.get<Job[]>(`${this.baseUrl}page/${query.pageNum}`);
  }

  public getByDescriptionTypeLocationPageNumber(
    query: JobQuery
  ): Observable<Job[]> {
    return this.httpClient.get<Job[]>(
      `${this.baseUrl}description?description=${query.description}&full_time=${query.isFullTime}&location=${query.location}&page=${query.pageNum}`
    );
  }
}
