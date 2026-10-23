require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Post = require('./models/Post');

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await User.deleteMany({});
  await Post.deleteMany({});

  const admin = await User.create({ name: 'Prince Prajapati', email: 'prince@admin.com', password: 'password123', role: 'admin' });
  const author = await User.create({ name: 'Ananya Sharma', email: 'ananya@author.com', password: 'password123', role: 'author' });
  const reader = await User.create({ name: 'Rahul Verma', email: 'rahul@reader.com', password: 'password123', role: 'reader' });

  await Post.create([
    { title: 'Mastering Full-Stack MERN Architecture', content: 'Comprehensive guide to building scalable React and Node.js microservices with MongoDB Atlas.', category: 'Tech', author: admin._id, authorName: admin.name },
    { title: 'Role-Based Access Control in Express', content: 'Understanding JWT tokens, authorization middleware, and granular permissions.', category: 'Security', author: author._id, authorName: author.name }
  ]);

  console.log('✅ Practical 11 seeded successfully with Admin, Author & Reader accounts.');
  process.exit(0);
};

seed();
