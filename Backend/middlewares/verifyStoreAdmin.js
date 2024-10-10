const UserStore = require("../Models/user.model");
const Store = require("../Models/store.model");

checkStoreAdmin = async (req, res, next) => {
  try {
    // ค้นหาผู้ใช้ตาม ID ที่ให้มาใน req.body
    await UserStore.findOne({
      where: {
        id: req.body.userId, // ใช้ userId จาก body
      },
    });

    // ตรวจสอบว่าพบผู้ใช้หรือไม่
    if (!user) {
      return res.status(400).send({ message: "Failed! User is not found." });
    }

    // หากพบผู้ใช้ให้ไปยัง middleware ถัดไป
    next();
  } catch (error) {
    // จัดการข้อผิดพลาด
    return res.status(500).send({ message: "Internal server error" });
  }
};

module.exports = checkStoreAdmin;
