'use strict';
var NAME = 'Exception';
var Exception = (function () {
    function Exception(message, innerException, beforeSealing) {
        if (message === void 0) { message = null; }
        if (innerException === void 0) { innerException = null; }
        this.message = message;
        var _ = this;
        _.name = _.getName();
        _.data = {};
        if (innerException)
            _.data['innerException'] = innerException;
        if (beforeSealing)
            beforeSealing(_);
        Object.freeze(_);
    }
    Exception.prototype.getName = function () { return NAME; };
    Exception.prototype.toString = function () {
        var _ = this, m = _.message;
        m = m ? (': ' + m) : '';
        return '[' + _.name + m + ']';
    };
    Exception.prototype.dispose = function () {
        var data = this.data;
        for (var k in data) {
            if (data.hasOwnProperty(k))
                delete data[k];
        }
    };
    return Exception;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Exception;
//# sourceMappingURL=Exception.js.map