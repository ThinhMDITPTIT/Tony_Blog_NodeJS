const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const slug = require("mongoose-slug-updater");
const mongooseSoftDelte = require("mongoose-delete");

const Schema = mongoose.Schema;

const CourseSchema = new Schema(
    {
        // Custom _id auto increment
        // _id: Number,
        name: { type: String, maxLength: 255, required: true },
        description: { type: String, maxLength: 500 },
        image: { type: String, maxLength: 255 },
        // Use slug plugin to generate slug from name and should be unique
        slug: { type: String, slug: "name", unique: true },
        videoId: { type: String, maxLength: 255, required: true },
        level: { type: String, maxLength: 255 },
        // From version 4.^ of mongoose => will support auto add these below 2 fields if have config 'timestamps: true'
        // createdAt: { type: Date, default: Date.now },
        // updatedAt: { type: Date, default: Date.now },
    },
    {
        // add this option to disable default _id of MongoDB => MongoDB will not touch field _id anymore
        // _id: false,
        timestamps: true,
    }
);

// Custom query helpers
CourseSchema.query.sortable = function (req) {
    if (req.query.hasOwnProperty("_sort")) {
        const isValidType = ["asc", "desc"].includes(req.query.type);
        // 'this' is equal to courseQuery
        // courseQuery = courseQuery.sort({
        //     [req.query.column]: isValidType ? req.query.type : "desc",
        // });
        return this.sort({
            [req.query.column]: isValidType ? req.query.type : "desc",
        });
    }

    return this;
};

// Add Plugin
mongoose.plugin(slug);
// CourseSchema.plugin(AutoIncrement);
CourseSchema.plugin(mongooseSoftDelte, {
    deletedAt: true,
    overrideMethods: "all",
});

// model name
// mongoose we read and auto convert to snake case (lowercase and s)
module.exports = mongoose.model("Course", CourseSchema);
