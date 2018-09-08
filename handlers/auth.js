const db = require('../models');
const jwt = require('jsonwebtoken');


exports.register = async function(req, res, next) {
  try {
    // Password legitimacy check.
    if (req.body.password.length < 6) {
      next({
        status: 400,
        message: 'Password should be at least 6 characters',
      });
    }

    // Create a new User.
    let newUser = db.User.create(req.body);
    let { id, username, password } = newUser;

    // Assign a token to the new User.
    let token = jwt.sign({
      id,
      username,
      password,
    }, process.env.SECRET_KEY);
