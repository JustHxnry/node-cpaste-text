const fs = require('fs');
const path = require('path');
const randoms = require('@justhxnry/randoms');

let json = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'databases', 'bin.json')));

/**
 * @name saveDB
 * @description saves new record to the database bin.json
 *
 * @param {(String|Number)} value - Value that is gonna be saved
 * @returns {Promise}
 */
module.exports = function (value) {

    return new Promise((resolve, reject) => {
        try {
            const id_length = randoms.randomNum(3, 12);
            let text_id = randoms.randomString(id_length);

            let model = {
                value,
                id: text_id,
                dateCreated: new Date()
            };

            json.push(model);

            fs.writeFileSync(path.join(__dirname, '..', 'databases', 'bin.json'), JSON.stringify(json));

            return resolve(text_id);
        } catch (error) {
            return reject(error);
        }
    });

};