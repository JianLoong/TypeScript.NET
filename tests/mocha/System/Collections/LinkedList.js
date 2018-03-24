"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
///<reference types="node"/>
var assert = require("assert");
require("mocha");
var ICollectionTests = require("./ICollection");
var LinkedList_1 = require("../../../../dist/umd/Collections/LinkedList");
var areArraysEqual_1 = require("../../../../source/Collections/Array/areArraysEqual");
var CLASS_NAME = 'LinkedList';
ICollectionTests.StringCollection(CLASS_NAME, new LinkedList_1.default());
ICollectionTests.NumberCollection(CLASS_NAME, new LinkedList_1.default());
ICollectionTests.InstanceCollection(CLASS_NAME, new LinkedList_1.default());
describe('.addAfter & .addBefore', function () {
    var part1 = [1, 2, 3], part2 = [5, 6, 7];
    var parts = part1.concat(part2), len1 = parts.length;
    var list = new LinkedList_1.default(parts);
    var list1 = list.toArray();
    var count1 = list.count;
    var partsSpliced = part1.concat([4]).concat(part2);
    var len2 = partsSpliced.length;
    list.find(5).addBefore(4);
    var count2 = list.count;
    var list2 = list.toArray();
    list.find(6).addAfter(6.5);
    var count3 = list.count;
    var list3 = list.toArray();
    it('should match expected initial count', function () {
        assert.equal(len1, count1);
        assert.ok(areArraysEqual_1.default(parts, list1));
    });
    it('should match expected count after inserting before', function () {
        assert.equal(len2, count2);
        assert.ok(areArraysEqual_1.default(partsSpliced, list2), partsSpliced.join(',') + " != " + list2.join(','));
    });
    it('should match expected count after inserting after', function () {
        assert.equal(len2 + 1, count3);
        assert.ok(areArraysEqual_1.default(partsSpliced, list2), list3.join(','));
    });
});
describe("Validate external node detachment", function () {
    it("should assert if node detached", function () {
        var list = new LinkedList_1.default();
        list.add(1).add(2);
        assert.equal(list.count, 2);
        assert.equal(list.findLast(1).value, 1);
        assert.equal(list.firstValue, 1);
        assert.equal(list.find(2).value, 2);
        assert.equal(list.lastValue, 2);
        list.last.value = 3;
        assert.equal(list.find(3).value, 3);
        assert.equal(list.lastValue, 3);
        list.addAfter(list.first, 5)
            .addFirst(0)
            .addLast(10);
        assert.equal(list.first.value, 0);
        assert.equal(list.getNodeAt(0).value, 0);
        assert.equal(list.getValueAt(0), 0);
        assert.equal(list.getNodeAt(2).value, 5);
        assert.equal(list.getValueAt(2), 5);
        assert.equal(list.getNodeAt(4).value, 10);
        assert.equal(list.getValueAt(4), 10);
        assert.ok(list.removeLast());
        assert.ok(list.removeFirst());
        var n = list.getNodeAt(1);
        assert.ok(list.removeAt(1));
        assert.throws(function () { return n.value; });
        var last = list.last;
        assert.equal(last.previous.value, 1);
        assert.equal(last.previous.next, last);
        last.remove();
        assert.ok(!last.list);
        assert.equal(list.count, 1);
        assert.doesNotThrow(function () { return last.remove(); });
        assert.throws(function () { return last.value; });
        assert.throws(function () { return last.next; });
        assert.throws(function () { return last.previous; });
        var first = list.first;
        list.dispose();
        assert.ok(!first.list);
        assert.throws(function () { return first.value; });
    });
});
//# sourceMappingURL=LinkedList.js.map