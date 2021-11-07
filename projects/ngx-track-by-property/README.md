# NgxTrackByProperty

<!-- [![npm](https://img.shields.io/npm/v/ngx-show-more/latest.svg)](https://www.npmjs.com/package/ngx-show-more) [![Netlify Status](https://api.netlify.com/api/v1/badges/11932620-4735-4ea2-ba4d-e544ae9cfeb6/deploy-status)](https://app.netlify.com/sites/ngx-utility-libraries-demo/deploys) -->

An Angular pipe that makes it more convenient to use the [trackByFunction](https://angular.io/api/common/NgForOf#ngForTrackBy) to improve performance of the `*ngFor` structural directive.

This is a little more complete version of [@bennadel](https://github.com/bennadel) pipe he wrote about in his blog [here](https://www.bennadel.com/blog/3579-using-pure-pipes-to-generate-ngfor-trackby-identity-functions-in-angular-7-2-7.htm) and [here](https://www.bennadel.com/blog/3580-using-pure-pipes-to-generate-ngfor-trackby-identity-functions-for-mixed-collections-in-angular-7-2-7.htm).

## Install

<!-- TODO: -->

## Code scaffolding

Run `ng generate component component-name --project ngx-track-by-property` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project ngx-track-by-property`.

> Note: Don't forget to add `--project ngx-track-by-property` or else it will be added to the default project in your `angular.json` file.

## Build

Run `ng build ngx-track-by-property` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build ngx-track-by-property`, go to the dist folder `cd dist/ngx-track-by-property` and run `npm publish`.

## Running unit tests

Run `ng test ngx-track-by-property` to execute the unit tests via [Karma](https://karma-runner.github.io).
