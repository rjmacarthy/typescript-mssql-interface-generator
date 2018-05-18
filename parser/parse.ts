import jsonToTs from 'json-to-ts';
import { readFileSync, existsSync, mkdirSync, writeFileSync } from "fs";
import { query } from '../repository/db';
import { forEach } from 'lodash';
import * as config from '../config';

export const parseAll = () => {
    var q = `SELECT TABLE_NAME
    FROM INFORMATION_SCHEMA.TABLES
    WHERE TABLE_TYPE = 'BASE TABLE' AND TABLE_CATALOG='${config.DB_NAME}'`;
    query(q, (err, result) => {
        forEach(result, ({ TABLE_NAME }) => {
            query(`SELECT top 1 * from [${TABLE_NAME}]`, (err, result) => {
                if (!err && result && result.length) {
                    try {
                        parse(result, `I${TABLE_NAME}`);
                    } catch (e) {

                    }
                } else {
                    console.log(`Faled to generate interface for ${TABLE_NAME} : no data`);
                }
            });
        });
    });
    console.log('Interfaces created!');
}

export const parse = (json: string, fileName: string) => {
    !existsSync('./interfaces') && mkdirSync('./interfaces/');
    var i = jsonToTs(json).toString();
    i = i.toString().replace("RootObject", fileName);
    writeFileSync(`./interfaces/${fileName + '.ts'}`, i);
}

parseAll();