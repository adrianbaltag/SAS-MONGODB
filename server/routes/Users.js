const express = require("express");
const router = express.Router();


//import controller from controllers folder to be able to use the logic defined there
const { createUser, getUsers,deleteUser } = require("../controllers/userController");

//GET, POST

// router.get("/", (req, res) => {
//     res.send("Hello World!");
// });

// all routes protected by jwt authentication
//router.get("/getusers", getUsers)
router.post("/createuser", createUser)
 router.route("/").post(createUser).get(getUsers);

// router.get("/test", passport.authenticate('jwt', { session: false }), (req, res) => {
//     res.json({ msg: "Success" });
// });

router.route("/:id" ).delete(deleteUser);

module.exports = router;
