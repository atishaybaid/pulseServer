"use strict";

var _dev = _interopRequireDefault(require("./config/dev.js"));

var _express = _interopRequireDefault(require("express"));

var _db = require("./utils/db.js");

var _index = require("./auth/index.js");

var _bodyParser = require("body-parser");

var _contactRouter = _interopRequireDefault(require("./resources/contact/contact.router.js"));

var _questionRouter = _interopRequireDefault(require("./resources/question/question.router.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
app.use((0, _bodyParser.json)());
app.post('/signup', _index.signup);
app.post('/login', _index.login);
console.log("request arrived");
app.use('/api', _index.validateRequest);
console.log(_contactRouter.default);
app.use('/api/v1/contact', _contactRouter.default);
app.use('/api/v1/question', _questionRouter.default);

const start = async () => {
  try {
    await (0, _db.connectDb)();
  } catch (error) {
    console.log(error);
  }

  app.listen(_dev.default.port, () => {
    console.log(`server started on port ${_dev.default.port}`);
  });
};

start();
console.log(_dev.default);