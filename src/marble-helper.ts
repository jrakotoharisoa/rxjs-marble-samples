import { Observable } from 'rxjs/Observable';
import { SubscriptionLog } from 'rxjs/testing/SubscriptionLog';
import { ColdObservable } from 'rxjs/testing/ColdObservable';
import { HotObservable } from 'rxjs/testing/HotObservable';
import { observableToBeFn, subscriptionLogsToBeFn, TestScheduler } from 'rxjs/testing/TestScheduler';

declare const global: any;

export function init(assertEqual: (actual: any, expected: any) => void) {
    global.rxTestScheduler = new TestScheduler(assertEqual);
}

export function flush() {
    if (!global.rxTestScheduler) {
        throw 'tried to use flush() in async test';
    }
    global.rxTestScheduler.flush();
}

export function hot<T>(marbles: string, values?: { [id: string]: T }, error?: any): HotObservable<T> {
    if (!global.rxTestScheduler) {
        throw 'tried to use hot() in async test';
    }
    return global.rxTestScheduler.createHotObservable.apply(global.rxTestScheduler, arguments);
}

export function cold<T>(marbles: string, values?: { [id: string]: T }, error?: any): ColdObservable<T> {
    if (!global.rxTestScheduler) {
        throw 'tried to use cold() in async test';
    }
    return global.rxTestScheduler.createColdObservable.apply(global.rxTestScheduler, arguments);
}

export function expectObservable(observable: Observable<any>,
    unsubscriptionMarbles: string = null): ({ toBe: observableToBeFn }) {
    if (!global.rxTestScheduler) {
        throw 'tried to use expectObservable() in async test';
    }
    return global.rxTestScheduler.expectObservable.apply(global.rxTestScheduler, arguments);
}

export function expectSubscriptions(actualSubscriptionLogs: SubscriptionLog[]): ({ toBe: subscriptionLogsToBeFn }) {
    if (!global.rxTestScheduler) {
        throw 'tried to use expectSubscriptions() in async test';
    }
    return global.rxTestScheduler.expectSubscriptions.apply(global.rxTestScheduler, arguments);
}

export function time(marbles: string): number {
    if (!global.rxTestScheduler) {
        throw 'tried to use time() in async test';
    }
    return global.rxTestScheduler.createTime.apply(global.rxTestScheduler, arguments);
}