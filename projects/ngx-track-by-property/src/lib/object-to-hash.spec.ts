import { objectToHash } from './object-to-hash';

describe('object to hash', () => {
    it('should create the same hash for the same input', () => {
        expect(objectToHash({ a: 'a' })).toBe(objectToHash({ a: 'a' }));
    });

    it('should create the same hash for the same objects (with different key order)', () => {
        expect(
            objectToHash({
                a: 'a',
                b: 'b',
            })
        ).toBe(objectToHash({ b: 'b', a: 'a' }));
        expect(
            objectToHash({
                a: 'a',
                b: {
                    a: 'a',
                    b: 'b',
                },
            })
        ).toBe(
            objectToHash({
                a: 'a',
                b: {
                    b: 'b',
                    a: 'a',
                },
            })
        );
    });

    it('should create a different hash for a different input', () => {
        expect(objectToHash({ a: 'a' })).not.toBe(objectToHash({ a: 'b' }));
        expect(objectToHash({ a: 'a' })).not.toBe(objectToHash({ b: 'a' }));
    });

    it('should produce a small hash for big objects', () => {
        const longString = 'a'.repeat(100);
        const bigObject = { a: longString, b: longString, c: longString };
        expect(objectToHash(bigObject).length).toBeLessThan(200);
    });

    it('should work for complex objects', () => {
        const anObject = {
            a: 1,
            b: 2,
            c: { a: [1, 2, 3, 4], d: true, e: 'a' },
        };
        expect(typeof objectToHash(anObject)).toBe('string');
    });
});
