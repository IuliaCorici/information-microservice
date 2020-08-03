const Router = require('express').Router();

const landmarksControllers = require('./information/controllers.js');

Router.use('/landmarks', landmarksControllers);


module.exports = Router;