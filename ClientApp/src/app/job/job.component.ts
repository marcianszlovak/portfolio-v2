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
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, pluck } from 'rxjs/operators';

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

  private description;
  private location;

  private isFiltered: boolean;

  @ViewChild('descriptionInput', { static: true }) descriptionInput: ElementRef;
  @ViewChild('locationInput', { static: true }) locationInput: ElementRef;

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.getAllJobs();

    const descriptionInput$ = fromEvent(
      this.descriptionInput.nativeElement,
      'keyup'
    )
      .pipe(
        debounceTime(1000),
        pluck('target', 'value'),
        distinctUntilChanged(),
        map((value: string) => {
          this.description = value;
          // this.getAllJobsFiltered(value, '');
        })
      )
      .subscribe();

    const locationInput$ = fromEvent(this.locationInput.nativeElement, 'keyup')
      .pipe(
        debounceTime(1000),
        pluck('target', 'value'),
        distinctUntilChanged(),
        map((value: string) => {
          this.location = value;
          // this.getAllJobsFiltered('', value);
        })
      )
      .subscribe();

    fromEvent(this.locationInput.nativeElement, 'keyup')
      .pipe(
        debounceTime(1000),
        map((e: any) => {
          this.location = e.target.value;
          if (e.target.value) {
            this.isFiltered = true;
          }
          this.getAllJobsFiltered(this.description, e.target.value);
        }),
        distinctUntilChanged()
      )
      .subscribe();

    fromEvent(this.descriptionInput.nativeElement, 'keyup').subscribe(
      (a: any) => {
        this.description = a.target.value;
        if (a.target.value) {
          this.isFiltered = true;
        }
        this.getAllJobsFiltered(a.target.value, this.location);
      }
    );

    this.getAllJobsFiltered(this.description, this.location);

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

  public getAllJobsFiltered(description: string = '', location: string = '') {
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
    if (this.isFiltered) {
      this.jobService
        .getByDescriptionTypeLocationPageNumber(
          this.description,
          this.location,
          true,
          (this.startingPageNum += 1)
        )
        .subscribe((j) => {
          this.jobs = [...this.jobs, ...j];
        });
    }
    //   this.jobService
    //     .getByPageNumber((this.startingPageNum += 1))
    //     .subscribe((j) => {
    //       console.log(j);
    //       if (this.isFiltered) {
    //         const filteredJobs = j.filter((job) => {
    //           if (this.location) {
    //             return job.location.includes(this.location);
    //           }
    //
    //           if (this.description) {
    //             return job.description.includes(this.description);
    //           }
    //         });
    //         console.log(filteredJobs);
    //         this.jobs = [...this.jobs, ...filteredJobs];
    //       } else {
    //         this.jobs = [...this.jobs, ...j];
    //       }
    //     });
  }
}
