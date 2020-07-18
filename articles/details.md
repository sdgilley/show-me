---
title: Details
---

# How we did it

## Register component

Follow the [instructions to register the component](https://devdiv.visualstudio.com/DevDiv/_git/AzureNotebooks?path=%2Fdocs%2F07-notebook-rp.md&version=GTrelease-latest&_a=preview) and get the access keys.


## Custom template

In your DocFx site, create a custom template containing these files:

* **partials** folder
  * **[head.tmpl.partial](#head)**
* **styles** folder
  * **[main.css](#css)**
  * **[main.js](#js)**

The contents of each of these files are shown below.

### <a id="head"></a>partials/head.tmpl.partial

Copy this file from the default template and add these lines:

:::code language="html" source="../custom-template/partials/head.tmpl.partial" range="15,16":::

### <a id="js"></a>styles/main.js

Create the file with this content:

:::code language="javascript" source="../custom-template/styles/main.js" :::

### <a id="css"></a>styles/main.css

Create the file with this content:

:::code language="css" source="../custom-template/styles/main.css" :::

## Try it out

Working on adding markdown syntax.  In the meantime, use the html:

```html
<div id="notebook1" class="aznb" path="<path to raw notebook on github>"></div>

```
