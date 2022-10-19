require('dotenv').config();
const express = require('express');
const app = express();

function checkDB() {
    require('./modules/setupDB')().then(result => {
        if (!result || result == false || result != true) return checkDB();

        console.log('Database setup successful');
    });
};
checkDB();

let db = {
    save: require('./modules/saveDB'),
    read: require('./modules/readDB'),
    readAll: require('./modules/readWholeDB')
};

app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/_app', express.static(__dirname + "/public"));

app.use(express.urlencoded({ extended: true }));

app.get('/readme.md', (req, res) => {
    const code = `Welcome to CPaste!

Use the buttons in the top right menu
to create a new file or edit the
existing one`;

    res.render('code-display', { code, lang: 'plaintext' });
});

app.get('/', (req, res) => {
   res.render('new');
});

app.get('/new', (req, res) => {
   res.render('new');
});

app.post('/save', async (req, res) => {
    const value = req.body.value;
    console.log('Request made');

    await db.save(value)
        .then((id) => {
            return res.redirect(`/${id}`);
        })
        .catch((err) => {
            console.error(err);
            res.render('new', { value })
        });
});

app.get('/:id/duplicate', async(req, res) => {
    const id = req.params.id;

    await db.read(id)
        .then((text) => {
            if (!text.value) {
                try {
                    var model = JSON.parse(require('fs').readFileSync(__dirname+"/databases/bin.json"));

                    var value = model.find(x => x.id == id).value;

                    if (!value) value = "";

                    var text = {value};
                } catch (e) {
                    console.error(e);
                    text = {value: ""};
                }
            };
            res.render('new', { value: text.value });
        })
        .catch((err) => {
            console.error(err);
            res.redirect('/'+id);
        });
});

app.get('/:id', async(req, res) => {
    const id = req.params.id;

    await db.read(id)
        .then((text) => {
            if (!text.value) {
                try {
                    var model = JSON.parse(require('fs').readFileSync(__dirname+"/databases/bin.json"));

                    var value = model.find(x => x.id == id).value;

                    if (!value) value = "";

                    var text = {value};
                } catch (e) {
                    console.error(e);
                    text = {value: ""};
                }
            };
            res.render('code-display', { code: text.value, id });
        })
        .catch((err) => {
            console.error(err);
            res.redirect('/');
        });
});

app.listen(3000);