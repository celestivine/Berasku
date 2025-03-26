const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true, index: true },
  author: { type: String, default: 'Admin' },
  date: { type: Date, default: Date.now },
  category: { type: String, default: 'blog' },
  content: { type: String, required: true },
  excerpt: { type: String, required: true },
  tags: [{ type: String }],
  language: { type: String, enum: ['id_ID', 'en_US'], default: 'id_ID' },
  featuredImage: { type: String },
  image: { type: String },
  views: { type: Number, default: 0 },
  readingTime: { type: String }, 
  seoMeta: {
    title: { type: String, required: true },
    description: { type: String, required: true },
    keywords: [{ type: String }],
    canonicalUrl: { type: String }
  }
});

module.exports = mongoose.model('Post', blogSchema);