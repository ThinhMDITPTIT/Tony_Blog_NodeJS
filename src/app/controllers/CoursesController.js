const { mongooseToObject } = require("../../util/mongoose");
const Course = require("../models/Course");

class CoursesController {
	// [GET] /courses/create
	create(req, res, next) {
		res.render("courses/create");
	}

	// [GET] /courses/:slug
	show(req, res, next) {
		Course.findOne({ slug: req.params.slug })
			.then((course) => {
				res.render("courses/show", {
					course: mongooseToObject(course),
				});
			})
			.catch(next);
	}

	// [POST] /courses/store
	store(req, res, next) {
		const formData = {...req.body};
		formData.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg `;
		const course = new Course(formData);
		course.save()
			.then(() => res.redirect(`/courses/${course.slug}`))
			.catch(next);
	}

	// [POST] /courses/handle-form-actions
	handleFormActions(req, res, next) {
		switch (req.body.action) {
      case "delete":
        Course.delete({ _id: { $in: req.body.courseIds } })
					.then(() => res.redirect('back'))
					.catch(next);
        break;
      // case "edit":
      //   this.edit(req, res, next);
      //   break;
      // case "update":
      //   this.update(req, res, next);
      //   break;
      // case "create":
      //   this.create(req, res, next);
      //   break;
      default:
        res.json('Invalid action');
    }
	}

	// [GET] /courses/:id/edit
	edit(req, res, next) {
		Course.findById(req.params.id)
			.then(course => {
				res.render('courses/edit', {
					course: mongooseToObject(course)
				})
			})
			.catch(next);
	}
	
	// [PUT] /courses/:id
	update(req, res, next) {
		const courseId = req.params.id;
		const formData = {...req.body};
		Course.updateOne({ _id: courseId }, formData)
			// res.redirect add field 'Location' into response header
			// Base on response header 'Location' => Browser will redirect into new path
			.then(() => res.redirect('/me/stored/courses'))
			.catch(next);
	}

	// [DELETE] /courses/:id
	delete(req, res, next) {
		const courseId = req.params.id;
		// Normal way: HARD delete
		// Course.deleteOne({ _id: courseId })
		// 	// .then(() => res.redirect('back'))
		// 	.then(() => res.redirect('/me/stored/courses'))
		// 	.catch(next);
		// SOFT DELETE
		Course.delete({ _id: courseId })
			// .then(() => res.redirect('back'))
			.then(() => res.redirect('/me/stored/courses'))
			.catch(next);
	}

	// [DELETE] /courses/:id/force
	destroy(req, res, next) {
		const courseId = req.params.id;
		Course.deleteOne({ _id: courseId })
			.then(() => res.redirect('back'))
			.catch(next);
	}

	// [PATCH] /courses/:id/restore
	restore(req, res, next) {
		const courseId = req.params.id;
		Course.restore({ _id: courseId })
			.then(() => res.redirect('back'))
			.catch(next);
	}
}

module.exports = new CoursesController();
