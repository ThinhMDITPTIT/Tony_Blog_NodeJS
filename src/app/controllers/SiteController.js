const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../util/mongoose');

class SiteController {
    // [GET] /
    home(req, res, next) {
        // Inject to Model to call data
        // Model inject to Mongo data get data => send back to Controller
        // Controller send to Client
        // const coursesQuery = Course.find({});
        // coursesQuery.exec()
        //     .then(function(err, courses) {
        //         if(!err) {
        //             res.json(courses);
        //             return;
        //         }
        //         next(err);
        //         // res.status(400).json({ error: 'ERROR!!!' }); 
        //     });
        Course.find({})
            .then(courses => {
                // Because hbs from v4.6^ fix security issue => can not access direct mongoose 'this' object anymore
                // Object's mongoose provide toObject method to convert
                // courses = courses.map(course => course.toObject())
                res.render('home', { 
                    courses: multipleMongooseToObject(courses)
                })
            })
            .catch(next);
        // res.render('home');
    }

    // [GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
