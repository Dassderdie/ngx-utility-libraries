/**
 * @returns a shorter hashed version of a string
 * - this is just for making the string smaller - do not use it for crypto!
 */
export function hashString(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash.toString();
}
