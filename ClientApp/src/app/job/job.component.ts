import { Component, OnInit } from '@angular/core';
import { Job } from '../interfaces/job/job';
import { JobService } from '../services/job.service';
import { map } from 'rxjs/operators';
import { Card } from '../interfaces/card';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss'],
})
export class JobComponent implements OnInit {
  public cards: Card[];
  public jobs: Job[];
  private startingPageNum = 1;

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.getAllJobs();
  }

  onExternalLinkClick(externalLink: string): void {
    window.open(externalLink);
  }

  public transformDate(date: string): string {
    return new Date(date).toLocaleDateString();
  }

  public getAllJobs() {
    this.jobService
      .getByPageNumber(this.startingPageNum)
      .pipe(map((e) => (this.jobs = [...e])))
      .subscribe(console.log);
  }

  public goToNextPage() {
    this.jobService
      .getByPageNumber((this.startingPageNum = this.startingPageNum + 1))
      .pipe(map((j) => (this.jobs = [...j])))
      .subscribe(console.log);
  }
}
