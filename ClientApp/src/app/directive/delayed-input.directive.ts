import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Event } from '@angular/router';

@Directive({
  selector: '[appDelayedInput]',
})
export class DelayedInputDirective implements OnInit {
  public description: string;
  public location: string;

  @Input() delayTime: number;
  @Output() delayedInput = new EventEmitter<Event>();

  constructor(private elementRef: ElementRef<HTMLInputElement>) {}

  ngOnInit() {
    fromEvent(this.elementRef.nativeElement, 'input').pipe(
      debounceTime(this.delayTime),
      distinctUntilChanged(null, (e) => (e.target as HTMLInputElement).value)
    );
  }
}
