"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateRequest = exports.editBusiness = exports.login = exports.signup = void 0;

var _business = require("../resources/business.modal");

var _jwtService = require("./jwtService");

const signup = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({
      msg: 'email and password are mandatory'
    });
  }

  try {
    let business = await _business.Business.create(req.body);
    let token = (0, _jwtService.generateNewToken)(business);
    return res.status(201).send({
      token
    });
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
};

exports.signup = signup;

const login = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({
        msg: 'need email and password'
      });
    }

    const business = await _business.Business.findOne({
      email: req.body.email
    }).select('email password').exec();

    if (business.password != req.body.password) {
      return res.status(401).send({
        msg: "email password combination is incorrect"
      });
    }

    return res.status(200).send({
      token: (0, _jwtService.generateNewToken)(business)
    });
    res.status(401).send({
      msg: "email doest not exists"
    });
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
};

exports.login = login;

const editBusiness = async (req, res) => {
  if (!req.body.email) {
    // console.log('Email:',req.body);
    return res.send({
      msg: 'New email not Provided'
    });
  }

  const id = req.business._id;
  const business = await _business.Business.findByIdAndUpdate(id, {
    email: req.body.email
  }, {
    new: true
  }).exec();
  console.log(business);
  return res.send({
    msg: 'Email Updated',
    Newemail: req.body.email
  });
};

exports.editBusiness = editBusiness;

const validateRequest = async (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer || bearer.indexOf('Bearer ') == -1) {
    return res.status(401).send({
      msg: "Bearer token missing"
    });
  }

  let token = bearer.split(' ')[1];
  let payload;

  try {
    payload = await (0, _jwtService.verifyToken)(token);
    const business = await _business.Business.findById(payload.sub).select('-password').exec();

    if (!business) {
      return res.status(401).end();
    }

    req["business"] = business;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      msg: "Bearer token not valid"
    });
  }
};

exports.validateRequest = validateRequest;