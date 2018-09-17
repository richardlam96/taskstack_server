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
    let newUser = await db.User.create(req.body);
    let { id, username, password } = newUser;

    // Assign a token to the new User.
    let token = jwt.sign({
      id,
      username,
    }, process.env.SECRET_KEY);

    return res.status(200).json({
      id,
      username,
      token,
    });
  
  } catch(error) {
    next(error)
  }
}

exports.signin = async function(req, res, next) {
  try {
    // Attempt to find User in database.
    let user = await db.User.findOne({ username: req.body.username });
    if (!user) {
      next({
        error: 401,
        message: "Could not find that username",
      });
    }

    // Check password.
    let isMatch = await user.comparePassword(req.body.password);
    if (!isMatch) {
      next({
        status: 401,
        message: 'Invalid password',
      });
    }

    // Username and password valid, return data and token.
    const { id, username } = user;
    const token = jwt.sign({
      id,
      username,
    }, process.env.SECRET_KEY);

    return res.status(200).json({
      id,
      username,
      token,
    });

  } catch(error) {
    next(error);
  }
}

