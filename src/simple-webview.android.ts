import * as app from 'tns-core-modules/application';
import {Color} from 'tns-core-modules/color';
import {SimpleWebView, SimpleWebViewOptions} from "./index";
import CustomTabsIntent = androidx.browser.customtabs.CustomTabsIntent;

const REQUEST_CODE = 1868;

export function openUrl(options: SimpleWebViewOptions): SimpleWebView {

    if (!options.url) {
        throw new Error('Please provide a url');
    }

    app.android.on(app.AndroidApplication.activityResultEvent, (args: any) => {
        const requestCode = args.requestCode;
        const resultCode = args.resultCode;
        if (requestCode === REQUEST_CODE) {
            if (resultCode === (<any> android).app.Activity.RESULT_CANCELED) {
                app.android.off(app.AndroidApplication.activityResultEvent);
            }
        }
    });

    let activity = app.android.startActivity || app.android.foregroundActivity;
    const intentBuilder: CustomTabsIntent.Builder = new CustomTabsIntent.Builder();

    if (intentBuilder) {
        if (options.toolbarColor) {
            intentBuilder.setToolbarColor(new Color(options.toolbarColor).android);
        }

        if (options.showTitle) {
            intentBuilder.setShowTitle(options.showTitle);
        }

        intentBuilder.addDefaultShareMenuItem(); /// Adds a default share item to the menu.
        intentBuilder.enableUrlBarHiding(); /// Enables the url bar to hide as the user scrolls down on the page.
    }
    const customTabsIntent = intentBuilder.build();
    customTabsIntent.intent.setFlags(android.content.Intent.FLAG_ACTIVITY_NO_HISTORY | android.content.Intent.FLAG_ACTIVITY_NEW_TASK);
    customTabsIntent.launchUrl(activity, android.net.Uri.parse(options.url));

    return {
        close: () => {
        }
    };
}

