const express = require("express");
var passport = require("passport");
const router = express.Router();
//import controller from controllers folder to be able to use the logic defined there
const {
  getUserPosts,
  createPost,
  updatePost,
  deletePost,
  getPost,
  getSingleUserPosts,
  getPostCount,deletePosts,
  getAdminPosts
} = require("../controllers/postController");

// *********NOTE: FOR ADDING FUNCTIONALITY TO EACH ROUTER, BEST PRACTICE IS TO CREATE A CONTROLLER FOR EACH ROUTER!!!!!!!!!!!!!**************************

//GET REQUEST
// router.get('/', getPosts)

//POST REQUEST(create)
// router.post('/', createPost)

//PUT REQUEST(UPDATE)
// router.put('/:id', updatePost)

//DELETE REQUEST(DELETE)
// router.delete('/:id', deletePost)

//========chaining routers because they have same entry point========
//GET, POST
router.route("/", passport.authenticate('jwt', { session: false })).post(createPost);
router.route("/userposts", passport.authenticate('jwt', { session: false })).get(getUserPosts);
router.route("/adminposts", passport.authenticate('jwt', { session: false })).get(getAdminPosts);
router.route("/singleuserpost/:id", passport.authenticate('jwt', { session: false })).get(getSingleUserPosts);
router.route("/post/:id", passport.authenticate('jwt', { session: false })).get(getPost);
router.route("/postCount", passport.authenticate('jwt', { session: false })).get(getPostCount)
//PUT, DELETE
router.route("/:id", passport.authenticate('jwt', { session: false })).put(updatePost).delete(deletePost);
router.route("/", passport.authenticate('jwt', { session: false })).delete(deletePosts);

module.exports = router;
