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
     * `'$value'`: the item itself is unique (if the item is an object, the objects value is compared instead of the reference)
     * `string`: the key of one property that identifies the unique id (put a `.` between properties e.g. `'user.id'`)
     * `string[]`: the keys of all properties whose combined values are unique (e.g. `['user.firstName', 'user.lastName']`)
     * @returns a trackBy function that plucks the given properties from the ngFor item
     */
    public transform<
        Items extends any[] = any[],
        Item = Items[0],
        FirstLevelPropertyName extends string | number = keyof Item &
            (string | number),
        Path extends string | number =
            | FirstLevelPropertyName
            | `${FirstLevelPropertyName}.${string}`,
        P extends Path = Path
    >(
        propertyNames: P[] | P | '$index' | '$value',
        // only to get the type for Items, because angular pipes don't support passing types as generic parameters
        items?: Items
    ): TrackByFunction<Item> {
        if (propertyNames === '$index') {
            return (index: number, item: any) => index;
        }
        if (propertyNames === '$value') {
            return (index: number, item: any) =>
                typeof item === 'object'
                    ? item === null
                        ? null
                        : objectToHash(item)
                    : item;
        }
        if (Array.isArray(propertyNames)) {
            // propertyNames is something like: ['user.firstName', 'user.lastName']
            return (index: number, item: any) =>
                propertyNames
                    .map((propertyName) => get(item, propertyName as any))
                    .join(',');
        }
        // propertyNames is something like: 'user.id'
        return (index: number, item: any) => get(item, propertyNames as any);
    }
}

// https://stackoverflow.com/questions/66365244/in-angular-ivy-why-pure-pipe-instance-is-not-cached-between-usages-like-in-view
