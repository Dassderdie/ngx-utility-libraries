# NgxShowMore

[![npm](https://img.shields.io/npm/v/ngx-show-more/latest.svg)](https://www.npmjs.com/package/ngx-show-more)

-   Unopinionated
-   Works with `ChangeDetectionStrategy.OnPush`

## Install

Make sure you are using at least `angular@12.0.0`.

Install ngx-show-more from npm:

```
npm install ngx-show-more --save
```

Add to your NgModule imports:

```ts
import { NgxShowMoreModule } from 'ngx-show-more';

@NgModule({
  ...
  imports: [NgxShowMoreModule,...]
  ...
})
```

Add the component to your template:

```html
<p>Some HTML code.</p>

<ngx-show-more defaultHeight="40px" btnClasses="btn btn-sm btn-light m-1">
    <h2>Title</h2>
    <p>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
        voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
        clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
        amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
        nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
        sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
        rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
        ipsum dolor sit amet.
    </p>
</ngx-show-more>
```

## Code scaffolding

Run `ng generate component component-name --project ngx-show-more` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project ngx-show-more`.

> Note: Don't forget to add `--project ngx-show-more` or else it will be added to the default project in your `angular.json` file.

## Build

Run `ng build ngx-show-more` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build ngx-show-more`, go to the dist folder `cd dist/ngx-show-more` and run `npm publish`.
