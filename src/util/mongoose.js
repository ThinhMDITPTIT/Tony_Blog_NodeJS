// Mongoose Helper

module.exports = {
  multipleMongooseToObject: function (mongooseArr) {
    return mongooseArr.map(mongoose => mongoose.toObject());
  },
  mongooseToObject: function (mongoose) {
    return mongoose ? mongoose.toObject() : mongoose;
  }
}