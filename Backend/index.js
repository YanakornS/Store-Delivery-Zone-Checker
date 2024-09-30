const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const app = express();
require("dotenv").config();

// ใช้ environment variable
const frontend_url = process.env.FRONTEND_URL || "http://localhost:5173";

// ตั้งค่า CORS ให้ยอมรับ frontend URL
const corsOptions = {
  origin: frontend_url, // อนุญาตเฉพาะ origin ของ frontend
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // อนุญาตให้ส่ง credentials (เช่น cookies)
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

// ข้อมูลตัวอย่างสำหรับ stores
const stores = require("./stores");

app.get("/api/stores", (req, res) => {
  res.json(stores);
});

app.get("/", (req, res) => {
  res.send("<h1>Welcome to API For Store Delivery Zone Checker</h1>");
});

app.listen(PORT, () => {
  console.log(`Listening to http://localhost:${PORT}`);
});
