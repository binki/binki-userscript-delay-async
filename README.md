## Usage

Include this in your userscript using [`@require`](https://wiki.greasespot.net/Metadata_Block#.40require). It is recommended to [use a permalink](https://docs.github.com/en/repositories/working-with-files/using-files/getting-permanent-links-to-files) instead of referring to `master`.

```js
// ==UserScript==
// @name example
// @version 1.0
// @require https://github.com/binki/binki-userscript-delay-async/raw/master/binki-userscript-delay-async.js
// ==UserScript==

(async () => {
  // Log the current time every second (note that setInterval() would be more suited to this use case).
  while (true) {
    console.log(`It is now ${new Date()}`);
    await delayAsync(1000);
  }
})();
```

## API

```js
delayAsync(timeout, ct);
```

Parameters:

* `timeout` is a `Number` passed directly to [`setTimeout()`](https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-settimeout) as its `timeout` (second) argument.
* `ct` is an [`AbortSignal`](https://dom.spec.whatwg.org/#abortsignal) which can be used to reject the returned `Promise` early with a `new `[`DOMException`](https://webidl.spec.whatwg.org/#idl-DOMException)`(…, `[`'AbortError'`](https://webidl.spec.whatwg.org/#aborterror)`)`.

Returns:

A `Promise` which will resolve to undefined after the delay (negative or omitted delay is treated as `0`) or is rejected with `new `[`DOMException`](https://webidl.spec.whatwg.org/#idl-DOMException)`(…, `[`'AbortError'`](https://webidl.spec.whatwg.org/#aborterror)`)` if a passed in `ct` was aborted.
