const express = require("express");
const multer  = require('multer');
const uuid = require('uuid');
const router = express.Router();

const PostsController = require("../controllers/posts");

// Multer configuration
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: function (req, file, cb) {
    const uniqueFilename = `${uuid.v4()}-${file.originalname}`;
    cb(null, uniqueFilename);
  },
});

const upload = multer({ storage: storage });

router.get("/:id", PostsController.SinglePost);
router.get("/", PostsController.Index);
router.post("/", upload.single('image'), PostsController.Create); // Multer middleware added here

module.exports = router;
