/**
 * Opens the url returning an instance of the web view.
 * @param options
 */
export function openUrl(options: SimpleWebViewOptions): SimpleWebView;


export interface SimpleWebView {
    /**
     * Closes the web view instance (ios only).
     */
    close: () => void;
}

export interface SimpleWebViewOptions {
    /**
     * The url of the site to open.
     */
    url: string;

    /**
     * Enables animation effects when opening and closing the webview.
     */
    isAnimated?: boolean;

    /**
     * The color of the toolbar.
     */
    toolbarColor?: string;

    /**
     * Set true to show the site title (android only).
     */
    showTitle?: boolean;

    /**
     * The color of the toolbar controls (ios only).
     */
    toolbarControlsColor?: string;
}
