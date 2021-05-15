import { ElementRef, Injectable } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Injectable()
export class Util {
  constructor() {}

  public addDelayedInput(
    element: ElementRef,
    eventName: string,
    delayTime: number
  ): Observable<{ target: HTMLInputElement }> {
    return fromEvent(element.nativeElement, eventName).pipe(
      debounceTime(delayTime),
      distinctUntilChanged(
        null,
        (e: { target: HTMLInputElement }) => e.target.value
      )
    );
  }
}
