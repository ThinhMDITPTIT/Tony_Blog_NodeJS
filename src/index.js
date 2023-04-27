const path = require("path");
const express = require("express");
const morgan = require("morgan");
const { engine } = require("express-handlebars");
const methodOverride = require("method-override");

const softMiddleware = require("./app/middlewares/sortMiddleware");

const route = require("./routes");
const db = require("./config/db");

// Connect DB
db.connect();

const app = express();
const port = 3000;

// Static File
// Middleware used to check if this path is a static file => If it is, it will serve it (redirect into public directory)
app.use(express.static(path.join(__dirname, "public")));

// Add use HTTP logger middleware
app.use(morgan("combined"));

// From express version 4.16, it's auto add this lib
// Add middleware to handle form data (body parser)
// This middleware is used to parse form data then save it to object body
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json()); // data from XMLHTTPrequest, fetch, axios, ...

// Use method-override lib to override method
app.use(methodOverride("_method"));

// Using custom middleware
app.use(softMiddleware);

// Template engine
// Define that handlebars template will use engine() from exphbs
app.engine(
    ".hbs",
    engine({
        extname: ".hbs",
        // Specific helper for handlebars to handle logic in views
        helpers: require('./helper/handlebars'),
    })
);
// Set view engine use handlebars
app.set("view engine", ".hbs");
// __dirname is path of index.js
// Write as multiple param => Can work with all OS system
// app.set('views', path.join(__dirname, 'resources/views'));
app.set("views", path.join(__dirname, "resources", "views"));

// Route
// app.get('/', (req, res) => res.send(`Hi, I'm Tony`));
// req: request => include all info that application/client send to server
// res: response => include all info that server send back to application/client
route(app);
// app.get('/', (req, res) => res.render('home'));
// app.get('/news', (req, res) => res.render('news'));
// app.get('/search', (req, res) => res.render('search'));
// app.post('/search', (req, res) => {
//   console.log(req.body);
//   res.render('search')
// });

// 127.0.0.1 - localhostnode
app.listen(port, () =>
    console.log(`App listening at 'http://localhost:${port}'`)
);
