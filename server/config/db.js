const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(
      process.env.DBURL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log(`Mongodb is connected: ${connect.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit();
  }
};
module.exports = connectDB;
