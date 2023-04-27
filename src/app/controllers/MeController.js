const { multipleMongooseToObject } = require("../../util/mongoose");
const Course = require("../models/Course");

class MeController {
    // [GET] /me/stored/courses
    storedCourses(req, res, next) {
        // The line below could be accessible in view
        // res.json(res.locals._sort);
        Promise.all([Course.countDocumentsDeleted(), Course.find({}).sortable(req)])
            .then(([deletedCount, courses]) => {
                res.render("me/stored-courses", {
                    deletedCount,
                    storedCourses: multipleMongooseToObject(courses),
                });
            })
            .catch(next);
    }

    // [GET] /me/trash/courses
    trashCourses(req, res, next) {
        Course.findDeleted({})
            .then((courses) => {
                res.render("me/trash-courses", {
                    trashCourses: multipleMongooseToObject(courses),
                });
            })
            .catch(next);
    }
}

module.exports = new MeController();
