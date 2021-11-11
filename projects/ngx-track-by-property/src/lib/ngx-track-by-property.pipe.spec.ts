import { NgxTrackByPropertyPipe } from './ngx-track-by-property.pipe';

describe('NgxTrackByPropertyPipe', () => {
    let pipe: NgxTrackByPropertyPipe;

    beforeEach(() => {
        pipe = new NgxTrackByPropertyPipe();
    });

    // uncomment when the function exists
    // afterEach(() => {
    //     pipe.ngOnDestroy();
    // });

    it('should return a function', () => {
        expect(pipe.transform('$index')).toEqual(jasmine.any(Function));
        expect(pipe.transform('$value')).toEqual(jasmine.any(Function));
        expect(pipe.transform('id')).toEqual(jasmine.any(Function));
        expect(pipe.transform('user.id')).toEqual(jasmine.any(Function));
        expect(pipe.transform(['user.name', 'user.surname'])).toEqual(
            jasmine.any(Function)
        );
    });

    it('should return a function that tracks by the array index', () => {
        const compareFn = pipe.transform('$index');
        expect(compareFn).toEqual(jasmine.any(Function));
        expect(compareFn(1, 1)).toBe(1);
        expect(compareFn(2, { a: 1 })).toBe(2);
        expect(compareFn(5, {})).toBe(5);
    });

    it('should return a function that tracks by the specified property', () => {
        const compareFn = pipe.transform('id');
        expect(compareFn(1, { id: 4, a: 'a' })).toBe(4);
        expect(compareFn(2, { id: 1, a: 'b' })).toBe(1);
        expect(compareFn(3, { id: 42, a: 'c' })).toBe(42);
    });

    it('should return a function that tracks by the specified property path', () => {
        const compareFn = pipe.transform('user.id');
        expect(compareFn(1, { user: { id: 4 }, a: 'a' })).toBe(4);
        expect(compareFn(2, { user: { id: 1 }, a: 'b' })).toBe(1);
        expect(compareFn(3, { user: { id: 42 }, a: 'c' })).toBe(42);
    });

    it('should return a function that tracks by the item value (primitive)', () => {
        const compareFn = pipe.transform('$value');
        expect(compareFn(1, 1)).toBe(1);
        expect(compareFn(1, 2)).toBe(2);
        expect(compareFn(2, '')).toBe('');
        expect(compareFn(2, 'a')).toBe('a');
        expect(compareFn(2, 'aaabbb')).toBe('aaabbb');
        expect(compareFn(5, true)).toBe(true);
        expect(compareFn(5, false)).toBe(false);
        expect(compareFn(5, null)).toBe(null);
        expect(compareFn(5, undefined)).toBe(undefined);
    });

    it('should return a function that tracks by the item value (object)', () => {
        const compareFn = pipe.transform('$value');
        expect(compareFn(1, { user: { id: 4 }, a: 'a' })).toEqual(
            compareFn(3, { a: 'a', user: { id: 4 } })
        );
        expect(compareFn(2, { a: [1, 2, 3] })).toEqual(
            compareFn(2, { a: [1, 2, 3] })
        );
        expect(compareFn(2, {})).toEqual(compareFn(2, {}));
        expect(compareFn(2, { a: [1, 2, 3, 4] })).not.toEqual(
            compareFn(2, { a: [1, 2, 3] })
        );
        expect(compareFn(2, { a: [1, 2, 3], b: 2 })).not.toEqual(
            compareFn(2, { a: [1, 2, 3] })
        );
        expect(compareFn(2, { a: [1, 2, 3], b: 2 })).not.toEqual(
            compareFn(2, '{ a: [1, 2, 3], b: 2 }')
        );
    });

    it("should return a function that tracks by the item value and doesn't confuse strings with objects", () => {
        const compareFn = pipe.transform('$value');
        expect(compareFn(2, { a: [1, 2, 3], b: 2 })).not.toEqual(
            compareFn(2, '{ a: [1, 2, 3], b: 2 }')
        );
        expect(compareFn(2, {})).not.toEqual(compareFn(2, JSON.stringify({})));
        expect(compareFn(2, [])).not.toEqual(compareFn(2, JSON.stringify([])));
    });

    it('should return a function that tracks by the value (arrays)', () => {
        const compareFn = pipe.transform('$value');
        expect(compareFn(2, [])).toEqual(compareFn(2, []));
        expect(compareFn(2, [1, 2, 3])).toEqual(compareFn(3, [1, 2, 3]));
        expect(compareFn(2, [1])).not.toEqual(compareFn(2, []));
        expect(compareFn(2, [1, 2, 3])).not.toEqual(compareFn(2, [3, 2, 1]));
    });

    it('should return a function that tracks by multiple paths', () => {
        const compareFn = pipe.transform(['name', 'surname']);
        expect(compareFn(1, { id: 1, name: 'John', surname: 'Smith' })).toEqual(
            compareFn(3, { id: 2, name: 'John', surname: 'Smith' })
        );
        expect(
            compareFn(1, { id: 1, name: 'John1', surname: 'Smith' })
        ).not.toEqual(compareFn(3, { id: 2, name: 'John', surname: 'Smith' }));
        expect(
            compareFn(1, { id: 1, name: 'John', surname: 'SmIth' })
        ).not.toEqual(compareFn(3, { id: 2, name: 'John', surname: 'Smith' }));
    });
});
