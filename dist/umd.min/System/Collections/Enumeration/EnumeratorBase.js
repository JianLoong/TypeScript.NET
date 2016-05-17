/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */
var __extends=this&&this.__extends||function(e,t){function r(){this.constructor=e}for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)};!function(e){if("object"==typeof module&&"object"==typeof module.exports){var t=e(require,exports);void 0!==t&&(module.exports=t)}else"function"==typeof define&&define.amd&&define(["require","exports","../../Types","../../Disposable/DisposableBase","../../Disposable/ObjectPool"],e)}(function(e,t){"use strict";function r(e){return n||(n=new u["default"](40,function(){return new a})),e?(e.yieldBreak(),void n.add(e)):n.take()}var n,i,o=e("../../Types"),s=e("../../Disposable/DisposableBase"),u=e("../../Disposable/ObjectPool"),l=void 0,a=function(){function e(){this._current=l}return Object.defineProperty(e.prototype,"current",{get:function(){return this._current},enumerable:!0,configurable:!0}),e.prototype.yieldReturn=function(e){return this._current=e,!0},e.prototype.yieldBreak=function(){return this._current=l,!1},e.prototype.dispose=function(){this.yieldBreak()},e}();!function(e){e[e.Before=0]="Before",e[e.Running=1]="Running",e[e.After=2]="After"}(i||(i={}));var c=function(e){function t(t,r,n,i){e.call(this),this._initializer=t,this._tryGetNext=r,this.reset(),o["default"].isBoolean(i)?this._isEndless=i:o["default"].isBoolean(n)&&(this._isEndless=n),o["default"].isFunction(n)&&(this._disposer=n)}return __extends(t,e),Object.defineProperty(t.prototype,"current",{get:function(){return this._yielder.current},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"isEndless",{get:function(){return this._isEndless},enumerable:!0,configurable:!0}),t.prototype.reset=function(){var e=this;e.throwIfDisposed();var t=e._yielder;t?t.yieldBreak():e._yielder=r(),e._state=i.Before},t.prototype.moveNext=function(){var e=this;try{switch(e._state){case i.Before:e._state=i.Running;var t=e._initializer;t&&t();case i.Running:return e._tryGetNext(e._yielder)?!0:(this.dispose(),!1);case i.After:return!1}}catch(r){throw this.dispose(),r}},t.prototype.nextValue=function(){return this.moveNext()?this._yielder.current:l},t.prototype.next=function(){return this.moveNext()?{value:this._yielder.current,done:!1}:{value:l,done:!0}},t.prototype._onDispose=function(){var e=this,t=e._disposer;e._initializer=null,e._disposer=null;var n=e._yielder;e._yielder=null,r(n);try{t&&t()}finally{this._state=i.After}},t}(s["default"]);Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=c});
//# sourceMappingURL=EnumeratorBase.js.map