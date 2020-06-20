import {takeWhile} from 'rxjs/operators';
import {Subscription, timer} from 'rxjs';

export function getObservable(dueTime: number, period: number, predicate: boolean) {
  return timer(dueTime, period)
    .pipe(takeWhile(() => predicate));
}

export function unsubscribeObservable(subscription: Subscription) {
  subscription.unsubscribe();
}
