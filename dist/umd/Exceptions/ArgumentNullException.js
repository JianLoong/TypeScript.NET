/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 * Based upon: https://msdn.microsoft.com/en-us/library/System.Exception%28v=vs.110%29.aspx
 */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "./ArgumentException"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var ArgumentException_1 = require("./ArgumentException");
    var NAME = 'ArgumentNullException';
    var ArgumentNullException = /** @class */ (function (_super) {
        tslib_1.__extends(ArgumentNullException, _super);
        function ArgumentNullException(paramName, message, innerException) {
            if (message === void 0) { message = "'" + paramName + "' is null (or undefined)."; }
            return _super.call(this, paramName, message, innerException) || this;
        }
        ArgumentNullException.prototype.getName = function () {
            return NAME;
        };
        return ArgumentNullException;
    }(ArgumentException_1.default));
    exports.default = ArgumentNullException;
});
//# sourceMappingURL=ArgumentNullException.js.map