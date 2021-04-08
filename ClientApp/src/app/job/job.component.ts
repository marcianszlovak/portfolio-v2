import { Component, OnInit } from '@angular/core';
import { Job } from '../interfaces/job/job';
import { JobService } from '../services/job.service';
import { Card } from '../interfaces/card';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss'],
})
export class JobComponent implements OnInit {
  public cards: Card[];
  public jobs: Job[] = [];
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
    this.jobService.getAll().subscribe((j) => (this.jobs = [...j]));
  }

  public showMoreJobs() {
    this.jobService
      .getByPageNumber((this.startingPageNum += 1))
      .subscribe((j) => (this.jobs = [...this.jobs, ...j]));
  }
}
