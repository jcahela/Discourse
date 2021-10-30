const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");

const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { User } = require("../../db/models");

const router = express.Router();

const validateLogin = [
  check("credential")
    .exists({ checkFalsy: true })
    // .notEmpty()
    .withMessage("Username/Email: This is a required field."),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Password: This is a required field."),
  handleValidationErrors,
];

// Log in
router.post(
  '/',
  validateLogin,
  asyncHandler(async (req, res, next) => {
    const { credential, password } = req.body;

    const user = await User.login({ credential, password });

    if (!user) {
      const err = new Error('Login failed');
      err.status = 400;
      err.title = 'Login failed';
      err.errors = ['Incorrect email/username and password combination'];
      return next(err);
    }

    await setTokenCookie(res, user);

    return res.json(user);
  }),
);

// Log out
router.delete(
  '/',
  (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
  }
);

// Restore session user
router.get(
  '/',
  restoreUser,
  asyncHandler( async (req, res) => {
    const { user } = req;
    if (user) {
      const restoredUser = await User.findByPk(user.id, {include: ["Friends1", "Friends2", 'Requests']});
      console.log(restoredUser);
      return res.json({
        user: restoredUser
      });
    } else return res.json({});
  })
);

module.exports = router;
