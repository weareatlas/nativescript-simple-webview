import {Color} from 'tns-core-modules/color';
import {SimpleWebView, SimpleWebViewOptions} from "./index";

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



