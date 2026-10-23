require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken');
const connectDB = require('./config/db');
const User = require('./models/User');
const Post = require('./models/Post');
const { protect, authorize } = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 5011;

connectDB();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET || 'secret123', { expiresIn: '7d' });

// Auth: Register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ success: false, message: 'User already exists' });

    user = await User.create({ name, email, password, role: role || 'reader' });
    res.status(201).json({
      success: true,
      token: generateToken(user._id),
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// Auth: Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        success: true,
        token: generateToken(user._id),
        user: { id: user._id, name: user.name, email: user.email, role: user.role }
      });
    } else {
      res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Posts: Get All (Public for Readers/Guests)
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json({ success: true, count: posts.length, data: posts });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Posts: Create (Author & Admin only)
app.post('/api/posts', protect, authorize('admin', 'author'), async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const post = await Post.create({
      title,
      content,
      category,
      author: req.user._id,
      authorName: req.user.name
    });
    res.status(201).json({ success: true, data: post });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// Posts: Update (Admin OR Author of the post)
app.put('/api/posts/:id', protect, authorize('admin', 'author'), async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ success: false, message: 'Post not found' });

    if (post.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to edit this post' });
    }

    post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: post });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// Posts: Delete (Admin OR Author of the post)
app.delete('/api/posts/:id', protect, authorize('admin', 'author'), async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ success: false, message: 'Post not found' });

    if (post.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this post' });
    }

    await Post.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.listen(PORT, () => console.log(`⚛️ Practical 11 (Blog & RBAC) running on port ${PORT}`));
module.exports = app;
