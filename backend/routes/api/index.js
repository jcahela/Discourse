const router = require("express").Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const serversRouter = require("./servers.js")
const channelsRouter = require("./channels.js")
const messagesRouter = require("./messages.js")

router.post("/test", function (req, res) {
  res.json({ requestBody: req.body });
});

router.use("/session", sessionRouter);

router.use("/users", usersRouter);

router.use("/servers", serversRouter);

router.use("/channels", channelsRouter);

router.use("/messages", messagesRouter);

module.exports = router;
