/* eslint-env mocha */
'use strict';

const assert = require('assert');
const { Timedelta, Timestamp } = require('./time');


describe('time.Timedelta.intersect', () => {
    it('non-intersecting1', () => {
        let td1 = new Timedelta(
            new Timestamp(0, 0, 0, 0),
            new Timestamp(1, 0, 0, 0)
        );
        let td2 = new Timedelta(
            new Timestamp(1, 0, 0, 0),
            new Timestamp(2, 0, 0, 0)
        );
        let expected = new Timedelta(
            new Timestamp(1, 0, 0, 0),
            new Timestamp(1, 0, 0, 0)
        );
        assert.deepEqual(td1.intersect(td2), expected);
    });
    it('non-intersecting2', () => {
        let td1 = new Timedelta(
            new Timestamp(1, 1, 1, 0),
            new Timestamp(1, 1, 1, 0)
        );
        let td2 = new Timedelta(
            new Timestamp(1, 2, 1, 0),
            new Timestamp(1, 2, 1, 0)
        );
        let expected = new Timedelta(
            new Timestamp(1, 2, 1, 0),
            new Timestamp(1, 1, 1, 0)
        );
        assert.deepEqual(td1.intersect(td2), expected);
    });
    it('intersecting', () => {
        let td1 = new Timedelta(
            new Timestamp(1, 0, 0, 0),
            new Timestamp(8, 0, 0, 0)
        );
        let td2 = new Timedelta(
            new Timestamp(5, 0, 0, 0),
            new Timestamp(13, 0, 0, 0)
        );
        let expected = new Timedelta(
            new Timestamp(5, 0, 0, 0),
            new Timestamp(8, 0, 0, 0)
        );
        assert.deepEqual(td1.intersect(td2), expected);
    });
    it('intersecting many, reduce', () => {
        let tds = [
            new Timedelta(new Timestamp(0, 12, 0, 5), new Timestamp(0, 17, 0, 5)),
            new Timedelta(new Timestamp(0, 11, 30, 5), new Timestamp(0, 16, 30, 5)),
            new Timedelta(new Timestamp(0, 9, 0, 3), new Timestamp(0, 14, 0, 3)),
            new Timedelta(new Timestamp(0, 10, 0, 5), new Timestamp(0, 18, 0, 5))
        ];
        let actual = tds.reduce((acc, x) => x.intersect(acc), Timedelta.max());
        let expected = new Timedelta(
            new Timestamp(0, 12, 0, 5),
            new Timestamp(0, 14, 0, 3)
        );
        assert.deepEqual(actual, expected);
        assert.equal(expected.totalMinutes(), 4 * 60);
    });
    it('intersecting many, reduce2', () => {
        let tds = [
            new Timedelta(new Timestamp(0, 12, 0, 5), new Timestamp(0, 17, 0, 5)),
            new Timedelta(new Timestamp(0, 11, 30, 5), new Timestamp(0, 16, 30, 5)),
            new Timedelta(new Timestamp(0, 9, 0, 3), new Timestamp(0, 14, 0, 3)),
            new Timedelta(new Timestamp(0, 10, 0, 5), new Timestamp(0, 18, 0, 5))
        ];
        let actual = tds.reduce((acc, x) => x.intersect(acc), Timedelta.max());
        let expected = new Timedelta(
            new Timestamp(0, 12, 0, 5),
            new Timestamp(0, 14, 0, 3)
        );
        assert.deepEqual(actual, expected);
        assert.equal(expected.totalMinutes(), 4 * 60);
    });
});

describe('totalMinutes', () => {
    it('works well on offsets', () => {
        let a = Timestamp.fromString('ВТ 09:30+3');
        let b = Timestamp.fromString('ВТ 10:00+5');
        let c = Timestamp.fromString('ВТ 13:00+5');
        assert.equal(a.totalMinutes() - b.totalMinutes(), 90);
        assert.equal(c.totalMinutes() - a.totalMinutes(), 90);
    });
});
