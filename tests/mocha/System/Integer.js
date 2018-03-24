"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
///<reference types="node"/>
var assert = require("assert");
require("mocha");
var Integer_1 = require("../../../dist/umd/Integer");
var TEST_FLOAT = 10.915, TEST_INT = 10, MAX = 9007199254740991;
describe('(value)', function () {
    it('should convert float number to integer without rounding', function () {
        assert.equal(Integer_1.default(TEST_FLOAT), TEST_INT);
    });
});
describe('.as32Bit(value)', function () {
    it('should convert float number to integer without rounding', function () {
        assert.equal(Integer_1.default.as32Bit(TEST_FLOAT), TEST_INT);
    });
    it('should throw not possible to convert', function () {
        assert.throws(function () { return Integer_1.default.as32Bit(MAX); });
    });
});
describe('.is(value)', function () {
    it('should detect a number that is not an integer', function () {
        function baseTests(fn) {
            assert.equal(fn("1"), false);
            assert.equal(fn("test"), false);
            assert.equal(fn(NaN), false);
            assert.equal(fn(Infinity), false);
            assert.equal(fn(-Infinity), false);
            assert.equal(fn(TEST_FLOAT), false);
            assert.equal(fn(-TEST_FLOAT), false);
        }
        baseTests(Integer_1.default.is);
        baseTests(Integer_1.default.is32Bit);
        assert.equal(Integer_1.default.is32Bit(Integer_1.default.MAX_32_BIT + 1), false);
    });
    it('should detect a number that is an integer', function () {
        function baseTests(fn) {
            assert.equal(fn(-0), true);
            assert.equal(fn(-TEST_INT), true);
            assert.equal(fn(TEST_INT), true);
            assert.equal(fn(Integer_1.default.MAX_32_BIT), true);
            assert.equal(fn(-Integer_1.default.MAX_32_BIT), true);
        }
        baseTests(Integer_1.default.is);
        baseTests(Integer_1.default.is32Bit);
        assert.equal(Integer_1.default.is(Integer_1.default.MAX_32_BIT + 1), true);
        assert.equal(Integer_1.default.is(-MAX), true);
        assert.equal(Integer_1.default.is(MAX), true);
    });
});
describe('.assert(value)', function () {
    it('should detect a number that is not an integer', function () {
        assert.throws(function () {
            Integer_1.default.assert(TEST_FLOAT);
        });
    });
    it('should detect a number that is an integer', function () {
        assert.equal(Integer_1.default.assert(TEST_INT), true);
    });
});
//# sourceMappingURL=Integer.js.map