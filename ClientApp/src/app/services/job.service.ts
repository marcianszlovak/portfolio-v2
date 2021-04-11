import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Job } from '../interfaces/job/job';

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

  public getByPageNumber(pageNum: number): Observable<Job[]> {
    return this.httpClient.get<Job[]>(`${this.baseUrl}page/${pageNum}`);
  }

  public getByDescriptionTypeLocationPageNumber(
    description: string = '',
    location: string = '',
    isFullTime?: boolean,
    pageNum: number = 1
  ): Observable<Job[]> {
    return this.httpClient.get<Job[]>(
      `${this.baseUrl}description?description=${description}&full_time=${isFullTime}&location=${location}&page=${pageNum}`
    );
  }
}
