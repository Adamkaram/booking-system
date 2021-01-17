require('dotenv').config()
const mongoose = require('mongoose');
const Room = require('./Room')
const User = require('./User')
const url = process.env.ATLAS_URI;
mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})


mongoose.connection.dropDatabase().then(
  async() => {
   
    try {
      mongoose.connection.close()
     
    }
    catch (err) {
      console.log(err)
    }

 }
  
);

