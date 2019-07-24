import {Color} from 'tns-core-modules/color';
import * as utils from 'tns-core-modules/utils/utils';
import {SimpleWebView, SimpleWebViewOptions} from "./index";

class SFSafariViewControllerDelegateImpl extends NSObject implements SFSafariViewControllerDelegate {

    private _owner: WeakRef<any>;
    private _callback: Function;

    public static initWithOwnerCallback(owner: WeakRef<any>, callback: Function): SFSafariViewControllerDelegateImpl {
        let delegate = <SFSafariViewControllerDelegateImpl>SFSafariViewControllerDelegateImpl.new();
        delegate._owner = owner;
        delegate._callback = callback;
        return delegate;
    }

    safariViewControllerDidCompleteInitialLoad(controller: SFSafariViewController, didLoadSuccessfully: boolean): void {
    }

    safariViewControllerDidFinish(controller: SFSafariViewController): void {
        if (this._callback && typeof this._callback === 'function') {
            this._callback(true);
        }
    }
}

export function openUrl(options: SimpleWebViewOptions): SimpleWebView {

    if (!options.url) {
        throw new Error('Please provide a url');
    }

    let viewController = SFSafariViewController.alloc().initWithURL(NSURL.URLWithString(options.url));

    if (options.toolbarColor) {
        viewController.preferredBarTintColor = new Color(options.toolbarColor).ios;
    }

    if (options.toolbarControlsColor) {
        viewController.preferredControlTintColor = new Color(options.toolbarControlsColor).ios;
    }

    viewController.delegate = SFSafariViewControllerDelegateImpl.initWithOwnerCallback(new WeakRef({}), options.isClosed);

    let app = utils.ios.getter(UIApplication, UIApplication.sharedApplication);

    const isAnimated = options.isAnimated || false;
    const completionHandler = null;

    app.keyWindow.rootViewController.presentViewControllerAnimatedCompletion(viewController, isAnimated, completionHandler);

    return {
        close: () => {
            viewController.dismissViewControllerAnimatedCompletion(isAnimated, null);
        }
    };
}



