# NgxTrackByProperty

[![npm](https://img.shields.io/npm/v/ngx-track-by-property/latest.svg)](https://www.npmjs.com/package/ngx-track-by-property) [![Netlify Status](https://api.netlify.com/api/v1/badges/11932620-4735-4ea2-ba4d-e544ae9cfeb6/deploy-status)](https://app.netlify.com/sites/ngx-utility-libraries-demo/deploys)

An Angular pipe that makes it more convenient to use common [trackByFunctions](https://angular.io/api/common/NgForOf#ngForTrackBy) to improve performance of the `*ngFor` structural directive.

This is a little more complete version of [@bennadel](https://github.com/bennadel)s pipe he wrote about in his blog [here](https://www.bennadel.com/blog/3579-using-pure-pipes-to-generate-ngfor-trackby-identity-functions-in-angular-7-2-7.htm) and [here](https://www.bennadel.com/blog/3580-using-pure-pipes-to-generate-ngfor-trackby-identity-functions-for-mixed-collections-in-angular-7-2-7.htm).

Instead of declaring a trackByFunction in the component like this:

_example.component.html_

```html
<div *ngFor="let item of items; trackBy: myTrackByFunction;">
    <p>{{ item }}</p>
</div>
```

_example.component.ts_

```ts
public myTrackByFunction(index: number, item: Item) {
    return item.id;
}
```

we just have to write code in the template:

_example.component.html_

```html
<div *ngFor="let item of items; trackBy: 'id' | ngxTrackByProperty: items;">
    <p>{{ item }}</p>
</div>
```

The later solution is:

-   less verbose
-   as performant as the usual way
-   (mostly) equally type safe

## Install

Make sure you are using **Angular 12**.

Install ngx-track-by-property from npm:

```
npm install ngx-track-by-property --save
```

Add to your NgModule imports:

```ts
import { NgxTrackByPropertyModule } from 'ngx-track-by-property';

@NgModule({
  ...
  imports: [NgxTrackByPropertyModule,...]
  ...
})
```

You can then use this pipe in your component as follows:

```html
<div *ngFor="let item of items; trackBy: '$index' | ngxTrackByProperty: items;">
    <p>{{ item }}</p>
</div>
```

## API

This pipe has two parameters:

### `propertyNames`

```ts
 Path[] | Path | '$index' | '$value',
```

The pipe returns a trackBy function that will track by the specified `propertyNames`.
There are four different ways to specify the `propertyNames`:

1. the literal `'$index'`: track by the position of the item in the array
   use case example: `readonly items: ReadonlyArray<any>`
2. the literal `'$value'`: track by the value of the item. You should use this when the array is made up of primitives. The items can be objects too. But they are compared by value, not by reference. So if the items are objects they should be small, to still make this somewhat performant.
   use case example: `items: (number | string | boolean | null | undefined)`
3. a path: track by the value of the item at the specified path. The path is specified as a string where the properties are separated by a `'.'` like `'user.id'`.
   use case example: `items: { id: number }[]` - path: `'id'`
   use case example: `items: { user: { id: number; lastName: string }; house: any }[]`- path: `'user.id'`
4. an array of paths: track by the combination of the values of the items at the specified paths.
   use case example: `items: { firstName: string; lastName: string }[]` - paths: `['firstName', 'lastName']`
   use case example: `items: { user: { firstName: string; lastName: string }; house: any }[]`- paths: `'['user.firstName', 'user.lastName']'`

If your `trackByFunction` is more complex, you should do it the usual way and write a function in the `component.ts`.

### `items`

The array that is iterated over in the `*ngFor` directive.
The `items` doesn't serve any runtime purpose. It is only used as a workaround for a [type parameters](https://www.typescriptlang.org/docs/handbook/2/generics.html) in angular pipes, to provide better TypeScript typings.
It is optional to provide.

## TypeSafety

For the best typesafety you should provide the `items` parameter.

The property path is currently only checked one level deep. So in case case of: `type Item = { user: { id: number; lastName: string }; house: any }` - the path: `'user'` would be typesafe (= you get a type error if you remove `user` from `Item`), but not the path `'user.id'` (= you could also write `user.abc` without a type error).

## Code scaffolding

Run `ng generate component component-name --project ngx-track-by-property` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project ngx-track-by-property`.

> Note: Don't forget to add `--project ngx-track-by-property` or else it will be added to the default project in your `angular.json` file.

## Build

Run `ng build ngx-track-by-property` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build ngx-track-by-property`, go to the dist folder `cd dist/ngx-track-by-property` and run `npm publish`.

## Running unit tests

Run `ng test ngx-track-by-property` to execute the unit tests via [Karma](https://karma-runner.github.io).
