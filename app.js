const express = require('express');
const app = express();
const routes = require('./routes');
const port = 3000;

const monggose = require('mongoose');
monggose.connect('mongodb://localhost/test', { useNewUrlParser: true });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', routes);

app.listen(port, () => {
    console.log(`Server is running in port ${port}...`);
})