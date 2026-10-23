const dns = require('dns');
try { dns.setDefaultResultOrder('ipv4first'); } catch (e) {}
try { dns.setServers(['8.8.8.8', '1.1.1.1']); } catch (e) {}
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000
    });
    console.log(`✅ MongoDB Connected Successfully: ${conn.connection.host}`);
    console.log(`⚛️ Database: ${conn.connection.name}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.log(`⚛️ Tip: Check Atlas network access / IP whitelisting or MONGO_URI in .env`);
  }
};

module.exports = connectDB;
