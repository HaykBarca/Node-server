const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();

app.use((req, res, next) => {
    var date = new Date().toString();
    var log = `${date}: ${req.method} ${req.url} \n`;

    fs.appendFile('server.log', log, (err) => {
        if (err) console.log(`Failed to append file.`);
    });
    console.log(log);
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('toUpperCase', (text) => {
    return text.toUpperCase();
});

app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageName: 'Home Page'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageName: 'About Page',
        welcomeMessage: 'Welcome to About page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Bad request'
    });
});

app.listen(3000, function() {
    console.log('App is listening on port 3000');
});