const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");

const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");

const router = express.Router();

const validateSignupBlankFields = [
  check('email')
    .exists({ checkFalsy: true })
    .withMessage('Email: This is a required field'),
  check('username')
    .exists({ checkFalsy: true })
    .withMessage('Username: This is a required field'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Password: This is a required field'),
  handleValidationErrors
]

const validateSignup = [
  check('email')
    .isEmail()
    .withMessage('Email: Please provide a valid email.')
    .custom(async (value) => {
      const user = await User.findOne({ where: { email: value }})
      if (user) {
        return Promise.reject('Email: This email already exists')
      }
    }),
  check('username')
    .isLength({ min: 4 })
    .withMessage('Username: Please provide a username with at least 4 characters.')
    .custom(async (value) => {
      const user = await User.findOne({ where: { username: value }})
      if (user) {
        return Promise.reject('Username: This username already exists')
      }
    }),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username: Username cannot be an email.'),
  check('password')
    .isLength({ min: 6 })
    .withMessage('Password: Password must be 6 characters or more.'),
  handleValidationErrors,
];

// Sign up
router.post(
  '',
  validateSignupBlankFields,
  validateSignup,
  asyncHandler(async (req, res) => {
    const { email, password, username } = req.body;
    const user = await User.signup({ email, username, password });

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  }),
);

module.exports = router;
