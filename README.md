# NativeScript Simple Webview Plugin

A simple plugin for providing webview functionality to your NativeScript app, with the added ability to programmatically close the webview (in iOS).

## Installation

```
tns plugin add nativescript-simple-webview
```

## Usage 

Unlike other nativescript webview plugins the simple webview plugin exposes a `SimpleWebView` interface with a single instance method named `close()`.

``` TypeScript
import { openUrl } from 'nativescript-simple-webview';

const webview = openUrl({
    url: 'http://www.google.com',
});

webview.close();
```

## License

MIT
