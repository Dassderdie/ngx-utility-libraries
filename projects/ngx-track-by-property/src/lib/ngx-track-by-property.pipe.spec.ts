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
        expect(pipe.transform('$objectToKey')).toEqual(jasmine.any(Function));
        expect(pipe.transform(null)).toEqual(jasmine.any(Function));
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

    it('should return a function that tracks by the item itself', () => {
        const compareFn = pipe.transform(null);
        expect(compareFn(1, 1)).toBe(1);
        expect(compareFn(2, 'a')).toBe('a');
        expect(compareFn(5, true)).toBe(true);
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

    it('should return a function that tracks by the object value', () => {
        const compareFn = pipe.transform('$objectToKey');
        expect(compareFn(1, { user: { id: 4 }, a: 'a' })).toEqual(
            compareFn(3, { a: 'a', user: { id: 4 } })
        );
        expect(compareFn(2, { a: [1, 2, 3] })).toEqual(
            compareFn(2, { a: [1, 2, 3] })
        );
        expect(compareFn(2, { a: [1, 2, 3, 4] })).not.toEqual(
            compareFn(2, { a: [1, 2, 3] })
        );
        expect(compareFn(2, { a: [1, 2, 3], b: 2 })).not.toEqual(
            compareFn(2, { a: [1, 2, 3] })
        );
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
            compareFn(1, { id: 1, name: 'John', surname: 'Smith1' })
        ).not.toEqual(compareFn(3, { id: 2, name: 'John', surname: 'Smith' }));
    });
});
