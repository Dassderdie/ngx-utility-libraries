import { hashString } from './hash-string';

describe('hashString', () => {
    it('should create the same hash for the same input', () => {
        expect(hashString('a')).toBe(hashString('a'));
    });

    it('should create a different hash for a different input', () => {
        expect(hashString('a')).not.toBe(hashString('b'));
    });

    it('should reduce the length of very long inputs', () => {
        const longString = 'a'.repeat(5000);
        expect(hashString(longString).length).toBeLessThan(50);
    });

    it('should work for stringified objects', () => {
        const anObject = {
            a: 1,
            b: 2,
            c: { a: [1, 2, 3, 4], d: true, e: 'a' },
        };
        expect(typeof hashString(JSON.stringify(anObject))).toBe('string');
    });
});
