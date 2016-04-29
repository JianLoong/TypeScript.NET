/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */
var __extends=this&&this.__extends||function(e,r){function t(){this.constructor=e}for(var n in r)r.hasOwnProperty(n)&&(e[n]=r[n]);e.prototype=null===r?Object.create(r):(t.prototype=r.prototype,new t)};define(["require","exports","./EnumeratorBase"],function(e,r,t){"use strict";var n=function(e){function r(r){var t;e.call(this,function(){if(t=r(),t&&t.source){var e=t.length;if(0>e)throw new Error("length must be zero or greater");if(!isFinite(e))throw new Error("length must finite number");if(e&&0===t.step)throw new Error("Invalid IndexEnumerator step value (0).");var n=t.pointer;if(n){if(n!=Math.floor(n))throw new Error("Invalid IndexEnumerator pointer value ("+n+") has decimal.")}else n=0;t.pointer=n;var o=t.step;if(o){if(o!=Math.floor(o))throw new Error("Invalid IndexEnumerator step value ("+o+") has decimal.")}else o=1;t.step=o}},function(e){var r=t&&t.source?t.length:0;if(!r||isNaN(r))return e.yieldBreak();var n=t.pointer;return t.pointer+=t.step,r>n&&n>=0?e.yieldReturn(t.source[n]):e.yieldBreak()},function(){t&&(t.source=null)}),this._isEndless=!1}return __extends(r,e),r}(t["default"]);Object.defineProperty(r,"__esModule",{value:!0}),r["default"]=n});
//# sourceMappingURL=IndexEnumerator.js.map
