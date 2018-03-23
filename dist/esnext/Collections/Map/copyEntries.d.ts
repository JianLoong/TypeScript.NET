/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT
 */
import IMap from "../../IMap";
/**
 * Make a copy of the source object.
 * @param source
 * @returns {Object}
 */
export default function copyEntries<T extends IMap<any>>(source: T): T;