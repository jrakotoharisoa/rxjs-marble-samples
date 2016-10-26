import { ConnectableObservable, Subject } from 'rxjs';
import { Scheduler } from 'rxjs/scheduler';


export interface IMessage {
    from: string;
    to: string;
    text: string;
}

export default class MailBox {

    private box$: Subject<IMessage>;

    constructor(deliver$: ConnectableObservable<IMessage>, mail: string) {
        const myMessage$ = deliver$
            .filter(({to}) => { console.log(`${to} equals ${mail}`); return to === mail })
            .share();

        this.box$ = new Subject<IMessage>();
        myMessage$.subscribe(this.box$);
    }

    get boxStream() {
        return this.box$.asObservable();
    }
}