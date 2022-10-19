const fs = require('fs');
const path = require('path');
const dbDirPath = path.join(__dirname, '..', 'databases');
const dbPath = path.join(__dirname, '..', 'databases', 'bin.json');

module.exports = function () {
    return new Promise((resolve) => {
        if (!fs.existsSync(dbDirPath)) {
            fs.mkdirSync(dbDirPath);
            fs.writeFileSync(dbPath, JSON.stringify([]));
        }

        if (!fs.existsSync(dbPath)) fs.writeFileSync(dbDirPath, []);

        return resolve(fs.existsSync(dbPath));
    });
};