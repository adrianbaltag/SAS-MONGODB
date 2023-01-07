const express = require("express");
const router = express.Router();
var passport = require("passport");

//import controller from controllers folder to be able to use the logic defined there
const { createUser, getUsers,deleteUser } = require("../controllers/userController");

//GET, POST

router.get("/", (req, res) => {
    res.send("Hello World!");
});

// all routes protected by jwt authentication
router.get("/getusers", passport.authenticate('jwt', { session: false }), getUsers)
router.post("/createuser", passport.authenticate('jwt', { session: false }), createUser)

// router.route("/").post(createUser).get(getUsers);

router.get("/test", passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({ msg: "Success" });
});

router.route("/:id", passport.authenticate('jwt', { session: false })).delete(deleteUser);

module.exports = router;
