const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const routes = require('../modules/routes');

module.exports.setupApp = () => {
  const app = express();

  // enable files upload
  app.use(fileUpload({
    createParentPath: true
  }));
  
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use('/', routes);

  return app;
};