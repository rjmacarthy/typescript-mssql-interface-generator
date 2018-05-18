import { expect, assert } from "chai";
import { query } from '../repository/db';
import * as config from '../config';

describe("Repository", function () {
    it('Can get table names', () => {
        var q = `SELECT TABLE_NAME
        FROM INFORMATION_SCHEMA.TABLES
        WHERE TABLE_TYPE = 'BASE TABLE' AND TABLE_CATALOG='${config.DB_NAME}'`;
        query(q, (err, result) => {
            assert.isNotNull(result);
        });
    })
});