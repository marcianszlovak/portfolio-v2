import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private readonly baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'https://localhost:5001/api/jobs/';
  }

  public getAll() {
    return this.httpClient.get(this.baseUrl);
  }

  public getByPageNumber(pageNum: number) {
    return this.httpClient.get(`${this.baseUrl}page/${pageNum}`);
  }

  public getByDescriptionTypeLocationPageNumber(
    description?: string,
    isFullTime?: boolean,
    location?: string,
    pageNum?: number
  ) {
    return this.httpClient.get(
      `${this.baseUrl}description?description=${description}&full_time=${isFullTime}&location=${location}&page=${pageNum}`
    );
  }
}
