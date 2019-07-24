import {Color} from 'tns-core-modules/color';
import {SimpleWebView, SimpleWebViewOptions} from "./index";

class SFSafariViewControllerDelegateImpl extends NSObject implements SFSafariViewControllerDelegate {

    private _callback: Function;

    static ObjCProtocols = [SFSafariViewControllerDelegate]

    static new(): SFSafariViewControllerDelegateImpl {
        return <SFSafariViewControllerDelegateImpl>super.new();
    }

    setCallback(callback: Function) {
        this._callback = callback;
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

    const delegate = new SFSafariViewControllerDelegateImpl();

    if (options.isClosed) {
        delegate.setCallback(options.isClosed);
    }

    viewController.delegate = delegate;

    let app = UIApplication.sharedApplication;

    const isAnimated = options.isAnimated || false;
    const completionHandler = null;

    app.keyWindow.rootViewController.presentViewControllerAnimatedCompletion(viewController, isAnimated, completionHandler);

    return {
        close: () => {
            viewController.dismissViewControllerAnimatedCompletion(isAnimated, null);
        }
    };
}



