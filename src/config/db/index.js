const mongoose = require('mongoose')

async function connect () {
  try {
    await mongoose.connect('mongodb://localhost:27017/tony_blog_nodejs_dev', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connect successfully");
  } catch (error) {
    console.log("Connect failed: ", error);
  }
}

module.exports = { connect };