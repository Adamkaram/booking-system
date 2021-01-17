if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const mongoose = require('mongoose');
mongoose.Promise = global.Promise

const port = process.env.PORT || 4000;

var express = require('express');
var cors = require('cors');

const app = express()
app.use(cors());
const bodyParser = require('body-parser')
const authMiddleware = require('./middleware/auth')

const config = require('./config')


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


// Middleware
app.use(bodyParser.json())
app.use(cors({ credentials: true }))
app.use(authMiddleware.initialize)

// Routes
app.use([require('./routes/auth'), require('./routes/rooms')])

// Error handling
app.use((error, req, res, next) => {
  res.json({
    error: {
      message: error.message
    }
  })
})

// Read port and host from the configuration file
// app.listen(config.port, config.host, error => {
//   if (error) {
//     console.error('Error starting', error)
//   } else {
//     console.info('Express listening on port ', config.port)
//   }
// })
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
