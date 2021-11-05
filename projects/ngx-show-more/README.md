# NgxShowMore

[![npm](https://img.shields.io/npm/v/ngx-show-more/latest.svg)](https://www.npmjs.com/package/ngx-show-more)

-   Does not only support text, but arbitrary HTML and Angular components that dynamically change in height
-   Unopinionated
-   Works with `ChangeDetectionStrategy.OnPush`
-   i18n support: to be done

## Install

Make sure you are using **Angular 12**.

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

Add the component to your template (this example uses [bootstrap](https://getbootstrap.com/) classes in `btnClasses`, for these to work you would have to import bootstrap. Instead you can also use your own css-framework or create your own css-class):

```html
<p>Some HTML code.</p>

<ngx-show-more
    defaultHeight="40px"
    btnClasses="btn btn-sm btn-light m-1 fw-bold bg-light"
>
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

## API:

| Input                             | Description                                                                                                                                                                                                                                                                                                                                                                        | Example value                                      | default value                                                        |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------------------------- |
| defaultHeight                     | The maximum height that is shown by default without having to click on the "Show more"-button.                                                                                                                                                                                                                                                                                     | any valid css value like '100px', '100em', '10vh'. | has to be specified                                                  |
| btnClasses                        | The classes applied to the "Show more"- and "Show less"-buttons                                                                                                                                                                                                                                                                                                                    | any valid css class like 'ngxShowMoreButton'.      | has to be specified                                                  |
| heightChangeObservationStrategies | If the scrollHeight of the content changes, we could want to change wether the "Show more"-button is shown or not. Currently there [seems to be no way to observe the scrollHeight of the content](https://stackoverflow.com/questions/44428370/detect-scrollheight-change-with-mutationobserver). Therefore you can specify here which combination of strategies you want to use. | any valid css class like 'ngxShowMoreButton'.      | `{ polling: false, resizeObserver: true, mutationObserver: true, } ` |

```ts
interface HeightChangeObservationStrategies {
    /**
     * Observe wether the content dimensions have been resized (e.g. window or an outer container got resized)
     */
    resizeObserver: boolean;
    /**
     * Observe wether the content or its children got mutated (attributes changed, new element added, element removed etc.)
     * Can be non-performant if the content is large
     */
    mutationObserver: boolean;
    /**
     * Check every {{ pollingIntervall }} ms if the scrollHeight of the content has changed
     * {{ pollingIntervall }} is the specified number that must be > 0
     * disabled if the value is false
     */
    polling: false | number;
}
```

## Code scaffolding

Run `ng generate component component-name --project ngx-show-more` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project ngx-show-more`.

> Note: Don't forget to add `--project ngx-show-more` or else it will be added to the default project in your `angular.json` file.

## Build

Run `ng build ngx-show-more` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build ngx-show-more`, go to the dist folder `cd dist/ngx-show-more` and run `npm publish`.
