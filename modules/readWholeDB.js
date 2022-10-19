const fs = require('fs');
const path = require('path');

let json = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'databases', 'bin.json')));

/**
 * @name readWholeDB
 * @description reads the whole database bin.json
 *
 * @returns {Array}
 */
module.exports = function () {

    return json;

};