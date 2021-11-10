import { Pipe, PipeTransform, TrackByFunction } from '@angular/core';
import { objectToHash } from './object-to-hash';
import { get } from 'lodash-es';

@Pipe({
    name: 'ngxTrackByProperty',
})
/**
 * An Angular pipe that makes it more convenient to use the [trackByFunction](https://angular.io/api/common/NgForOf#ngForTrackBy) to improve performance of the `*ngFor` structural directive.
 */
export class NgxTrackByPropertyPipe implements PipeTransform {
    /**
     * @param propertyNames the key(s) which make an unique identifier for the item in the ngFor loop
     * `'$index'`: the position of the item (assumes the positions of the items in the array are stable during change-detection)
     * `null`: the item itself is unique (all items are a primitive type, or the object references are the identifier)
     * `string`: the key of one property that identifies the unique id (put a `.` between properties e.g. `'user.id'`)
     * `string[]`: the keys of all properties whose combined values are unique (e.g. `['user.firstName', 'user.lastName']`)
     * `'$objectToKey'`: the stringified item (the items should be (small) json-like-values (no functions), and there is no unique id one could use instead), basically identifies the object by value
     * @returns a trackBy function that plucks the given properties from the ngFor item
     */
    public transform(
        propertyNames: string[] | string | '$index' | '$objectToKey' | null
    ): TrackByFunction<unknown> {
        if (propertyNames === '$index') {
            return (index: number, item: any) => index;
        }
        if (propertyNames === null) {
            return (index: number, item: any) => item;
        }
        if (propertyNames === '$objectToKey') {
            return (index: number, item: any) => objectToHash(item);
        }
        if (Array.isArray(propertyNames)) {
            // propertyNames is something like: ['user.firstName', 'user.lastName']
            return (index: number, item: any) =>
                propertyNames
                    .map((propertyName) => get(item, propertyName))
                    .join(',');
        }
        // propertyNames is something like: 'user.id'
        return (index: number, item: any) => get(item, propertyNames);
    }
}

// https://stackoverflow.com/questions/66365244/in-angular-ivy-why-pure-pipe-instance-is-not-cached-between-usages-like-in-view
