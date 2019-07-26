import {Observable} from 'tns-core-modules/data/observable';
import {openUrl} from 'nativescript-simple-webview';

export class HelloWorldModel extends Observable {

    constructor() {
        super();
    }

    public onTap() {
        const x = openUrl({
            url: 'http://www.google.com',
        });

        setTimeout(x.close, 5000);
    }
}
