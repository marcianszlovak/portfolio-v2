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
import { fromEvent, Subscription } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  distinctUntilKeyChanged,
  map,
  pluck,
} from 'rxjs/operators';

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

  @ViewChild('descriptionInput', { static: true }) descriptionInput: ElementRef;
  @ViewChild('locationInput', { static: true }) locationInput: ElementRef;

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.getAllJobs();

    const descriptionInput$ = fromEvent(
      this.descriptionInput.nativeElement,
      'keyup'
    );

    const locationInput$ = fromEvent(this.locationInput.nativeElement, 'keyup');

    locationInput$
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
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

    descriptionInput$
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
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

  onExternalLinkClick(externalLink: string): void {
    window.open(externalLink);
  }

  public transformDate(date: string): string {
    return new Date(date).toLocaleDateString();
  }

  public getAllJobs(): Subscription {
    return this.jobService.getAll().subscribe((j) => (this.jobs = [...j]));
  }

  public getAllJobsFiltered(
    description: string = '',
    location: string = ''
  ): Subscription {
    return this.jobService
      .getByDescriptionTypeLocationPageNumber(description, location, true)
      .subscribe((j) => (this.jobs = [...j]));
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
        .subscribe((j) => (this.jobs = [...this.jobs, ...j]));
    } else {
      return this.jobService
        .getByPageNumber((this.startingPageNum += 1))
        .subscribe((j) => (this.jobs = [...this.jobs, ...j]));
    }
  }
}
