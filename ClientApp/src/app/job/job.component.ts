import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Job } from '../interfaces/job/job';
import { JobService } from '../services/job.service';
import { Card } from '../interfaces/card';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AlertService } from '../services/alert.service';
import { Util } from '../utils/util';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class JobComponent implements OnInit {
  public cards: Card[];
  public jobs: Job[] = [];
  private startingPageNum = 1;
  private description: string;
  private location: string;
  private isFiltered: boolean;
  public disabled = false;

  @ViewChild('descriptionInput', { static: true }) descriptionInput: ElementRef;
  @ViewChild('locationInput', { static: true }) locationInput: ElementRef;

  constructor(
    private jobService: JobService,
    private alertService: AlertService,
    private util: Util
  ) {}

  ngOnInit(): void {
    this.getAllJobs();

    this.util
      .addDelayedInput(this.locationInput, 'input', 1000)
      .pipe(
        map((e: { target: HTMLInputElement }) => {
          this.location = e.target.value;
          if (e.target.value) {
            this.isFiltered = true;
            this.startingPageNum = 1;
          }
          this.getAllJobsFiltered(this.description, e.target.value);
        })
      )
      .subscribe();

    this.util
      .addDelayedInput(this.descriptionInput, 'input', 1000)
      .pipe(
        map((e: { target: HTMLInputElement }) => {
          this.description = e.target.value;
          if (e.target.value) {
            this.isFiltered = true;
            this.startingPageNum = 1;
          }
          this.getAllJobsFiltered(e.target.value, this.location);
        })
      )
      .subscribe();
  }

  public onExternalLinkClick(externalLink: string): void {
    window.open(externalLink);
  }

  private getAllJobs(): Subscription {
    return this.jobService
      .getAll()
      .subscribe((j: Job[]) => (this.jobs = [...j]));
  }

  private getAllJobsFiltered(
    description: string = '',
    location: string = ''
  ): Subscription {
    return this.jobService
      .getByDescriptionTypeLocationPageNumber(description, location, true)
      .subscribe((j: Job[]) => {
        if (!!j) {
          this.jobs = [...j];
          this.disabled = false;
        } else {
          this.jobs = [];
          this.alertService.error('No matching jobs found', {
            autoClose: true,
          });
          this.disabled = true;
        }
      });
  }

  public showMoreJobs(): Subscription {
    if (this.isFiltered) {
      return this.jobService
        .getByDescriptionTypeLocationPageNumber(
          this.description,
          this.location,
          true,
          (this.startingPageNum += 1)
        )
        .subscribe((j: Job[]) => {
          if (!!j) {
            this.jobs = [...this.jobs, ...j];
          } else {
            this.alertService.error('No more jobs to show', {
              autoClose: true,
            });
            this.disabled = true;
          }
        });
    } else {
      return this.jobService
        .getByPageNumber((this.startingPageNum += 1))
        .subscribe((j: Job[]) => (this.jobs = [...this.jobs, ...j]));
    }
  }
}
