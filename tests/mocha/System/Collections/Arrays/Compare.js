"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
///<reference types="node"/>
var assert = require("assert");
var areArraysEqual_1 = require("../../../../../source/Collections/Array/areArraysEqual");
var a1 = [1, 2, 3];
var a2 = [1, 2, 3];
var b = [4, 5, 6];
var c = [7, 8, 9, 10];
var d = b.slice();
var e = c.slice();
d.length = e.length = 200000;
describe(".areEqual()", function () {
    it("should be equal", function () {
        assert.ok(areArraysEqual_1.default([], []));
        assert.ok(areArraysEqual_1.default(a1, a1));
        assert.ok(areArraysEqual_1.default(a1, a2));
    });
    it("should not be equal", function () {
        assert.ok(!areArraysEqual_1.default(null, a1));
        assert.ok(!areArraysEqual_1.default(a1, null));
        assert.ok(!areArraysEqual_1.default(a1, b));
        assert.ok(!areArraysEqual_1.default(b, c));
    });
});
describe(".areAllEqual()", function () {
    it("should be equal", function () {
        assert.ok(areArraysAllEqual([[], [], []]));
        assert.ok(areArraysAllEqual([a1, a1, a2]));
    });
    it("should not be equal", function () {
        assert.ok(!areArraysAllEqual([a1, null]));
        assert.ok(!areArraysAllEqual([a1, b, c]));
        assert.ok(!areArraysAllEqual([a1, b], true, function () { return false; }));
    });
    it("should error for invalid", function () {
        assert.throws(function () { return areArraysAllEqual(null); });
        assert.throws(function () { return areArraysAllEqual([]); });
        assert.throws(function () { return areArraysAllEqual([a1]); });
    });
});
describe(".areEquivalent()", function () {
    it("should be equivalent", function () {
        assert.ok(ArrayCompare.areEquivalent([1], [1]));
        assert.ok(ArrayCompare.areEquivalent(a1, a1));
        assert.ok(ArrayCompare.areEquivalent(a1, a2));
        assert.ok(ArrayCompare.areEquivalent(a1, a1.slice().reverse()));
    });
    it("should not be equivalent", function () {
        assert.ok(!ArrayCompare.areEquivalent([1], [2]));
        assert.ok(!ArrayCompare.areEquivalent(a1, b, function () { return 1; }));
        assert.ok(!ArrayCompare.areEquivalent(a1, b));
        assert.ok(!ArrayCompare.areEquivalent(d, e));
    });
});
//# sourceMappingURL=Compare.js.map