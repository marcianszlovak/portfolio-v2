import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Job } from '../interfaces/job/job';
import { JobService } from '../services/job.service';
import { Card } from '../interfaces/card';
import {
  BehaviorSubject,
  combineLatest,
  forkJoin,
  fromEvent,
  interval,
  merge,
  of,
  zip,
} from 'rxjs';
import {
  concatMap,
  debounceTime,
  delay,
  distinctUntilChanged,
  map,
  mergeAll,
  mergeMap,
  pluck,
} from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss'],
})
export class JobComponent implements OnInit {
  public cards: Card[];
  public jobs: Job[] = [];
  private startingPageNum = 1;

  @ViewChild('locationInput', { static: true }) locationInput: ElementRef;
  @ViewChild('descriptionInput', { static: true }) descriptionInput: ElementRef;

  constructor(
    private jobService: JobService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    this.getAllJobs();

    const documentEvent = (event, eventName) =>
      fromEvent(event, eventName).pipe(map((e: any) => e.target.value));

    merge(
      documentEvent(this.locationInput.nativeElement, 'keyup'),
      documentEvent(this.descriptionInput.nativeElement, 'keyup')
    ).subscribe((data) => console.log(data));

    // const descriptionInput$ = fromEvent(
    //   this.descriptionInput.nativeElement,
    //   'keyup'
    // ).pipe(
    //   debounceTime(1000),
    //   pluck('target', 'value'),
    //   distinctUntilChanged()
    // );
    // //   map((value: string) => this.getAllJobsFiltered(value, ''))
    // // );
    //
    // const locationInput$ = fromEvent(
    //   this.locationInput.nativeElement,
    //   'keyup'
    // ).pipe(
    //   debounceTime(1000),
    //   pluck('target', 'value'),
    //   distinctUntilChanged()
    // );
    //
    // zip(descriptionInput$, locationInput$)
    //   .pipe(map((x: any) => x.flat()))
    //   .subscribe((data) => console.log(data));
  }

  onExternalLinkClick(externalLink: string): void {
    window.open(externalLink);
  }

  public transformDate(date: string): string {
    return new Date(date).toLocaleDateString();
  }

  public getAllJobs() {
    return this.jobService.getAll().subscribe((j) => (this.jobs = [...j]));
  }

  public getAllJobsFiltered(description: string, location: string) {
    return this.jobService
      .getByDescriptionTypeLocationPageNumber(
        description,
        location,
        true,
        this.startingPageNum
      )
      .subscribe((j) => (this.jobs = [...j]));
  }

  public showMoreJobs() {
    this.jobService
      .getByPageNumber((this.startingPageNum += 1))
      .subscribe((j) => (this.jobs = [...this.jobs, ...j]));
  }
}
