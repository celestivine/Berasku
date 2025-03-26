const Post = require('../models/blog'); 

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require("../middleware/catchAsyncErrors");


// create new article => /api/v1/blog/new
exports.newPost = catchAsyncErrors (async (req, res) => {
  try {
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// READ - Ambil semua artikel
exports.getPosts = catchAsyncErrors (async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// READ - Ambil satu artikel berdasarkan slug
exports.getSinglePost = catchAsyncErrors (async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });
    if (!post) return res.status(404).json({ message: 'Blog Tidak Ditemukan' });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE - Edit artikel berdasarkan ID
exports.updatePost = catchAsyncErrors (async (req, res) => {
    try {

      const existingPost = await Post.findById(req.params.id);
      if (!existingPost) return res.status(404).json({ message: "Blog Tidak Ditemukan" });
  
      let updateData = req.body;
  
      if (updateData.title) {
        if (!updateData.seoMeta) updateData.seoMeta = existingPost.seoMeta || {}; 
        updateData.seoMeta.title = updateData.title; 
      }
  

      const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        { $set: updateData },
        { new: true, runValidators: true }
      );
  
      res.status(200).json(updatedPost);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
 

// DELETE - Hapus artikel berdasarkan ID
exports.deletePost = catchAsyncErrors (async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) return res.status(404).json({ message: 'Blog tidak ditemukan' });
    res.status(200).json({ message: 'Blog Berhasil Dihapus' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
