const fs = require('fs');
const path = require('path');
const jsoned = require('@justhxnry/jsoned');

let json = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'databases', 'bin.json')));

/**
 * @name readDB
 * @description reads record from the database bin.json
 *
 * @param {(String|Number)} id - id to find the record
 * @returns {Promise}
 */
module.exports = function (id) {

    return new Promise((resolve, reject) => {
        try {
            var model = jsoned.findOne(json, id, 'id');

            return resolve(model);
        } catch (error) {
            return reject(error);
        }
    });

};