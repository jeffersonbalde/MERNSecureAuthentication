const express = require("express");
const router = express.Router();

const { SignUp, LogIn, VerifyToken, GetUser } = require("../controller/user.controller.js");

router.get("/", (req, res) => {
    res.send("Hello worldsx")
})

router.post("/signup", SignUp)

router.post("/login", LogIn)

router.get("/user", VerifyToken, GetUser)

module.exports = router;