const mongoose = require("mongoose");
const Product = require("../models/product");
const User = require("../models/user");

mongoose.connect("mongodb://127.0.0.1:27017/ecommerce");

const sampleProducts = [
  // --- ELECTRONICS ---
  {
    name: "AeroNoise Pro Headphones",
    category: "electronics",
    price: 249.0,
    description:
      "Active-noise-cancelling over-ear headphones with ultra-light frame and studio-quality drivers.",
    lifestyleImageUrl:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Glacier Tech Charger",
    category: "electronics",
    price: 79.0,
    description:
      "Rapid 65W USB-C charger with compact form and intelligent power delivery.",
    lifestyleImageUrl:
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Aperture Camera Strap",
    category: "electronics",
    price: 45.0,
    description:
      "Soft, durable nylon strap with quick-release hardware and minimalist aesthetic.",
    lifestyleImageUrl:
      "https://images.unsplash.com/photo-1620403130413-57cc97d84897?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Horizon Mechanical Keyboard",
    category: "electronics",
    price: 159.0,
    description:
      "Compact 65% wireless keyboard with hot-swappable linear switches and RGB backlighting.",
    lifestyleImageUrl:
      "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=1200&q=80",
  },

  // --- HOME ---
  {
    name: "Forma Minimal Lamp",
    category: "home",
    price: 179.0,
    description:
      "Sculptural LED lamp in matte ceramic finish, warm dimmable light for serene interiors.",
    lifestyleImageUrl:
      "https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Lumen Desk Organizer",
    category: "home",
    price: 59.0,
    description:
      "Modular desk organizer in soft-touch finish to keep essentials tidy.",
    lifestyleImageUrl:
      "https://images.unsplash.com/photo-1591129841117-3adfd313e34f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Nimbus Travel Mug",
    category: "home",
    price: 39.5,
    description:
      "Double-walled thermal travel mug with vacuum insulation and slate finish.",
    lifestyleImageUrl:
      "https://images.unsplash.com/photo-1577937927133-66ef06ac9f5a?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Cedar & Moss Candle",
    category: "home",
    price: 32.0,
    description:
      "Hand-poured soy wax candle with notes of smoked wood and fresh forest greens.",
    lifestyleImageUrl:
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Dune Linen Throw",
    category: "home",
    price: 85.0,
    description: "Breathable waffle-weave linen throw in a natural oat shade.",
    lifestyleImageUrl:
      "https://images.unsplash.com/photo-1616627547584-bf28cee262db?auto=format&fit=crop&w=1200&q=80",
  },

  // --- BEAUTY ---
  {
    name: "Silkora Night Serum",
    category: "beauty",
    price: 89.0,
    description:
      "Lightweight hyaluronic serum for plump, dewy skin — formulated with vitamin C.",
    lifestyleImageUrl:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Pure Mist Facial Toner",
    category: "beauty",
    price: 24.0,
    description:
      "Refreshing rose water and witch hazel mist to balance and hydrate.",
    lifestyleImageUrl:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Charcoal Detox Mask",
    category: "beauty",
    price: 45.0,
    description:
      "Deep-cleansing clay mask designed to minimize pores and brighten complexion.",
    lifestyleImageUrl:
      "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=1200&q=80",
  },

  // --- FASHION ---
  {
    name: "Arc Slim Wallet",
    category: "fashion",
    price: 69.0,
    description:
      "Minimal grain leather wallet with RFID protection and 6-card capacity.",
    lifestyleImageUrl:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Velvet Matte Sneakers",
    category: "fashion",
    price: 199.0,
    description:
      "Low-profile tonal sneakers with soft calfskin leather and supportive midsoles.",
    lifestyleImageUrl:
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Nova Essential Tote",
    category: "fashion",
    price: 120.0,
    description:
      "Heavy-duty 18oz canvas tote with internal laptop sleeve and leather handles.",
    lifestyleImageUrl:
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Solaris Sunglasses",
    category: "fashion",
    price: 145.0,
    description:
      "Polarized lenses with hand-polished acetate frames in tortoise shell finish.",
    lifestyleImageUrl:
      "https://images.unsplash.com/photo-1511499767390-90342f568952?auto=format&fit=crop&w=1200&q=80",
  },

  // --- SPORTS ---
  {
    name: "Elevate Yoga Mat",
    category: "sports",
    price: 119.0,
    description:
      "Textured non-slip biodegradable mat with premium 5mm cushioning.",
    lifestyleImageUrl:
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Velocity Jump Rope",
    category: "sports",
    price: 28.0,
    description:
      "Weighted steel cable jump rope with ball-bearing handles for cardio training.",
    lifestyleImageUrl:
      "https://images.unsplash.com/photo-1544033527-b192daee1f5b?auto=format&fit=crop&w=1200&q=80",
  },

  // --- OTHER ---
  {
    name: "Onyx Fountain Pen",
    category: "other",
    price: 88.0,
    description:
      "Precision engineered metal body fountain pen with iridium nib.",
    lifestyleImageUrl:
      "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Voyager Sketchbook",
    category: "other",
    price: 34.0,
    description:
      "Hardbound cloth-covered book with 160gsm acid-free paper for mixed media.",
    lifestyleImageUrl:
      "https://images.unsplash.com/photo-1586075010620-2254b892253d?auto=format&fit=crop&w=1200&q=80",
  },
];

const seedDB = async () => {
  try {
    // 1. Clear existing data
    await Product.deleteMany({});
    console.log("Cleared old products...");

    // 2. Ensure Admin User
    let adminUser = await User.findOne({ username: "admin" });
    if (!adminUser) {
      console.log("Creating admin user...");
      const newAdmin = new User({
        username: "admin",
        email: "admin@nova.test",
      });
      adminUser = await User.register(newAdmin, "password");
    }

    // 3. Map Sample Data
    const productsWithSellers = sampleProducts.map((p) => ({
      title: p.name,
      description: p.description,
      price: p.price,
      category: p.category,
      images: [
        {
          url: p.lifestyleImageUrl,
          filename: `nova/${p.name.toLowerCase().replace(/\s+/g, "-")}`,
        },
      ],
      seller: adminUser._id,
      stockCount: Math.floor(Math.random() * 50) + 10, // Random stock 10-60
      rating: (Math.random() * (5 - 4) + 4).toFixed(1), // Random rating 4.0-5.0
    }));

    await Product.insertMany(productsWithSellers);
    console.log(`Database seeded with ${productsWithSellers.length} products!`);
  } catch (e) {
    console.error(e);
  } finally {
    mongoose.connection.close();
  }
};

seedDB();
