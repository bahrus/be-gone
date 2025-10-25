# be-gone (👻)

[![Playwright Tests](https://github.com/bahrus/be-gone/actions/workflows/CI.yml/badge.svg?branch=baseline)](https://github.com/bahrus/be-gone/actions/workflows/CI.yml)
[![NPM version](https://badge.fury.io/js/be-gone.png)](http://badge.fury.io/js/be-gone)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/be-gone?style=for-the-badge)](https://bundlephobia.com/result?p=be-gone)
<img src="http://img.badgesize.io/https://cdn.jsdelivr.net/npm/be-gone?compression=gzip">

```html
<style be-gone-when="my-web-component is defined">
</style>

<div be-gone-when="contents are empty">
  <label>...</label>
  <input>...
</div> 
```

## Viewing Locally

Any web server that serves static files (html, css, js) will do but...

1.  Install git.
2.  Fork/clone this repo.
3.  Install node.
4.  Open command window to folder where you cloned this repo.
5.  > npm install
6.  > npm run serve
7.  Open http://localhost:8000/demo in a modern browser.

## Importing in ES Modules:

```JavaScript
import 'be-gone/be-gone.js';
```

## Using from CDN:

```html
<script type=module crossorigin=anonymous>
    import 'https://esm.run/be-gone';
</script>
```


