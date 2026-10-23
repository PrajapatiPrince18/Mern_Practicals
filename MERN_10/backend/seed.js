require('dotenv').config();
const dns = require('dns');
try { dns.setDefaultResultOrder('ipv4first'); } catch (e) {}
try { dns.setServers(['8.8.8.8', '1.1.1.1']); } catch (e) {}
const mongoose = require('mongoose');
const InventoryItem = require('./models/InventoryItem');

const sampleItems = [
  {
    sku: 'ELC-101',
    name: 'Logitech MX Master 3S Mouse',
    category: 'Electronics',
    quantity: 24,
    unitPrice: 8999,
    supplier: 'Logitech India',
    reorderLevel: 5
  },
  {
    sku: 'ELC-102',
    name: 'Dell UltraSharp 27" 4K USB-C Monitor',
    category: 'Computing',
    quantity: 12,
    unitPrice: 42999,
    supplier: 'Dell Technologies',
    reorderLevel: 4
  },
  {
    sku: 'ACC-201',
    name: 'Keychron Q1 Pro Mechanical Keyboard',
    category: 'Accessories',
    quantity: 6,
    unitPrice: 15499,
    supplier: 'Keychron Direct',
    reorderLevel: 8
  },
  {
    sku: 'FUR-301',
    name: 'Ergonomic Mesh Executive Chair',
    category: 'Furniture',
    quantity: 15,
    unitPrice: 18500,
    supplier: 'GreenSoul Seating',
    reorderLevel: 5
  },
  {
    sku: 'OFC-401',
    name: 'Premium A4 Copier Paper (5 Reams)',
    category: 'Office Supplies',
    quantity: 50,
    unitPrice: 1250,
    supplier: 'JK Paper Mills',
    reorderLevel: 10
  },
  {
    sku: 'ELC-105',
    name: 'USB-C Multiport Hub (10-in-1)',
    category: 'Accessories',
    quantity: 0,
    unitPrice: 3499,
    supplier: 'Anker Innovations',
    reorderLevel: 10
  }
];

const seedData = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB.');

    console.log('Clearing old inventory...');
    await InventoryItem.deleteMany({});

    console.log('Inserting seed items...');
    await InventoryItem.insertMany(sampleItems);

    console.log(`⚛️ Successfully seeded ${sampleItems.length} inventory products!`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeder failed:', err.message);
    process.exit(1);
  }
};

seedData();
