require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const cors         = require("cors");


mongoose
  .connect('mongodb://localhost/ironphones-server', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Allow Cross-Origin Resource Sharing (cors)
// (access the API from the frontend JavaScript on a different domain/origin)
app.use(cors({
  // allow other domains/origins to send cookies
  credentials: true,
  // this is the domain we want cookies from (our React app)
  origin: [ "http://locahost:3000" ]
}));


const phoneRouter = require("./routes/phone-router.js");
app.use("/api", phoneRouter);


module.exports = app;
