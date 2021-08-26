const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    console.log(
      `MONGODB Connected:${connect.connection.host}`.cyan.underline.bold
    );
  } catch (err) {
    console.log(`Error (MongoDB connection failed): ${err.messsage}`.red);
    process.exit(1);
  }
};

module.exports = connectDB;
