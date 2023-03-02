const express = require("express");
const router = express.Router();
const apiRouter = require("./api");

router.use("/api", apiRouter);

router.get('/test', (req, res) => {
  return res.json('You reached /test route');
});

// Add a XSRF-TOKEN cookie in development
if (process.env.NODE_ENV !== "production") {
  router.get("/api/csrf/restore", (req, res) => {
    res.cookie("XSRF-TOKEN", req.csrfToken());
    res.status(201).json({});
  });
}

module.exports = router;
