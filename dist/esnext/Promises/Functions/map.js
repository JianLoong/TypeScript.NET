/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT
 */
import TSDNPromise from "../Promise";
import PromiseCollection from "../PromiseCollection";
/**
 * Creates a PromiseCollection containing promises that will resolve on the next tick using the transform function.
 * This utility function does not chain promises together to create the result,
 * it only uses one promise per transform.
 * @param source
 * @param transform
 * @returns {PromiseCollection}
 */
export default function map(source, transform) {
    return new PromiseCollection(source.map(function (d) { return new TSDNPromise(function (r, j) {
        try {
            r(transform(d));
        }
        catch (ex) {
            j(ex);
        }
    }); }));
}
//# sourceMappingURL=map.js.map