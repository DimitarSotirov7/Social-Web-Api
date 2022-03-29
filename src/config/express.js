const config = require('./config');
const express = require('express');
const cors = require('cors');
const router = require('../router');
const cookieParser = require('cookie-parser');
const auth = require('../middlewares/auth');
 
module.exports = (app) => {
  app.use(cors({
    origin: config.origin,
    methods: config.methods,
    credentials: true
  }));
  
  app.use(express.json())
  app.use('/static', express.static('static'));
  app.use(cookieParser());
  app.use(auth);
  app.use(router);

  app.listen(config.port);
};