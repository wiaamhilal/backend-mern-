const {
  createPostCtrl,
  getAllPostsCtrl,
  getSinglePostCtrl,
  getPostCountCtrl,
  deletePostCtrl,
  updatePostCtrl,
  updatePostImageCtrl,
  toggleLikeCtrl,
} = require("../controllers/postsController");
const photoUpload = require("../middlewares/photoUpload");
const validateObjedtId = require("../middlewares/validateObjedtId");
const {verifyToken} = require("../middlewares/verifyToken");

const router = require("express").Router();

// /api/posts
router
  .route("/")
  .post(verifyToken, photoUpload.single("image"), createPostCtrl)
  .get(getAllPostsCtrl);

// /api/posts/count
router.route("/count").get(getPostCountCtrl);

// /api/posts/:id
router
  .route("/:id")
  .get(validateObjedtId, getSinglePostCtrl)
  .delete(validateObjedtId, verifyToken, deletePostCtrl)
  .put(validateObjedtId, verifyToken, updatePostCtrl);

// /api/posts/update-image/:id
router
  .route("/update-image/:id")
  .put(
    validateObjedtId,
    verifyToken,
    photoUpload.single("image"),
    updatePostImageCtrl
  );

// /api/posts/like/:id
router.route("/like/:id").put(validateObjedtId, verifyToken, toggleLikeCtrl);
module.exports = router;
