/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */
define(["require","exports","./Types","./Exceptions/ArgumentException"],function(n,e,t,r){"use strict";function u(n){return 0|n}var u;!function(n){function e(n){return Math.random()*n|0}function u(n){return o(n,"max"),0==n?0:(n+=n>0?1:-1,e(n))}function i(n){return t["default"].isNumber(n,!1)&&isFinite(n)&&n==(0|n)}function o(n,e){var t=i(n);if(!t)throw new r["default"](e||"n","Must be a integer.");return t}n.random=u;var u;!function(n){function t(n){return e(n)}function r(n){return n&&n.length?n[e(n.length)]:void 0}n.under=t,n.select=r}(u=n.random||(n.random={})),n.is=i,n.assert=o}(u||(u={})),Object.defineProperty(e,"__esModule",{value:!0}),e["default"]=u});
//# sourceMappingURL=Integer.js.map
