import { SqlClient } from "msnodesqlv8";
import * as config from '../config';

const sql: SqlClient = require("msnodesqlv8");

export const query = async function (query, cb) {
    sql.query(config.CONNECTION_STRING, query, (err, rows) => {
        err && cb(err, null) || cb(null, rows);
    });
}