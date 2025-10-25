# be-gone (👻) [WIP]

[![Playwright Tests](https://github.com/bahrus/be-gone/actions/workflows/CI.yml/badge.svg?branch=baseline)](https://github.com/bahrus/be-gone/actions/workflows/CI.yml)
[![NPM version](https://badge.fury.io/js/be-gone.png)](http://badge.fury.io/js/be-gone)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/be-gone?style=for-the-badge)](https://bundlephobia.com/result?p=be-gone)
<img src="http://img.badgesize.io/https://cdn.jsdelivr.net/npm/be-gone?compression=gzip">

```html
<!-- goes away when all specified web components are defined -->
<style be-gone-when-defined="my-web-component my-other-web-component">
</style>

<div be-gone-when-missing="*">
  <label>...</label>
  <input>...
</div> 
```


## Fancy example

The following results in 0 layout shift:

```html
<form>
    <fieldset style="max-height:488px;overflow:hidden;" itemscope disabled name=tasks>
        <!-- These temporary elements serve as functional stand-in elements while web component loads-->
        <div be-gone-when-missing=div>
            <div class=stand-in be-gone-when-missing="*">
                <label data-id="{{| createDemoLabel}}" data-for={{createDemo}}>Create demo</label>
                <input data-id="{{@ createDemo}}" type=checkbox>
            </div>

            <div class=stand-in be-gone-when-missing="*">
                <label data-id="{{| writeArticleLabel}}" data-for={{writeArticle}}>Write article</label>
                <input data-id="{{@ writeArticle}}" type=checkbox>
            </div>

            <div class=stand-in be-gone-when-missing="*">
                <label data-id="{{| exerciseLabel}}" data-for={{exercise}}>Exercise</label>
                <input data-id="{{@ exercise}}" type=checkbox>
            </div>

            <style be-gone-when="scratch-box is defined">
                .stand-in {
                    height:145px;
                }
                scratch-box {
                    display: none;
                }
            </style>
        </div>


        <style>
            scratch-box {
                height: 145px;
            }
        </style>

        
        <!-- End of temporary elements -->
        <scratch-box defer-enh-soak-up enh-soak-up="
            name, checked as value
            from #{{createDemo}}
        "
            imp-h="scratch-box/root.mjs">


                
            <span slot=labelTxt defer-soak-up soak-up="
                textContent, itemprop
                    from #{{createDemoLabel}}.
            "></span>
        </scratch-box>
        <scratch-box defer-enh-soak-up disabled enh-soak-up="
            name, checked as value
            from #{{writeArticle}}
            ">

            <span slot=labelTxt defer-soak-up soak-up="
            textContent, itemprop 
            from #{{writeArticleLabel}}"></span>
        </scratch-box>
        <scratch-box defer-enh-soak-up enh-soak-up="
            name, checked as value 
            from #{{exercise}}">

            <span -id slot=labelTxt defer-soak-up soak-up="
                textContent, itemprop from #{{exerciseLabel}}"></span>
        </scratch-box>
    </fieldset>

</form>
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


