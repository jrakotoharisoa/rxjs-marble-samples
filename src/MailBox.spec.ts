import MailBox, { IMessage } from './MailBox';
import { Subject, TestScheduler } from 'rxjs';
import { expect } from 'chai';

describe('MailBox - boxStream', () => {
    const event1 = {
        to: 'jr@mail.com',
        from: 'hello@mail.com',
        text: 'Hello'
    };

    const event2 = {
        to: 'unknown@mail.com',
        from: 'hello@mail.com',
        text: 'Hello'
    };
    it('should only receive mail for email box', () => {
        // Given
        const deliver$ = new Subject<IMessage>();
        const co_deliver$ = deliver$.publish();
        const mailBox = new MailBox(co_deliver$, 'jr@mail.com');
        const msgReceived: IMessage[] = [];

        mailBox.boxStream.subscribe(m => msgReceived.push(m));

        // When
        co_deliver$.connect();

        deliver$.next(event1);
        deliver$.next(event2);

        // Then
        expect(msgReceived.length).to.eql(1);
        expect(msgReceived[0]).to.eql(event1);
    });

    it('should only receive mail for email box (use Marble)', () => {
        // Marble setup
        const scheduler = new TestScheduler((a, b) => { expect(a).to.eqls(b); });
        const src = '--a-b-';
        const exp = '--a---';
        const deliver$ = scheduler.createHotObservable<IMessage>(src, { a: event1, b: event2 });

        // Given
        const co_deliver$ = deliver$.publish();
        const mailBox = new MailBox(co_deliver$, 'jr@mail.com');

        // When
        co_deliver$.connect();

        //Then
        scheduler.expectObservable(mailBox.boxStream).toBe(exp, { a: event1, b: event2 });
        scheduler.flush();
    });
})