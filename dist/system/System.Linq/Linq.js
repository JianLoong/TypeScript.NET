/*!
 * @author electricessence / https://github.com/electricessence/
 * Original: http://linqjs.codeplex.com/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */
System.register(["../System/Compare", "../System/Collections/Array/Compare", "../System/Collections/Array/Utility", "../System/Collections/Enumeration/Enumerator", "../System/Types", "../System/Integer", "../System/Functions", "../System/Collections/Enumeration/ArrayEnumerator", "../System/Collections/Enumeration/EnumeratorBase", "../System/Collections/Dictionaries/Dictionary", "../System/Collections/Queue", "../System/Disposable/dispose", "../System/Disposable/DisposableBase", "../System/Collections/Enumeration/UnsupportedEnumerableException", "../System/Disposable/ObjectDisposedException", "../System/Collections/Sorting/KeySortedContext", "../System/Exceptions/ArgumentNullException", "../System/Exceptions/ArgumentOutOfRangeException"], function(exports_1, context_1) {
    'use strict';
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Values, Arrays, ArrayUtility, Enumerator_1, Types_1, Integer_1, Functions_1, ArrayEnumerator_1, EnumeratorBase_1, Dictionary_1, Queue_1, dispose_1, DisposableBase_1, UnsupportedEnumerableException_1, ObjectDisposedException_1, KeySortedContext_1, ArgumentNullException_1, ArgumentOutOfRangeException_1;
    var INVALID_DEFAULT, VOID0, LinqFunctions, Functions, InfiniteEnumerable, Enumerable, FiniteEnumerable, ArrayEnumerable, Grouping, Lookup, WhereEnumerable, WhereSelectEnumerable, OrderedEnumerable;
    function getEmptyEnumerator() {
        return Enumerator_1.empty;
    }
    function createSortContext(orderedEnumerable, currentContext) {
        if (currentContext === void 0) { currentContext = null; }
        var context = new KeySortedContext_1.default(currentContext, orderedEnumerable.keySelector, orderedEnumerable.order, orderedEnumerable.comparer);
        if (orderedEnumerable.parent)
            return createSortContext(orderedEnumerable.parent, context);
        return context;
    }
    function throwIfDisposed(disposed, className) {
        if (className === void 0) { className = "Enumerable"; }
        if (disposed)
            throw new ObjectDisposedException_1.default(className);
    }
    return {
        setters:[
            function (Values_1) {
                Values = Values_1;
            },
            function (Arrays_1) {
                Arrays = Arrays_1;
            },
            function (ArrayUtility_1) {
                ArrayUtility = ArrayUtility_1;
            },
            function (Enumerator_1_1) {
                Enumerator_1 = Enumerator_1_1;
            },
            function (Types_1_1) {
                Types_1 = Types_1_1;
            },
            function (Integer_1_1) {
                Integer_1 = Integer_1_1;
            },
            function (Functions_1_1) {
                Functions_1 = Functions_1_1;
            },
            function (ArrayEnumerator_1_1) {
                ArrayEnumerator_1 = ArrayEnumerator_1_1;
            },
            function (EnumeratorBase_1_1) {
                EnumeratorBase_1 = EnumeratorBase_1_1;
            },
            function (Dictionary_1_1) {
                Dictionary_1 = Dictionary_1_1;
            },
            function (Queue_1_1) {
                Queue_1 = Queue_1_1;
            },
            function (dispose_1_1) {
                dispose_1 = dispose_1_1;
            },
            function (DisposableBase_1_1) {
                DisposableBase_1 = DisposableBase_1_1;
            },
            function (UnsupportedEnumerableException_1_1) {
                UnsupportedEnumerableException_1 = UnsupportedEnumerableException_1_1;
            },
            function (ObjectDisposedException_1_1) {
                ObjectDisposedException_1 = ObjectDisposedException_1_1;
            },
            function (KeySortedContext_1_1) {
                KeySortedContext_1 = KeySortedContext_1_1;
            },
            function (ArgumentNullException_1_1) {
                ArgumentNullException_1 = ArgumentNullException_1_1;
            },
            function (ArgumentOutOfRangeException_1_1) {
                ArgumentOutOfRangeException_1 = ArgumentOutOfRangeException_1_1;
            }],
        execute: function() {
            INVALID_DEFAULT = {};
            VOID0 = void 0;
            LinqFunctions = (function (_super) {
                __extends(LinqFunctions, _super);
                function LinqFunctions() {
                    _super.apply(this, arguments);
                }
                LinqFunctions.prototype.Greater = function (a, b) {
                    return a > b ? a : b;
                };
                LinqFunctions.prototype.Lesser = function (a, b) {
                    return a < b ? a : b;
                };
                return LinqFunctions;
            }(Functions_1.default));
            Functions = new LinqFunctions();
            Object.freeze(Functions);
            InfiniteEnumerable = (function (_super) {
                __extends(InfiniteEnumerable, _super);
                function InfiniteEnumerable(_enumeratorFactory, finalizer) {
                    _super.call(this, finalizer);
                    this._enumeratorFactory = _enumeratorFactory;
                    this._isEndless = true;
                }
                Object.defineProperty(InfiniteEnumerable.prototype, "isEndless", {
                    get: function () {
                        return this._isEndless;
                    },
                    enumerable: true,
                    configurable: true
                });
                InfiniteEnumerable.prototype.getEnumerator = function () {
                    this.throwIfDisposed();
                    return this._enumeratorFactory();
                };
                InfiniteEnumerable.prototype._onDispose = function () {
                    _super.prototype._onDispose.call(this);
                    this._enumeratorFactory = null;
                };
                InfiniteEnumerable.prototype.asEnumerable = function () {
                    var _ = this;
                    _.throwIfDisposed();
                    return new InfiniteEnumerable(function () { return _.getEnumerator(); });
                };
                InfiniteEnumerable.prototype._doAction = function (action, initializer, isEndless) {
                    if (isEndless === void 0) { isEndless = this.isEndless; }
                    var _ = this, disposed = !_.throwIfDisposed();
                    return new Enumerable(function () {
                        var enumerator;
                        var index = 0;
                        return new EnumeratorBase_1.default(function () {
                            throwIfDisposed(disposed);
                            if (initializer)
                                initializer();
                            index = 0;
                            enumerator = _.getEnumerator();
                        }, function (yielder) {
                            throwIfDisposed(disposed);
                            while (enumerator.moveNext()) {
                                var actionResult = action(enumerator.current, index++);
                                if (actionResult === false || actionResult === 0)
                                    return yielder.yieldBreak();
                                if (actionResult !== 2)
                                    return yielder.yieldReturn(enumerator.current);
                            }
                            return false;
                        }, function () {
                            dispose_1.dispose(enumerator);
                        }, isEndless);
                    }, function () {
                        disposed = true;
                    }, isEndless);
                };
                InfiniteEnumerable.prototype.doAction = function (action, initializer, isEndless) {
                    if (isEndless === void 0) { isEndless = this.isEndless; }
                    return this._doAction(action, initializer, isEndless);
                };
                InfiniteEnumerable.prototype.force = function (defaultAction) {
                    if (defaultAction === void 0) { defaultAction = 0; }
                    this.throwIfDisposed();
                    this.doAction(function (element) { return defaultAction; });
                };
                InfiniteEnumerable.prototype._skip = function (count) {
                    var _ = this;
                    _.throwIfDisposed();
                    if (!isFinite(count))
                        return Enumerable.empty();
                    Integer_1.default.assert(count, "count");
                    return this._doAction(function (element, index) {
                        return index < count
                            ? 2
                            : 1;
                    });
                };
                InfiniteEnumerable.prototype.skip = function (count) {
                    return count > 0 ? this._skip(count) : this;
                };
                InfiniteEnumerable.prototype.skipWhile = function (predicate) {
                    this.throwIfDisposed();
                    return this._doAction(function (element, index) {
                        return predicate(element, index)
                            ? 2
                            : 1;
                    });
                };
                InfiniteEnumerable.prototype.take = function (count) {
                    if (!(count > 0))
                        return Enumerable.empty();
                    var _ = this;
                    _.throwIfDisposed();
                    if (!isFinite(count))
                        throw new ArgumentOutOfRangeException_1.default('count', count, 'Must be finite.');
                    Integer_1.default.assert(count, "count");
                    return _._doAction(function (element, index) { return index < count; }, null, false);
                };
                InfiniteEnumerable.prototype.takeWhile = function (predicate) {
                    this.throwIfDisposed();
                    if (!predicate)
                        throw new ArgumentNullException_1.default('predicate');
                    return this._doAction(function (element, index) {
                        return predicate(element, index)
                            ? 1
                            : 0;
                    }, null, null);
                };
                InfiniteEnumerable.prototype.takeUntil = function (predicate, includeUntilValue) {
                    this.throwIfDisposed();
                    if (!predicate)
                        throw new ArgumentNullException_1.default('predicate');
                    if (!includeUntilValue)
                        return this._doAction(function (element, index) {
                            return predicate(element, index)
                                ? 0
                                : 1;
                        }, null, null);
                    var found = false;
                    return this._doAction(function (element, index) {
                        if (found)
                            return 0;
                        found = predicate(element, index);
                        return 1;
                    }, function () {
                        found = false;
                    }, null);
                };
                InfiniteEnumerable.prototype.elementAt = function (index) {
                    var v = this.elementAtOrDefault(index, INVALID_DEFAULT);
                    if (v === INVALID_DEFAULT)
                        throw new Error("index is greater than or equal to the number of elements in source.");
                    return v;
                };
                InfiniteEnumerable.prototype.elementAtOrDefault = function (index, defaultValue) {
                    if (defaultValue === void 0) { defaultValue = null; }
                    var _ = this;
                    _.throwIfDisposed();
                    if (isNaN(index) || index < 0 || !isFinite(index))
                        throw new Error("'index' is invalid or out of bounds.");
                    Integer_1.default.assert(index, "index");
                    var n = index;
                    return dispose_1.using(this.getEnumerator(), function (e) {
                        var i = 0;
                        while (e.moveNext()) {
                            if (i == n)
                                return e.current;
                            i++;
                        }
                        return defaultValue;
                    });
                };
                InfiniteEnumerable.prototype.first = function () {
                    var v = this.firstOrDefault(INVALID_DEFAULT);
                    if (v === INVALID_DEFAULT)
                        throw new Error("first:The sequence is empty.");
                    return v;
                };
                InfiniteEnumerable.prototype.firstOrDefault = function (defaultValue) {
                    if (defaultValue === void 0) { defaultValue = null; }
                    var _ = this;
                    _.throwIfDisposed();
                    return dispose_1.using(this.getEnumerator(), function (e) { return e.moveNext() ? e.current : defaultValue; });
                };
                InfiniteEnumerable.prototype.single = function () {
                    var _ = this;
                    _.throwIfDisposed();
                    return dispose_1.using(this.getEnumerator(), function (e) {
                        if (e.moveNext()) {
                            var value = e.current;
                            if (!e.moveNext())
                                return value;
                            throw new Error("single:sequence contains more than one element.");
                        }
                        throw new Error("single:The sequence is empty.");
                    });
                };
                InfiniteEnumerable.prototype.singleOrDefault = function (defaultValue) {
                    if (defaultValue === void 0) { defaultValue = null; }
                    var _ = this;
                    _.throwIfDisposed();
                    return dispose_1.using(this.getEnumerator(), function (e) {
                        if (e.moveNext()) {
                            var value = e.current;
                            if (!e.moveNext())
                                return value;
                        }
                        return defaultValue;
                    });
                };
                InfiniteEnumerable.prototype.any = function () {
                    var _ = this;
                    _.throwIfDisposed();
                    return dispose_1.using(this.getEnumerator(), function (e) { return e.moveNext(); });
                };
                InfiniteEnumerable.prototype.traverseBreadthFirst = function (func, resultSelector) {
                    var _ = this, isEndless = _._isEndless || null;
                    return new Enumerable(function () {
                        var enumerator;
                        var nestLevel = 0;
                        var buffer, len;
                        return new EnumeratorBase_1.default(function () {
                            nestLevel = 0;
                            buffer = [];
                            len = 0;
                            enumerator = _.getEnumerator();
                        }, function (yielder) {
                            while (true) {
                                if (enumerator.moveNext()) {
                                    buffer[len++] = enumerator.current;
                                    return yielder.yieldReturn(resultSelector(enumerator.current, nestLevel));
                                }
                                if (!len)
                                    return yielder.yieldBreak();
                                var next = Enumerable
                                    .fromArray(buffer)
                                    .selectMany(func);
                                if (!next.any()) {
                                    return yielder.yieldBreak();
                                }
                                else {
                                    nestLevel++;
                                    buffer = [];
                                    len = 0;
                                    enumerator.dispose();
                                    enumerator = next.getEnumerator();
                                }
                            }
                        }, function () {
                            dispose_1.dispose(enumerator);
                            buffer.length = 0;
                        }, isEndless);
                    }, null, isEndless);
                };
                InfiniteEnumerable.prototype.traverseDepthFirst = function (func, resultSelector) {
                    var _ = this, isEndless = _._isEndless || null;
                    return new Enumerable(function () {
                        var enumeratorStack = [];
                        var enumerator;
                        var len;
                        return new EnumeratorBase_1.default(function () {
                            enumerator = _.getEnumerator();
                            len = 0;
                        }, function (yielder) {
                            while (true) {
                                if (enumerator.moveNext()) {
                                    var value = resultSelector(enumerator.current, len);
                                    enumeratorStack[len++] = enumerator;
                                    enumerator = func(enumerator.current).getEnumerator();
                                    return yielder.yieldReturn(value);
                                }
                                if (len == 0)
                                    return false;
                                enumerator.dispose();
                                enumerator = enumeratorStack[--len];
                                enumeratorStack.length = len;
                            }
                        }, function () {
                            try {
                                dispose_1.dispose(enumerator);
                            }
                            finally {
                                dispose_1.dispose.these(enumeratorStack);
                            }
                        }, isEndless);
                    }, null, isEndless);
                };
                InfiniteEnumerable.prototype.flatten = function () {
                    var _ = this, isEndless = _._isEndless || null;
                    return new Enumerable(function () {
                        var enumerator;
                        var middleEnumerator = null;
                        return new EnumeratorBase_1.default(function () {
                            enumerator = _.getEnumerator();
                        }, function (yielder) {
                            while (true) {
                                if (middleEnumerator != null) {
                                    if (middleEnumerator.moveNext()) {
                                        return yielder.yieldReturn(middleEnumerator.current);
                                    }
                                    else {
                                        middleEnumerator = null;
                                    }
                                }
                                if (enumerator.moveNext()) {
                                    var c = enumerator.current;
                                    if (Array.isArray(c)) {
                                        middleEnumerator.dispose();
                                        middleEnumerator = Enumerable.fromArray(c)
                                            .selectMany(Functions.Identity)
                                            .flatten()
                                            .getEnumerator();
                                        continue;
                                    }
                                    else {
                                        return yielder.yieldReturn(enumerator.current);
                                    }
                                }
                                return false;
                            }
                        }, function () {
                            dispose_1.dispose(enumerator, middleEnumerator);
                        }, isEndless);
                    }, null, isEndless);
                };
                InfiniteEnumerable.prototype.pairwise = function (selector) {
                    var _ = this;
                    return new Enumerable(function () {
                        var enumerator;
                        return new EnumeratorBase_1.default(function () {
                            enumerator = _.getEnumerator();
                            enumerator.moveNext();
                        }, function (yielder) {
                            var prev = enumerator.current;
                            return enumerator.moveNext()
                                && yielder.yieldReturn(selector(prev, enumerator.current));
                        }, function () {
                            dispose_1.dispose(enumerator);
                        }, _._isEndless);
                    }, null, _._isEndless);
                };
                InfiniteEnumerable.prototype.scan = function (func, seed) {
                    var isUseSeed = seed !== VOID0;
                    var _ = this;
                    return new Enumerable(function () {
                        var enumerator;
                        var value;
                        var isFirst;
                        return new EnumeratorBase_1.default(function () {
                            enumerator = _.getEnumerator();
                            isFirst = true;
                        }, function (yielder) {
                            if (isFirst) {
                                isFirst = false;
                                return isUseSeed
                                    ? yielder.yieldReturn(value = seed)
                                    : enumerator.moveNext() && yielder.yieldReturn(value
                                        = enumerator.current);
                            }
                            return (enumerator.moveNext())
                                ? yielder.yieldReturn(value = func(value, enumerator.current))
                                : false;
                        }, function () {
                            dispose_1.dispose(enumerator);
                        }, _._isEndless);
                    }, null, _._isEndless);
                };
                InfiniteEnumerable.prototype._select = function (selector) {
                    var _ = this, disposed = !_.throwIfDisposed();
                    if (selector.length < 2)
                        return new WhereSelectEnumerable(_, null, selector);
                    return new Enumerable(function () {
                        var enumerator;
                        var index = 0;
                        return new EnumeratorBase_1.default(function () {
                            throwIfDisposed(disposed);
                            index = 0;
                            enumerator = _.getEnumerator();
                        }, function (yielder) {
                            throwIfDisposed(disposed);
                            return enumerator.moveNext()
                                ? yielder.yieldReturn(selector(enumerator.current, index++))
                                : false;
                        }, function () {
                            dispose_1.dispose(enumerator);
                        }, _._isEndless);
                    }, function () {
                        disposed = true;
                    }, _._isEndless);
                };
                InfiniteEnumerable.prototype.select = function (selector) {
                    return this._select(selector);
                };
                InfiniteEnumerable.prototype._selectMany = function (collectionSelector, resultSelector) {
                    var _ = this, isEndless = _._isEndless || null;
                    if (!resultSelector)
                        resultSelector = function (a, b) { return b; };
                    return new Enumerable(function () {
                        var enumerator;
                        var middleEnumerator;
                        var index = 0;
                        return new EnumeratorBase_1.default(function () {
                            enumerator = _.getEnumerator();
                            middleEnumerator = undefined;
                            index = 0;
                        }, function (yielder) {
                            if (middleEnumerator === VOID0 && !enumerator.moveNext())
                                return false;
                            do {
                                if (!middleEnumerator) {
                                    var middleSeq = collectionSelector(enumerator.current, index++);
                                    if (!middleSeq)
                                        continue;
                                    middleEnumerator = Enumerator_1.from(middleSeq);
                                }
                                if (middleEnumerator.moveNext())
                                    return yielder.yieldReturn(resultSelector(enumerator.current, middleEnumerator.current));
                                middleEnumerator.dispose();
                                middleEnumerator = null;
                            } while (enumerator.moveNext());
                            return false;
                        }, function () {
                            dispose_1.dispose(enumerator, middleEnumerator);
                            enumerator = null;
                            middleEnumerator = null;
                        }, isEndless);
                    }, null, isEndless);
                };
                InfiniteEnumerable.prototype.selectMany = function (collectionSelector, resultSelector) {
                    return this._selectMany(collectionSelector, resultSelector);
                };
                InfiniteEnumerable.prototype._choose = function (selector) {
                    if (selector === void 0) { selector = Functions.Identity; }
                    var _ = this, disposed = !_.throwIfDisposed();
                    return new Enumerable(function () {
                        var enumerator;
                        var index = 0;
                        return new EnumeratorBase_1.default(function () {
                            throwIfDisposed(disposed);
                            index = 0;
                            enumerator = _.getEnumerator();
                        }, function (yielder) {
                            throwIfDisposed(disposed);
                            while (enumerator.moveNext()) {
                                var result = selector(enumerator.current, index++);
                                if (result !== null && result !== VOID0)
                                    return yielder.yieldReturn(result);
                            }
                            return false;
                        }, function () {
                            dispose_1.dispose(enumerator);
                        }, _._isEndless);
                    }, function () {
                        disposed = true;
                    }, _._isEndless);
                };
                InfiniteEnumerable.prototype.choose = function (selector) {
                    if (selector === void 0) { selector = Functions.Identity; }
                    return this._choose(selector);
                };
                InfiniteEnumerable.prototype._where = function (predicate) {
                    var _ = this, disposed = !_.throwIfDisposed();
                    if (predicate.length < 2)
                        return new WhereEnumerable(_, predicate);
                    return new Enumerable(function () {
                        var enumerator;
                        var index = 0;
                        return new EnumeratorBase_1.default(function () {
                            throwIfDisposed(disposed);
                            index = 0;
                            enumerator = _.getEnumerator();
                        }, function (yielder) {
                            throwIfDisposed(disposed);
                            while (enumerator.moveNext()) {
                                if (predicate(enumerator.current, index++))
                                    return yielder.yieldReturn(enumerator.current);
                            }
                            return false;
                        }, function () {
                            dispose_1.dispose(enumerator);
                        }, _._isEndless);
                    }, function () {
                        disposed = true;
                    }, _._isEndless);
                };
                InfiniteEnumerable.prototype.where = function (predicate) {
                    return this._where(predicate);
                };
                InfiniteEnumerable.prototype.ofType = function (type) {
                    var typeName;
                    switch (type) {
                        case Number:
                            typeName = Types_1.default.NUMBER;
                            break;
                        case String:
                            typeName = Types_1.default.STRING;
                            break;
                        case Boolean:
                            typeName = Types_1.default.BOOLEAN;
                            break;
                        case Function:
                            typeName = Types_1.default.FUNCTION;
                            break;
                        default:
                            return this
                                .where(function (x) { return x instanceof type; });
                    }
                    return this
                        .where(function (x) { return typeof x === typeName; });
                };
                InfiniteEnumerable.prototype.except = function (second, compareSelector) {
                    var _ = this, disposed = !_.throwIfDisposed();
                    return new Enumerable(function () {
                        var enumerator;
                        var keys;
                        return new EnumeratorBase_1.default(function () {
                            throwIfDisposed(disposed);
                            enumerator = _.getEnumerator();
                            keys = new Dictionary_1.default(compareSelector);
                            if (second)
                                Enumerator_1.forEach(second, function (key) { return keys.addByKeyValue(key, true); });
                        }, function (yielder) {
                            throwIfDisposed(disposed);
                            while (enumerator.moveNext()) {
                                var current = enumerator.current;
                                if (!keys.containsKey(current)) {
                                    keys.addByKeyValue(current, true);
                                    return yielder.yieldReturn(current);
                                }
                            }
                            return false;
                        }, function () {
                            dispose_1.dispose(enumerator);
                            keys.clear();
                        }, _._isEndless);
                    }, function () {
                        disposed = true;
                    }, _._isEndless);
                };
                InfiniteEnumerable.prototype.distinct = function (compareSelector) {
                    return this.except(null, compareSelector);
                };
                InfiniteEnumerable.prototype.distinctUntilChanged = function (compareSelector) {
                    var _ = this, disposed = !_.throwIfDisposed();
                    return new Enumerable(function () {
                        var enumerator;
                        var compareKey;
                        var initial = true;
                        return new EnumeratorBase_1.default(function () {
                            throwIfDisposed(disposed);
                            enumerator = _.getEnumerator();
                        }, function (yielder) {
                            throwIfDisposed(disposed);
                            while (enumerator.moveNext()) {
                                var key = compareSelector(enumerator.current);
                                if (initial) {
                                    initial = false;
                                }
                                else if (compareKey === key) {
                                    continue;
                                }
                                compareKey = key;
                                return yielder.yieldReturn(enumerator.current);
                            }
                            return false;
                        }, function () {
                            dispose_1.dispose(enumerator);
                        }, _._isEndless);
                    }, function () {
                        disposed = true;
                    }, _._isEndless);
                };
                InfiniteEnumerable.prototype.defaultIfEmpty = function (defaultValue) {
                    if (defaultValue === void 0) { defaultValue = null; }
                    var _ = this, disposed = !_.throwIfDisposed();
                    return new Enumerable(function () {
                        var enumerator;
                        var isFirst;
                        return new EnumeratorBase_1.default(function () {
                            isFirst = true;
                            throwIfDisposed(disposed);
                            enumerator = _.getEnumerator();
                        }, function (yielder) {
                            throwIfDisposed(disposed);
                            if (enumerator.moveNext()) {
                                isFirst = false;
                                return yielder.yieldReturn(enumerator.current);
                            }
                            else if (isFirst) {
                                isFirst = false;
                                return yielder.yieldReturn(defaultValue);
                            }
                            return false;
                        }, function () {
                            dispose_1.dispose(enumerator);
                        }, _._isEndless);
                    }, null, _._isEndless);
                };
                InfiniteEnumerable.prototype.zip = function (second, resultSelector) {
                    var _ = this;
                    return new Enumerable(function () {
                        var firstEnumerator;
                        var secondEnumerator;
                        var index = 0;
                        return new EnumeratorBase_1.default(function () {
                            index = 0;
                            firstEnumerator = _.getEnumerator();
                            secondEnumerator = Enumerator_1.from(second);
                        }, function (yielder) { return firstEnumerator.moveNext()
                            && secondEnumerator.moveNext()
                            && yielder.yieldReturn(resultSelector(firstEnumerator.current, secondEnumerator.current, index++)); }, function () {
                            dispose_1.dispose(firstEnumerator, secondEnumerator);
                        });
                    });
                };
                InfiniteEnumerable.prototype.zipMultiple = function (second, resultSelector) {
                    var _ = this;
                    _.throwIfDisposed();
                    if (!second.length)
                        return Enumerable.empty();
                    return new Enumerable(function () {
                        var secondTemp;
                        var firstEnumerator;
                        var secondEnumerator;
                        var index = 0;
                        return new EnumeratorBase_1.default(function () {
                            secondTemp = new Queue_1.default(second);
                            index = 0;
                            firstEnumerator = _.getEnumerator();
                            secondEnumerator = null;
                        }, function (yielder) {
                            if (firstEnumerator.moveNext()) {
                                while (true) {
                                    while (!secondEnumerator) {
                                        if (secondTemp.count) {
                                            var next = secondTemp.dequeue();
                                            if (next)
                                                secondEnumerator = Enumerator_1.from(next);
                                        }
                                        else
                                            return yielder.yieldBreak();
                                    }
                                    if (secondEnumerator.moveNext())
                                        return yielder.yieldReturn(resultSelector(firstEnumerator.current, secondEnumerator.current, index++));
                                    secondEnumerator.dispose();
                                    secondEnumerator = null;
                                }
                            }
                            return yielder.yieldBreak();
                        }, function () {
                            dispose_1.dispose(firstEnumerator, secondTemp);
                        });
                    });
                };
                InfiniteEnumerable.prototype.join = function (inner, outerKeySelector, innerKeySelector, resultSelector, compareSelector) {
                    if (compareSelector === void 0) { compareSelector = Functions.Identity; }
                    var _ = this;
                    return new Enumerable(function () {
                        var outerEnumerator;
                        var lookup;
                        var innerElements = null;
                        var innerCount = 0;
                        return new EnumeratorBase_1.default(function () {
                            outerEnumerator = _.getEnumerator();
                            lookup = Enumerable.from(inner)
                                .toLookup(innerKeySelector, Functions.Identity, compareSelector);
                        }, function (yielder) {
                            while (true) {
                                if (innerElements != null) {
                                    var innerElement = innerElements[innerCount++];
                                    if (innerElement !== VOID0)
                                        return yielder.yieldReturn(resultSelector(outerEnumerator.current, innerElement));
                                    innerElement = null;
                                    innerCount = 0;
                                }
                                if (outerEnumerator.moveNext()) {
                                    var key = outerKeySelector(outerEnumerator.current);
                                    innerElements = lookup.get(key);
                                }
                                else {
                                    return yielder.yieldBreak();
                                }
                            }
                        }, function () {
                            dispose_1.dispose(outerEnumerator);
                        });
                    });
                };
                InfiniteEnumerable.prototype.groupJoin = function (inner, outerKeySelector, innerKeySelector, resultSelector, compareSelector) {
                    if (compareSelector === void 0) { compareSelector = Functions.Identity; }
                    var _ = this;
                    return new Enumerable(function () {
                        var enumerator;
                        var lookup = null;
                        return new EnumeratorBase_1.default(function () {
                            enumerator = _.getEnumerator();
                            lookup = Enumerable.from(inner)
                                .toLookup(innerKeySelector, Functions.Identity, compareSelector);
                        }, function (yielder) {
                            return enumerator.moveNext()
                                && yielder.yieldReturn(resultSelector(enumerator.current, lookup.get(outerKeySelector(enumerator.current))));
                        }, function () {
                            dispose_1.dispose(enumerator);
                        });
                    });
                };
                InfiniteEnumerable.prototype._concatWith = function (other) {
                    var _ = this, isEndless = _._isEndless || null;
                    return new Enumerable(function () {
                        var firstEnumerator;
                        var secondEnumerator;
                        return new EnumeratorBase_1.default(function () {
                            firstEnumerator = _.getEnumerator();
                        }, function (yielder) {
                            if (firstEnumerator != null) {
                                if (firstEnumerator.moveNext())
                                    return yielder.yieldReturn(firstEnumerator.current);
                                secondEnumerator = Enumerator_1.from(other);
                                firstEnumerator.dispose();
                                firstEnumerator = null;
                            }
                            if (secondEnumerator.moveNext())
                                return yielder.yieldReturn(secondEnumerator.current);
                            return false;
                        }, function () {
                            dispose_1.dispose(firstEnumerator, secondEnumerator);
                        }, isEndless);
                    }, null, isEndless);
                };
                InfiniteEnumerable.prototype.concatWith = function (other) {
                    return other ? this._concatWith(other) : this;
                };
                InfiniteEnumerable.prototype._merge = function (enumerables) {
                    var _ = this;
                    return new Enumerable(function () {
                        var enumerator;
                        var queue;
                        return new EnumeratorBase_1.default(function () {
                            enumerator = _.getEnumerator();
                            queue = new Queue_1.default(enumerables);
                        }, function (yielder) {
                            while (true) {
                                while (!enumerator && queue.count) {
                                    enumerator = Enumerator_1.from(queue.dequeue());
                                }
                                if (enumerator && enumerator.moveNext())
                                    return yielder.yieldReturn(enumerator.current);
                                if (enumerator) {
                                    enumerator.dispose();
                                    enumerator = null;
                                    continue;
                                }
                                return yielder.yieldBreak();
                            }
                        }, function () {
                            dispose_1.dispose(enumerator, queue);
                        });
                    });
                };
                InfiniteEnumerable.prototype.merge = function (enumerables) {
                    if (!enumerables || !enumerables.length)
                        return this;
                    if (enumerables.length == 1)
                        return this.concatWith(enumerables[0]);
                    return this._merge(enumerables);
                };
                InfiniteEnumerable.prototype.concat = function () {
                    var enumerables = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        enumerables[_i - 0] = arguments[_i];
                    }
                    var _ = this;
                    if (enumerables.length == 0)
                        return _;
                    if (enumerables.length == 1)
                        return _.concatWith(enumerables[0]);
                    return _.merge(enumerables);
                };
                InfiniteEnumerable.prototype.union = function (second, compareSelector) {
                    if (compareSelector === void 0) { compareSelector = Functions.Identity; }
                    var _ = this, isEndless = _._isEndless || null;
                    return new Enumerable(function () {
                        var firstEnumerator;
                        var secondEnumerator;
                        var keys;
                        return new EnumeratorBase_1.default(function () {
                            firstEnumerator = _.getEnumerator();
                            keys = new Dictionary_1.default(compareSelector);
                        }, function (yielder) {
                            var current;
                            if (secondEnumerator === VOID0) {
                                while (firstEnumerator.moveNext()) {
                                    current = firstEnumerator.current;
                                    if (!keys.containsKey(current)) {
                                        keys.addByKeyValue(current, null);
                                        return yielder.yieldReturn(current);
                                    }
                                }
                                secondEnumerator = Enumerator_1.from(second);
                            }
                            while (secondEnumerator.moveNext()) {
                                current = secondEnumerator.current;
                                if (!keys.containsKey(current)) {
                                    keys.addByKeyValue(current, null);
                                    return yielder.yieldReturn(current);
                                }
                            }
                            return false;
                        }, function () {
                            dispose_1.dispose(firstEnumerator, secondEnumerator);
                        }, isEndless);
                    }, null, isEndless);
                };
                InfiniteEnumerable.prototype.insertAt = function (index, other) {
                    if (isNaN(index) || index < 0 || !isFinite(index))
                        throw new Error("'index' is invalid or out of bounds.");
                    Integer_1.default.assert(index, "index");
                    var n = index;
                    var _ = this, isEndless = _._isEndless || null;
                    _.throwIfDisposed();
                    return new Enumerable(function () {
                        var firstEnumerator;
                        var secondEnumerator;
                        var count = 0;
                        var isEnumerated = false;
                        return new EnumeratorBase_1.default(function () {
                            count = 0;
                            firstEnumerator = _.getEnumerator();
                            secondEnumerator = Enumerator_1.from(other);
                            isEnumerated = false;
                        }, function (yielder) {
                            if (count == n) {
                                isEnumerated = true;
                                if (secondEnumerator.moveNext())
                                    return yielder.yieldReturn(secondEnumerator.current);
                            }
                            if (firstEnumerator.moveNext()) {
                                count++;
                                return yielder.yieldReturn(firstEnumerator.current);
                            }
                            return !isEnumerated
                                && secondEnumerator.moveNext()
                                && yielder.yieldReturn(secondEnumerator.current);
                        }, function () {
                            dispose_1.dispose(firstEnumerator, secondEnumerator);
                        }, isEndless);
                    }, null, isEndless);
                };
                InfiniteEnumerable.prototype.alternateMultiple = function (sequence) {
                    var _ = this;
                    return new Enumerable(function () {
                        var buffer, mode, enumerator, alternateEnumerator;
                        return new EnumeratorBase_1.default(function () {
                            alternateEnumerator = new ArrayEnumerator_1.default(Enumerable.toArray(sequence));
                            enumerator = _.getEnumerator();
                            var hasAtLeastOne = enumerator.moveNext();
                            mode = hasAtLeastOne
                                ? 1
                                : 0;
                            if (hasAtLeastOne)
                                buffer = enumerator.current;
                        }, function (yielder) {
                            switch (mode) {
                                case 0:
                                    return yielder.yieldBreak();
                                case 2:
                                    if (alternateEnumerator.moveNext())
                                        return yielder.yieldReturn(alternateEnumerator.current);
                                    alternateEnumerator.reset();
                                    mode = 1;
                                    break;
                            }
                            var latest = buffer;
                            var another = enumerator.moveNext();
                            mode = another
                                ? 2
                                : 0;
                            if (another)
                                buffer = enumerator.current;
                            return yielder.yieldReturn(latest);
                        }, function () {
                            dispose_1.dispose(enumerator, alternateEnumerator);
                        }, _._isEndless);
                    }, null, _._isEndless);
                };
                InfiniteEnumerable.prototype.alternateSingle = function (value) {
                    return this.alternateMultiple(Enumerable.make(value));
                };
                InfiniteEnumerable.prototype.alternate = function () {
                    var sequence = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        sequence[_i - 0] = arguments[_i];
                    }
                    return this.alternateMultiple(sequence);
                };
                return InfiniteEnumerable;
            }(DisposableBase_1.default));
            exports_1("InfiniteEnumerable", InfiniteEnumerable);
            Enumerable = (function (_super) {
                __extends(Enumerable, _super);
                function Enumerable(enumeratorFactory, finalizer, isEndless) {
                    if (isEndless === void 0) { isEndless = null; }
                    _super.call(this, enumeratorFactory, finalizer);
                    this._isEndless = isEndless;
                }
                Enumerable.fromArray = function (array) {
                    return new ArrayEnumerable(array);
                };
                Enumerable.from = function (source) {
                    if (Types_1.default.isObject(source) || Types_1.default.isString(source)) {
                        if (source instanceof Enumerable)
                            return source;
                        if (Array.isArray(source))
                            return new ArrayEnumerable(source);
                        if (Enumerator_1.isEnumerable(source))
                            return new Enumerable(function () { return source.getEnumerator(); });
                        if (Types_1.default.isArrayLike(source))
                            return new ArrayEnumerable(source);
                    }
                    throw new UnsupportedEnumerableException_1.default();
                };
                Enumerable.toArray = function (source) {
                    if (source instanceof FiniteEnumerable)
                        return source.toArray();
                    return Enumerator_1.toArray(source);
                };
                Enumerable.choice = function (values) {
                    var len = values && values.length;
                    if (!len || !isFinite(len))
                        throw new ArgumentOutOfRangeException_1.default('length', length);
                    return new InfiniteEnumerable(function () { return new EnumeratorBase_1.default(null, function (yielder) {
                        return yielder.yieldReturn(Integer_1.default.random.select(values));
                    }, true); });
                };
                Enumerable.chooseFrom = function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i - 0] = arguments[_i];
                    }
                    return Enumerable.choice(args);
                };
                Enumerable.cycle = function (values) {
                    var len = values && values.length;
                    if (!len || !isFinite(len))
                        throw new ArgumentOutOfRangeException_1.default('length', length);
                    return new InfiniteEnumerable(function () {
                        var index = 0;
                        return new EnumeratorBase_1.default(function () {
                            index = 0;
                        }, function (yielder) {
                            if (index >= values.length)
                                index = 0;
                            return yielder.yieldReturn(values[index++]);
                        }, true);
                    });
                };
                Enumerable.cycleThrough = function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i - 0] = arguments[_i];
                    }
                    return Enumerable.cycle(args);
                };
                Enumerable.empty = function () {
                    return new FiniteEnumerable(getEmptyEnumerator);
                };
                Enumerable.repeat = function (element, count) {
                    if (count === void 0) { count = Infinity; }
                    if (!(count > 0))
                        return Enumerable.empty();
                    return isFinite(count) && Integer_1.default.assert(count, "count")
                        ? new FiniteEnumerable(function () {
                            var c = count;
                            var index = 0;
                            return new EnumeratorBase_1.default(function () { index = 0; }, function (yielder) { return (index++ < c) && yielder.yieldReturn(element); }, null, false);
                        })
                        : new Enumerable(function () {
                            return new EnumeratorBase_1.default(null, function (yielder) { return yielder.yieldReturn(element); }, true);
                        });
                };
                Enumerable.repeatWithFinalize = function (initializer, finalizer) {
                    return new InfiniteEnumerable(function () {
                        var element;
                        return new EnumeratorBase_1.default(function () {
                            element = initializer();
                        }, function (yielder) { return yielder.yieldReturn(element); }, function () {
                            finalizer(element);
                        }, true);
                    });
                };
                Enumerable.make = function (element) {
                    return Enumerable.repeat(element, 1);
                };
                Enumerable.range = function (start, count, step) {
                    if (step === void 0) { step = 1; }
                    if (!isFinite(start))
                        throw new ArgumentOutOfRangeException_1.default("start", start, "Must be a finite number.");
                    if (!(count > 0))
                        return Enumerable.empty();
                    if (!step)
                        throw new ArgumentOutOfRangeException_1.default("step", step, "Must be a valid value");
                    if (!isFinite(step))
                        throw new ArgumentOutOfRangeException_1.default("step", step, "Must be a finite number.");
                    Integer_1.default.assert(count, "count");
                    return new FiniteEnumerable(function () {
                        var value;
                        var c = count;
                        var index = 0;
                        return new EnumeratorBase_1.default(function () {
                            index = 0;
                            value = start;
                        }, function (yielder) {
                            var result = index++ < c
                                && yielder.yieldReturn(value);
                            if (result && index < count)
                                value += step;
                            return result;
                        }, false);
                    });
                };
                Enumerable.rangeDown = function (start, count, step) {
                    if (step === void 0) { step = 1; }
                    step = Math.abs(step) * -1;
                    return Enumerable.range(start, count, step);
                };
                Enumerable.toInfinity = function (start, step) {
                    if (start === void 0) { start = 0; }
                    if (step === void 0) { step = 1; }
                    if (!isFinite(start))
                        throw new ArgumentOutOfRangeException_1.default("start", start, "Must be a finite number.");
                    if (!step)
                        throw new ArgumentOutOfRangeException_1.default("step", step, "Must be a valid value");
                    if (!isFinite(step))
                        throw new ArgumentOutOfRangeException_1.default("step", step, "Must be a finite number.");
                    return new InfiniteEnumerable(function () {
                        var value;
                        return new EnumeratorBase_1.default(function () {
                            value = start;
                        }, function (yielder) {
                            var current = value;
                            value += step;
                            return yielder.yieldReturn(current);
                        }, true);
                    });
                };
                Enumerable.toNegativeInfinity = function (start, step) {
                    if (start === void 0) { start = 0; }
                    if (step === void 0) { step = 1; }
                    return Enumerable.toInfinity(start, -step);
                };
                Enumerable.rangeTo = function (start, to, step) {
                    if (step === void 0) { step = 1; }
                    if (isNaN(to) || !isFinite(to))
                        throw new ArgumentOutOfRangeException_1.default("to", to, "Must be a finite number.");
                    if (step && !isFinite(step))
                        throw new ArgumentOutOfRangeException_1.default("step", step, "Must be a finite non-zero number.");
                    step = Math.abs(step);
                    return new FiniteEnumerable(function () {
                        var value;
                        return new EnumeratorBase_1.default(function () { value = start; }, start < to
                            ?
                                function (yielder) {
                                    var result = value <= to && yielder.yieldReturn(value);
                                    if (result)
                                        value += step;
                                    return result;
                                }
                            :
                                function (yielder) {
                                    var result = value >= to && yielder.yieldReturn(value);
                                    if (result)
                                        value -= step;
                                    return result;
                                }, false);
                    });
                };
                Enumerable.matches = function (input, pattern, flags) {
                    if (flags === void 0) { flags = ""; }
                    var type = typeof input;
                    if (type != Types_1.default.STRING)
                        throw new Error("Cannot exec RegExp matches of type '" + type + "'.");
                    if (pattern instanceof RegExp) {
                        flags += (pattern.ignoreCase) ? "i" : "";
                        flags += (pattern.multiline) ? "m" : "";
                        pattern = pattern.source;
                    }
                    if (flags.indexOf("g") === -1)
                        flags += "g";
                    return new FiniteEnumerable(function () {
                        var regex;
                        return new EnumeratorBase_1.default(function () {
                            regex = new RegExp(pattern, flags);
                        }, function (yielder) {
                            var match = regex.exec(input);
                            return (match !== null) ? yielder.yieldReturn(match) : false;
                        });
                    });
                };
                Enumerable.generate = function (factory, count) {
                    if (count === void 0) { count = Infinity; }
                    if (isNaN(count) || count <= 0)
                        return Enumerable.empty();
                    return isFinite(count) && Integer_1.default.assert(count, "count")
                        ?
                            new FiniteEnumerable(function () {
                                var c = count;
                                var index = 0;
                                return new EnumeratorBase_1.default(function () {
                                    index = 0;
                                }, function (yielder) {
                                    var current = index++;
                                    return current < c && yielder.yieldReturn(factory(current));
                                }, false);
                            })
                        :
                            new InfiniteEnumerable(function () {
                                var index = 0;
                                return new EnumeratorBase_1.default(function () {
                                    index = 0;
                                }, function (yielder) { return yielder.yieldReturn(factory(index++)); }, true);
                            });
                };
                Enumerable.unfold = function (seed, valueFactory, skipSeed) {
                    if (skipSeed === void 0) { skipSeed = false; }
                    return new InfiniteEnumerable(function () {
                        var index = 0;
                        var value;
                        var isFirst;
                        return new EnumeratorBase_1.default(function () {
                            index = 0;
                            value = seed;
                            isFirst = !skipSeed;
                        }, function (yielder) {
                            var i = index++;
                            if (isFirst)
                                isFirst = false;
                            else
                                value = valueFactory(value, i);
                            return yielder.yieldReturn(value);
                        }, true);
                    });
                };
                Enumerable.forEach = function (enumerable, action) {
                    Enumerator_1.forEach(enumerable, action);
                };
                Enumerable.map = function (enumerable, selector) {
                    return Enumerator_1.map(enumerable, selector);
                };
                Enumerable.max = function (values) {
                    return values
                        .takeUntil(function (v) { return v == +Infinity; }, true)
                        .aggregate(Functions.Greater);
                };
                Enumerable.min = function (values) {
                    return values
                        .takeUntil(function (v) { return v == -Infinity; }, true)
                        .aggregate(Functions.Lesser);
                };
                Enumerable.prototype.skip = function (count) {
                    return count > 0 ? this._skip(count) : this;
                };
                Enumerable.prototype.forEach = function (action) {
                    var _ = this;
                    _.throwIfDisposed();
                    Enumerator_1.throwIfEndless(_.isEndless);
                    var index = 0;
                    dispose_1.using(_.getEnumerator(), function (e) {
                        Enumerator_1.throwIfEndless(e.isEndless);
                        while (_.throwIfDisposed() && e.moveNext()) {
                            if (action(e.current, index++) === false)
                                break;
                        }
                    });
                };
                Enumerable.prototype.toArray = function (predicate) {
                    return predicate
                        ? this.where(predicate).toArray()
                        : this.copyTo([]);
                };
                Enumerable.prototype.copyTo = function (target, index) {
                    if (index === void 0) { index = 0; }
                    this.throwIfDisposed();
                    if (!target)
                        throw new ArgumentNullException_1.default("target");
                    Integer_1.default.assert(index);
                    if (index < 0)
                        throw new ArgumentOutOfRangeException_1.default("index", index, "Must be zero or greater");
                    Enumerator_1.forEach(this, function (x, i) {
                        target[i + index] = x;
                    });
                    return target;
                };
                Enumerable.prototype.toLookup = function (keySelector, elementSelector, compareSelector) {
                    if (elementSelector === void 0) { elementSelector = Functions.Identity; }
                    if (compareSelector === void 0) { compareSelector = Functions.Identity; }
                    var dict = new Dictionary_1.default(compareSelector);
                    this.forEach(function (x) {
                        var key = keySelector(x);
                        var element = elementSelector(x);
                        var array = dict.getValue(key);
                        if (array !== VOID0)
                            array.push(element);
                        else
                            dict.addByKeyValue(key, [element]);
                    });
                    return new Lookup(dict);
                };
                Enumerable.prototype.toMap = function (keySelector, elementSelector) {
                    var obj = {};
                    this.forEach(function (x) {
                        obj[keySelector(x)] = elementSelector(x);
                    });
                    return obj;
                };
                Enumerable.prototype.toDictionary = function (keySelector, elementSelector, compareSelector) {
                    if (compareSelector === void 0) { compareSelector = Functions.Identity; }
                    var dict = new Dictionary_1.default(compareSelector);
                    this.forEach(function (x) { return dict.addByKeyValue(keySelector(x), elementSelector(x)); });
                    return dict;
                };
                Enumerable.prototype.toJoinedString = function (separator, selector) {
                    if (separator === void 0) { separator = ""; }
                    if (selector === void 0) { selector = Functions.Identity; }
                    return this.select(selector).toArray().join(separator);
                };
                Enumerable.prototype.takeExceptLast = function (count) {
                    if (count === void 0) { count = 1; }
                    var _ = this;
                    if (!(count > 0))
                        return _;
                    if (!isFinite(count))
                        return Enumerable.empty();
                    Integer_1.default.assert(count, "count");
                    var c = count;
                    return new Enumerable(function () {
                        var enumerator;
                        var q;
                        return new EnumeratorBase_1.default(function () {
                            enumerator = _.getEnumerator();
                            q = new Queue_1.default();
                        }, function (yielder) {
                            while (enumerator.moveNext()) {
                                q.enqueue(enumerator.current);
                                if (q.count > c)
                                    return yielder.yieldReturn(q.dequeue());
                            }
                            return false;
                        }, function () {
                            dispose_1.dispose(enumerator, q);
                        });
                    });
                };
                Enumerable.prototype.skipToLast = function (count) {
                    if (!(count > 0))
                        return Enumerable.empty();
                    var _ = this;
                    if (!isFinite(count))
                        return _;
                    Integer_1.default.assert(count, "count");
                    return _.reverse()
                        .take(count)
                        .reverse();
                };
                Enumerable.prototype.where = function (predicate) {
                    return this._where(predicate);
                };
                Enumerable.prototype.select = function (selector) {
                    return this._select(selector);
                };
                Enumerable.prototype.selectMany = function (collectionSelector, resultSelector) {
                    return this._selectMany(collectionSelector, resultSelector);
                };
                Enumerable.prototype.choose = function (selector) {
                    if (selector === void 0) { selector = Functions.Identity; }
                    return this._choose(selector);
                };
                Enumerable.prototype.reverse = function () {
                    var _ = this, disposed = !_.throwIfDisposed();
                    Enumerator_1.throwIfEndless(_._isEndless);
                    return new Enumerable(function () {
                        var buffer;
                        var index = 0;
                        return new EnumeratorBase_1.default(function () {
                            throwIfDisposed(disposed);
                            buffer = _.toArray();
                            index = buffer.length;
                        }, function (yielder) { return index && yielder.yieldReturn(buffer[--index]); }, function () {
                            buffer.length = 0;
                        });
                    }, function () {
                        disposed = true;
                    });
                };
                Enumerable.prototype.shuffle = function () {
                    var _ = this, disposed = !_.throwIfDisposed();
                    Enumerator_1.throwIfEndless(_._isEndless);
                    return new Enumerable(function () {
                        var buffer;
                        var capacity;
                        var len;
                        return new EnumeratorBase_1.default(function () {
                            throwIfDisposed(disposed);
                            buffer = _.toArray();
                            capacity = len = buffer.length;
                        }, function (yielder) {
                            if (!len)
                                return yielder.yieldBreak();
                            var selectedIndex = Integer_1.default.random(len);
                            var selectedValue = buffer[selectedIndex];
                            buffer[selectedIndex] = buffer[--len];
                            buffer[len] = null;
                            if (len % 32 == 0)
                                buffer.length = len;
                            return yielder.yieldReturn(selectedValue);
                        }, function () {
                            buffer.length = 0;
                        });
                    }, function () {
                        disposed = true;
                    });
                };
                Enumerable.prototype.count = function (predicate) {
                    var count = 0;
                    this.forEach(predicate
                        ?
                            function (x, i) {
                                if (predicate(x, i))
                                    ++count;
                            }
                        :
                            function () {
                                ++count;
                            });
                    return count;
                };
                Enumerable.prototype.all = function (predicate) {
                    if (!predicate)
                        throw new ArgumentNullException_1.default("predicate");
                    var result = true;
                    this.forEach(function (x) {
                        if (!predicate(x)) {
                            result = false;
                            return false;
                        }
                    });
                    return result;
                };
                Enumerable.prototype.every = function (predicate) {
                    return this.all(predicate);
                };
                Enumerable.prototype.any = function (predicate) {
                    if (!predicate)
                        return _super.prototype.any.call(this);
                    var result = false;
                    this.forEach(function (x) {
                        result = predicate(x);
                        return !result;
                    });
                    return result;
                };
                Enumerable.prototype.some = function (predicate) {
                    return this.any(predicate);
                };
                Enumerable.prototype.isEmpty = function () {
                    return !this.any();
                };
                Enumerable.prototype.contains = function (value, compareSelector) {
                    return compareSelector
                        ? this.any(function (v) { return compareSelector(v) === compareSelector(value); })
                        : this.any(function (v) { return v === value; });
                };
                Enumerable.prototype.indexOf = function (value, compareSelector) {
                    var found = -1;
                    this.forEach(compareSelector
                        ?
                            function (element, i) {
                                if (Values.areEqual(compareSelector(element), compareSelector(value), true)) {
                                    found = i;
                                    return false;
                                }
                            }
                        :
                            function (element, i) {
                                if (Values.areEqual(element, value, true)) {
                                    found = i;
                                    return false;
                                }
                            });
                    return found;
                };
                Enumerable.prototype.lastIndexOf = function (value, compareSelector) {
                    var result = -1;
                    this.forEach(compareSelector
                        ?
                            function (element, i) {
                                if (Values.areEqual(compareSelector(element), compareSelector(value), true))
                                    result
                                        = i;
                            }
                        :
                            function (element, i) {
                                if (Values.areEqual(element, value, true))
                                    result = i;
                            });
                    return result;
                };
                Enumerable.prototype.concatWith = function (other) {
                    return other ? this._concatWith(other) : this;
                };
                Enumerable.prototype.merge = function (enumerables) {
                    if (!enumerables || !enumerables.length)
                        return this;
                    if (enumerables.length == 1)
                        return this.concatWith(enumerables[0]);
                    return this._merge(enumerables);
                };
                Enumerable.prototype.concat = function () {
                    var enumerables = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        enumerables[_i - 0] = arguments[_i];
                    }
                    if (enumerables.length == 0)
                        return this;
                    if (enumerables.length == 1)
                        return this.concatWith(enumerables[0]);
                    return this.merge(enumerables);
                };
                Enumerable.prototype.intersect = function (second, compareSelector) {
                    var _ = this;
                    return new Enumerable(function () {
                        var enumerator;
                        var keys;
                        var outs;
                        return new EnumeratorBase_1.default(function () {
                            enumerator = _.getEnumerator();
                            keys = new Dictionary_1.default(compareSelector);
                            outs = new Dictionary_1.default(compareSelector);
                            Enumerator_1.forEach(second, function (key) {
                                keys.addByKeyValue(key, true);
                            });
                        }, function (yielder) {
                            while (enumerator.moveNext()) {
                                var current = enumerator.current;
                                if (!outs.containsKey(current) && keys.containsKey(current)) {
                                    outs.addByKeyValue(current, true);
                                    return yielder.yieldReturn(current);
                                }
                            }
                            return yielder.yieldBreak();
                        }, function () {
                            dispose_1.dispose(enumerator, keys, outs);
                        }, _._isEndless);
                    }, null, _._isEndless);
                };
                Enumerable.prototype.sequenceEqual = function (second, equalityComparer) {
                    if (equalityComparer === void 0) { equalityComparer = Values.areEqual; }
                    return dispose_1.using(this.getEnumerator(), function (e1) { return dispose_1.using(Enumerator_1.from(second), function (e2) {
                        Enumerator_1.throwIfEndless(e1.isEndless && e2.isEndless);
                        while (e1.moveNext()) {
                            if (!e2.moveNext() || !equalityComparer(e1.current, e2.current))
                                return false;
                        }
                        return !e2.moveNext();
                    }); });
                };
                Enumerable.prototype.orderBy = function (keySelector) {
                    if (keySelector === void 0) { keySelector = Functions.Identity; }
                    return new OrderedEnumerable(this, keySelector, 1);
                };
                Enumerable.prototype.orderUsing = function (comparison) {
                    return new OrderedEnumerable(this, null, 1, null, comparison);
                };
                Enumerable.prototype.orderUsingReversed = function (comparison) {
                    return new OrderedEnumerable(this, null, -1, null, comparison);
                };
                Enumerable.prototype.orderByDescending = function (keySelector) {
                    if (keySelector === void 0) { keySelector = Functions.Identity; }
                    return new OrderedEnumerable(this, keySelector, -1);
                };
                Enumerable.prototype.groupBy = function (keySelector, elementSelector, compareSelector) {
                    var _this = this;
                    if (elementSelector === void 0) { elementSelector = Functions.Identity; }
                    if (!elementSelector)
                        elementSelector = Functions.Identity;
                    return new Enumerable(function () { return _this.toLookup(keySelector, elementSelector, compareSelector)
                        .getEnumerator(); });
                };
                Enumerable.prototype.partitionBy = function (keySelector, elementSelector, resultSelector, compareSelector) {
                    if (resultSelector === void 0) { resultSelector = function (key, elements) { return new Grouping(key, elements); }; }
                    if (compareSelector === void 0) { compareSelector = Functions.Identity; }
                    var _ = this;
                    if (!elementSelector)
                        elementSelector = Functions.Identity;
                    return new Enumerable(function () {
                        var enumerator;
                        var key;
                        var compareKey;
                        var group;
                        var len;
                        return new EnumeratorBase_1.default(function () {
                            enumerator = _.getEnumerator();
                            if (enumerator.moveNext()) {
                                key = keySelector(enumerator.current);
                                compareKey = compareSelector(key);
                                group = [elementSelector(enumerator.current)];
                                len = 1;
                            }
                            else
                                group = null;
                        }, function (yielder) {
                            if (!group)
                                return yielder.yieldBreak();
                            var hasNext, c;
                            while ((hasNext = enumerator.moveNext())) {
                                c = enumerator.current;
                                if (compareKey === compareSelector(keySelector(c)))
                                    group[len++] = elementSelector(c);
                                else
                                    break;
                            }
                            var result = resultSelector(key, group);
                            if (hasNext) {
                                c = enumerator.current;
                                key = keySelector(c);
                                compareKey = compareSelector(key);
                                group = [elementSelector(c)];
                                len = 1;
                            }
                            else {
                                group = null;
                            }
                            return yielder.yieldReturn(result);
                        }, function () {
                            dispose_1.dispose(enumerator);
                            group = null;
                        });
                    });
                };
                Enumerable.prototype.buffer = function (size) {
                    if (size < 1 || !isFinite(size))
                        throw new Error("Invalid buffer size.");
                    Integer_1.default.assert(size, "size");
                    var _ = this, len;
                    return new Enumerable(function () {
                        var enumerator;
                        return new EnumeratorBase_1.default(function () {
                            enumerator = _.getEnumerator();
                        }, function (yielder) {
                            var array = ArrayUtility.initialize(size);
                            len = 0;
                            while (len < size && enumerator.moveNext()) {
                                array[len++] = enumerator.current;
                            }
                            array.length = len;
                            return len && yielder.yieldReturn(array);
                        }, function () {
                            dispose_1.dispose(enumerator);
                        }, _._isEndless);
                    }, null, _._isEndless);
                };
                Enumerable.prototype.aggregate = function (func, seed) {
                    return this.scan(func, seed).lastOrDefault();
                };
                Enumerable.prototype.average = function (selector) {
                    if (selector === void 0) { selector = Types_1.default.numberOrNaN; }
                    var sum = 0;
                    var sumInfinite = 0;
                    var count = 0;
                    this.forEach(function (x) {
                        var value = selector(x);
                        if (isNaN(value)) {
                            sum = NaN;
                            return false;
                        }
                        if (isFinite(value))
                            sum += value;
                        else
                            sumInfinite += value > 0 ? (+1) : (-1);
                        ++count;
                    });
                    if (sumInfinite)
                        return sumInfinite * Infinity;
                    return (isNaN(sum) || !count)
                        ? NaN
                        : (sum / count);
                };
                Enumerable.prototype.max = function () {
                    return this.aggregate(Functions.Greater);
                };
                Enumerable.prototype.min = function () {
                    return this.aggregate(Functions.Lesser);
                };
                Enumerable.prototype.maxBy = function (keySelector) {
                    if (keySelector === void 0) { keySelector = Functions.Identity; }
                    return this.aggregate(function (a, b) { return (keySelector(a) > keySelector(b)) ? a : b; });
                };
                Enumerable.prototype.minBy = function (keySelector) {
                    if (keySelector === void 0) { keySelector = Functions.Identity; }
                    return this.aggregate(function (a, b) { return (keySelector(a) < keySelector(b)) ? a : b; });
                };
                Enumerable.prototype.sum = function (selector) {
                    if (selector === void 0) { selector = Types_1.default.numberOrNaN; }
                    var sum = 0;
                    var sumInfinite = 0;
                    this.forEach(function (x) {
                        var value = selector(x);
                        if (isNaN(value)) {
                            sum = NaN;
                            return false;
                        }
                        if (isFinite(value))
                            sum += value;
                        else
                            sumInfinite += value > 0 ? (+1) : (-1);
                    });
                    return isNaN(sum) ? NaN : (sumInfinite ? (sumInfinite * Infinity) : sum);
                };
                Enumerable.prototype.product = function (selector) {
                    if (selector === void 0) { selector = Types_1.default.numberOrNaN; }
                    var result = 1, exists = false;
                    this.forEach(function (x) {
                        exists = true;
                        var value = selector(x);
                        if (isNaN(value)) {
                            result = NaN;
                            return false;
                        }
                        if (value == 0) {
                            result = 0;
                            return false;
                        }
                        result *= value;
                    });
                    return (exists && isNaN(result)) ? NaN : result;
                };
                Enumerable.prototype.quotient = function (selector) {
                    if (selector === void 0) { selector = Types_1.default.numberOrNaN; }
                    var count = 0;
                    var result = NaN;
                    this.forEach(function (x) {
                        var value = selector(x);
                        count++;
                        if (count === 1) {
                            result = value;
                        }
                        else {
                            if (isNaN(value) || value === 0 || !isFinite(value)) {
                                result = NaN;
                                return false;
                            }
                            result /= value;
                        }
                    });
                    if (count === 1)
                        result = NaN;
                    return result;
                };
                Enumerable.prototype.last = function () {
                    var _ = this;
                    _.throwIfDisposed();
                    var value = undefined;
                    var found = false;
                    _.forEach(function (x) {
                        found = true;
                        value = x;
                    });
                    if (!found)
                        throw new Error("last:No element satisfies the condition.");
                    return value;
                };
                Enumerable.prototype.lastOrDefault = function (defaultValue) {
                    if (defaultValue === void 0) { defaultValue = null; }
                    var _ = this;
                    _.throwIfDisposed();
                    var value = undefined;
                    var found = false;
                    _.forEach(function (x) {
                        found = true;
                        value = x;
                    });
                    return (!found) ? defaultValue : value;
                };
                Enumerable.prototype.share = function () {
                    var _ = this;
                    _.throwIfDisposed();
                    var sharedEnumerator;
                    return new Enumerable(function () {
                        return new EnumeratorBase_1.default(function () {
                            if (!sharedEnumerator)
                                sharedEnumerator = _.getEnumerator();
                        }, function (yielder) {
                            return sharedEnumerator.moveNext()
                                && yielder.yieldReturn(sharedEnumerator.current);
                        });
                    }, function () {
                        dispose_1.dispose(sharedEnumerator);
                    });
                };
                Enumerable.prototype.memoize = function () {
                    var _ = this, disposed = !_.throwIfDisposed();
                    var cache;
                    var enumerator;
                    return new Enumerable(function () {
                        var index = 0;
                        return new EnumeratorBase_1.default(function () {
                            throwIfDisposed(disposed);
                            if (!enumerator)
                                enumerator = _.getEnumerator();
                            if (!cache)
                                cache = [];
                            index = 0;
                        }, function (yielder) {
                            throwIfDisposed(disposed);
                            var i = index++;
                            if (i >= cache.length) {
                                return (enumerator.moveNext())
                                    ? yielder.yieldReturn(cache[i] = enumerator.current)
                                    : false;
                            }
                            return yielder.yieldReturn(cache[i]);
                        });
                    }, function () {
                        disposed = true;
                        if (cache)
                            cache.length = 0;
                        cache = null;
                        dispose_1.dispose(enumerator);
                        enumerator = null;
                    });
                };
                Enumerable.prototype.catchError = function (handler) {
                    var _ = this, disposed = !_.throwIfDisposed();
                    return new Enumerable(function () {
                        var enumerator;
                        return new EnumeratorBase_1.default(function () {
                            try {
                                throwIfDisposed(disposed);
                                enumerator = _.getEnumerator();
                            }
                            catch (e) {
                            }
                        }, function (yielder) {
                            try {
                                throwIfDisposed(disposed);
                                if (enumerator.moveNext())
                                    return yielder.yieldReturn(enumerator.current);
                            }
                            catch (e) {
                                handler(e);
                            }
                            return false;
                        }, function () {
                            dispose_1.dispose(enumerator);
                        });
                    });
                };
                Enumerable.prototype.finallyAction = function (action) {
                    var _ = this, disposed = !_.throwIfDisposed();
                    return new Enumerable(function () {
                        var enumerator;
                        return new EnumeratorBase_1.default(function () {
                            throwIfDisposed(disposed);
                            enumerator = _.getEnumerator();
                        }, function (yielder) {
                            throwIfDisposed(disposed);
                            return (enumerator.moveNext())
                                ? yielder.yieldReturn(enumerator.current)
                                : false;
                        }, function () {
                            try {
                                dispose_1.dispose(enumerator);
                            }
                            finally {
                                action();
                            }
                        });
                    });
                };
                return Enumerable;
            }(InfiniteEnumerable));
            exports_1("Enumerable", Enumerable);
            FiniteEnumerable = (function (_super) {
                __extends(FiniteEnumerable, _super);
                function FiniteEnumerable(enumeratorFactory, finalizer) {
                    _super.call(this, enumeratorFactory, finalizer, false);
                }
                return FiniteEnumerable;
            }(Enumerable));
            exports_1("FiniteEnumerable", FiniteEnumerable);
            ArrayEnumerable = (function (_super) {
                __extends(ArrayEnumerable, _super);
                function ArrayEnumerable(source) {
                    _super.call(this, function () {
                        _.throwIfDisposed();
                        return new ArrayEnumerator_1.default(function () {
                            _.throwIfDisposed("The underlying ArrayEnumerable was disposed.", "ArrayEnumerator");
                            return _._source;
                        });
                    });
                    var _ = this;
                    _._disposableObjectName = "ArrayEnumerable";
                    _._source = source;
                }
                ArrayEnumerable.prototype._onDispose = function () {
                    _super.prototype._onDispose.call(this);
                    this._source = null;
                };
                Object.defineProperty(ArrayEnumerable.prototype, "source", {
                    get: function () {
                        return this._source;
                    },
                    enumerable: true,
                    configurable: true
                });
                ArrayEnumerable.prototype.toArray = function () {
                    var _ = this;
                    _.throwIfDisposed();
                    return Enumerator_1.toArray(_._source);
                };
                ArrayEnumerable.prototype.asEnumerable = function () {
                    return new ArrayEnumerable(this._source);
                };
                ArrayEnumerable.prototype.forEach = function (action) {
                    var _ = this;
                    _.throwIfDisposed();
                    Enumerator_1.forEach(_._source, action);
                };
                ArrayEnumerable.prototype.any = function (predicate) {
                    var _ = this;
                    _.throwIfDisposed();
                    var source = _._source, len = source ? source.length : 0;
                    return len && (!predicate || _super.prototype.any.call(this, predicate));
                };
                ArrayEnumerable.prototype.count = function (predicate) {
                    var _ = this;
                    _.throwIfDisposed();
                    var source = _._source, len = source ? source.length : 0;
                    return len && (predicate ? _super.prototype.count.call(this, predicate) : len);
                };
                ArrayEnumerable.prototype.elementAt = function (index) {
                    var _ = this;
                    _.throwIfDisposed();
                    var source = _._source;
                    return (index < source.length && index >= 0)
                        ? source[index]
                        : _super.prototype.elementAt.call(this, index);
                };
                ArrayEnumerable.prototype.elementAtOrDefault = function (index, defaultValue) {
                    if (defaultValue === void 0) { defaultValue = null; }
                    var _ = this;
                    _.throwIfDisposed();
                    var source = _._source;
                    return (index < source.length && index >= 0)
                        ? source[index]
                        : defaultValue;
                };
                ArrayEnumerable.prototype.last = function () {
                    var _ = this;
                    _.throwIfDisposed();
                    var source = _._source, len = source.length;
                    return (len)
                        ? source[len - 1]
                        : _super.prototype.last.call(this);
                };
                ArrayEnumerable.prototype.lastOrDefault = function (defaultValue) {
                    if (defaultValue === void 0) { defaultValue = null; }
                    var _ = this;
                    _.throwIfDisposed();
                    var source = _._source, len = source.length;
                    return len
                        ? source[len - 1]
                        : defaultValue;
                };
                ArrayEnumerable.prototype.skip = function (count) {
                    var _ = this;
                    if (!(count > 0))
                        return _;
                    return new Enumerable(function () { return new ArrayEnumerator_1.default(function () { return _._source; }, count); });
                };
                ArrayEnumerable.prototype.takeExceptLast = function (count) {
                    if (count === void 0) { count = 1; }
                    var _ = this, len = _._source ? _._source.length : 0;
                    return _.take(len - count);
                };
                ArrayEnumerable.prototype.skipToLast = function (count) {
                    if (!(count > 0))
                        return Enumerable.empty();
                    var _ = this;
                    if (!isFinite(count))
                        return _;
                    var len = _._source
                        ? _._source.length
                        : 0;
                    return _.skip(len - count);
                };
                ArrayEnumerable.prototype.reverse = function () {
                    var _ = this;
                    return new Enumerable(function () { return new ArrayEnumerator_1.default(function () { return _._source; }, _._source
                        ? (_._source.length - 1)
                        : 0, -1); });
                };
                ArrayEnumerable.prototype.memoize = function () {
                    return this;
                };
                ArrayEnumerable.prototype.sequenceEqual = function (second, equalityComparer) {
                    if (equalityComparer === void 0) { equalityComparer = Values.areEqual; }
                    if (Types_1.default.isArrayLike(second))
                        return Arrays.areEqual(this.source, second, true, equalityComparer);
                    if (second instanceof ArrayEnumerable)
                        return second.sequenceEqual(this.source, equalityComparer);
                    return _super.prototype.sequenceEqual.call(this, second, equalityComparer);
                };
                ArrayEnumerable.prototype.toJoinedString = function (separator, selector) {
                    if (separator === void 0) { separator = ""; }
                    if (selector === void 0) { selector = Functions.Identity; }
                    var s = this._source;
                    return !selector && Array.isArray(s)
                        ? s.join(separator)
                        : _super.prototype.toJoinedString.call(this, separator, selector);
                };
                return ArrayEnumerable;
            }(FiniteEnumerable));
            Grouping = (function (_super) {
                __extends(Grouping, _super);
                function Grouping(_groupKey, elements) {
                    _super.call(this, elements);
                    this._groupKey = _groupKey;
                }
                Object.defineProperty(Grouping.prototype, "key", {
                    get: function () {
                        return this._groupKey;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Grouping;
            }(ArrayEnumerable));
            Lookup = (function () {
                function Lookup(_dictionary) {
                    this._dictionary = _dictionary;
                }
                Object.defineProperty(Lookup.prototype, "count", {
                    get: function () {
                        return this._dictionary.count;
                    },
                    enumerable: true,
                    configurable: true
                });
                Lookup.prototype.get = function (key) {
                    return this._dictionary.getValue(key);
                };
                Lookup.prototype.contains = function (key) {
                    return this._dictionary.containsKey(key);
                };
                Lookup.prototype.getEnumerator = function () {
                    var _ = this;
                    var enumerator;
                    return new EnumeratorBase_1.default(function () {
                        enumerator = _._dictionary.getEnumerator();
                    }, function (yielder) {
                        if (!enumerator.moveNext())
                            return false;
                        var current = enumerator.current;
                        return yielder.yieldReturn(new Grouping(current.key, current.value));
                    }, function () {
                        dispose_1.dispose(enumerator);
                    });
                };
                return Lookup;
            }());
            WhereEnumerable = (function (_super) {
                __extends(WhereEnumerable, _super);
                function WhereEnumerable(prevSource, prevPredicate) {
                    _super.call(this, null, null, prevSource && prevSource.isEndless);
                    this.prevSource = prevSource;
                    this.prevPredicate = prevPredicate;
                }
                WhereEnumerable.prototype.where = function (predicate) {
                    if (predicate.length > 1)
                        return _super.prototype.where.call(this, predicate);
                    var prevPredicate = this.prevPredicate;
                    var composedPredicate = function (x) { return prevPredicate(x) && predicate(x); };
                    return new WhereEnumerable(this.prevSource, composedPredicate);
                };
                WhereEnumerable.prototype.select = function (selector) {
                    if (selector.length > 1)
                        return _super.prototype.select.call(this, selector);
                    return new WhereSelectEnumerable(this.prevSource, this.prevPredicate, selector);
                };
                WhereEnumerable.prototype.getEnumerator = function () {
                    var _ = this;
                    var predicate = _.prevPredicate;
                    var source = _.prevSource;
                    var enumerator;
                    return new EnumeratorBase_1.default(function () {
                        enumerator = source.getEnumerator();
                    }, function (yielder) {
                        while (enumerator.moveNext()) {
                            if (predicate(enumerator.current))
                                return yielder.yieldReturn(enumerator.current);
                        }
                        return false;
                    }, function () {
                        dispose_1.dispose(enumerator);
                    }, _._isEndless);
                };
                WhereEnumerable.prototype._onDispose = function () {
                    _super.prototype._onDispose.call(this);
                    this.prevPredicate = null;
                    this.prevSource = null;
                };
                return WhereEnumerable;
            }(Enumerable));
            WhereSelectEnumerable = (function (_super) {
                __extends(WhereSelectEnumerable, _super);
                function WhereSelectEnumerable(prevSource, prevPredicate, prevSelector) {
                    _super.call(this, null, null, prevSource && prevSource.isEndless);
                    this.prevSource = prevSource;
                    this.prevPredicate = prevPredicate;
                    this.prevSelector = prevSelector;
                }
                WhereSelectEnumerable.prototype.where = function (predicate) {
                    if (predicate.length > 1)
                        return _super.prototype.where.call(this, predicate);
                    return new WhereEnumerable(this, predicate);
                };
                WhereSelectEnumerable.prototype.select = function (selector) {
                    if (selector.length > 1)
                        return _super.prototype.select.call(this, selector);
                    var _ = this;
                    var prevSelector = _.prevSelector;
                    var composedSelector = function (x) { return selector(prevSelector(x)); };
                    return new WhereSelectEnumerable(_.prevSource, _.prevPredicate, composedSelector);
                };
                WhereSelectEnumerable.prototype.getEnumerator = function () {
                    var _ = this, predicate = _.prevPredicate, source = _.prevSource, selector = _.prevSelector, enumerator;
                    return new EnumeratorBase_1.default(function () {
                        enumerator = source.getEnumerator();
                    }, function (yielder) {
                        while (enumerator.moveNext()) {
                            var c = enumerator.current;
                            if (predicate == null || predicate(c)) {
                                return yielder.yieldReturn(selector(c));
                            }
                        }
                        return false;
                    }, function () {
                        dispose_1.dispose(enumerator);
                    }, _._isEndless);
                };
                WhereSelectEnumerable.prototype._onDispose = function () {
                    var _ = this;
                    _super.prototype._onDispose.call(this);
                    _.prevPredicate = null;
                    _.prevSource = null;
                    _.prevSelector = null;
                };
                return WhereSelectEnumerable;
            }(Enumerable));
            OrderedEnumerable = (function (_super) {
                __extends(OrderedEnumerable, _super);
                function OrderedEnumerable(source, keySelector, order, parent, comparer) {
                    if (comparer === void 0) { comparer = Values.compare; }
                    _super.call(this, null);
                    this.source = source;
                    this.keySelector = keySelector;
                    this.order = order;
                    this.parent = parent;
                    this.comparer = comparer;
                    Enumerator_1.throwIfEndless(source && source.isEndless);
                }
                OrderedEnumerable.prototype.createOrderedEnumerable = function (keySelector, order) {
                    return new OrderedEnumerable(this.source, keySelector, order, this);
                };
                OrderedEnumerable.prototype.thenBy = function (keySelector) {
                    return this.createOrderedEnumerable(keySelector, 1);
                };
                OrderedEnumerable.prototype.thenUsing = function (comparison) {
                    return new OrderedEnumerable(this.source, null, 1, this, comparison);
                };
                OrderedEnumerable.prototype.thenByDescending = function (keySelector) {
                    return this.createOrderedEnumerable(keySelector, -1);
                };
                OrderedEnumerable.prototype.thenUsingReversed = function (comparison) {
                    return new OrderedEnumerable(this.source, null, -1, this, comparison);
                };
                OrderedEnumerable.prototype.getEnumerator = function () {
                    var _ = this;
                    var buffer;
                    var indexes;
                    var index = 0;
                    return new EnumeratorBase_1.default(function () {
                        index = 0;
                        buffer = Enumerable.toArray(_.source);
                        indexes = createSortContext(_).generateSortedIndexes(buffer);
                    }, function (yielder) {
                        return (index < indexes.length)
                            ? yielder.yieldReturn(buffer[indexes[index++]])
                            : false;
                    }, function () {
                        if (buffer)
                            buffer.length = 0;
                        buffer = null;
                        if (indexes)
                            indexes.length = 0;
                        indexes = null;
                    }, false);
                };
                OrderedEnumerable.prototype._onDispose = function () {
                    _super.prototype._onDispose.call(this);
                    this.source = null;
                    this.keySelector = null;
                    this.order = null;
                    this.parent = null;
                };
                return OrderedEnumerable;
            }(FiniteEnumerable));
            exports_1("default",Enumerable);
        }
    }
});
//# sourceMappingURL=Linq.js.map