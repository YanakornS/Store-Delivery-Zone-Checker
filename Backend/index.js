const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const app = express();
const authRouter = require("./routers/auth.router");
const StoreRouter = require("./routers/store.router");

const db = require("./Models");
const role = db.Role;

require("dotenv").config();

//Dev model
// db.sequelize.sync({ force: true }).then(() => {
//   initRole();
//   console.log("Drop and Sync DB");
// });

// ใช้ environment variable
const frontend_url = process.env.FRONTEND_URL || "http://localhost:5173";

// ตั้งค่า CORS ให้ยอมรับ frontend URL
const corsOptions = {
  origin: frontend_url, // อนุญาตเฉพาะ origin ของ frontend
};

const initRole = () => {
  role.create({ id: 1, name: "user" });
  role.create({ id: 2, name: "admin" });
};

//use middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

//use routers
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/store", StoreRouter);

// ข้อมูลตัวอย่างสำหรับ stores
const stores = require("./stores");

app.get("/api/stores", (req, res) => {
  res.json(stores);
});

app.get("/", (req, res) => {
  res.send("<h1>Welcome to API For Store Delivery Zone Checker</h1>");
});

app.listen(PORT, () => {
  console.log("Listening to http://localhost:" + PORT);
});
