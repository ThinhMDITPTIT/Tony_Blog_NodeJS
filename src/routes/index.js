const siteRouter = require('./site');
const newsRouter = require('./news');
const coursesRouter = require('./courses');
const meRouter = require('./me');

function route(app) {
    app.post('/search', (req, res) => {
        console.log(req.body);
        res.render('search');
    });
    
    // app.get('/news', (req, res) => res.render('news'));
    app.use('/news', newsRouter);

    app.use('/courses', coursesRouter);
    app.use('/me', meRouter);
    
    // app.get('/', (req, res) => res.render('home'));
    // app.get('/search', (req, res) => res.render('search'));
    app.use('/', siteRouter);
}

module.exports = route;
