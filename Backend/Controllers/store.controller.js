const Store = require("../Models/store.model");
const { Op } = require("sequelize");
const { where } = require("sequelize");

// Create and Save a new store
exports.create = (req, res) => {
  const { storeName, address, lat, lng, deliveryRadius } = req.body;
  const userId = req.userId; // ดึง userId จาก token ที่ middleware verifyToken ได้ตรวจสอบแล้ว

  // Validate request
  if (!storeName || !address || !lat || !lng || !deliveryRadius) {
    return res.status(400).send({
      message:
        "All fields (storeName, address, lat, lng, deliveryRadius) are required!",
    });
  }

  // Get userId from authenticated user (token)
  

  // Check if store already exists
  Store.findOne({ where: { storeName } })
    .then((existingStore) => {
      if (existingStore) {
        return res.status(400).send({
          message: "Store already exists!",
        });
      }
      // Create a store if it doesn't exist
      const newStore = {
        storeName,
        address,
        lat,
        lng,
        deliveryRadius,
        userId, // ใช้ userId จาก token
      };

      return Store.create(newStore);
    })
    .then((store) => {
      res.send(store);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Some error occurred while creating the store.",
      });
    });
};

// Get all stores
exports.getAll = (req, res) => {
  Store.findAll()
    .then((stores) => {
      res.send(stores);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Some error occurred while retrieving stores.",
      });
    });
};

// Get a store by ID
exports.getById = (req, res) => {
  const id = req.params.id;

  Store.findByPk(id)
    .then((store) => {
      if (!store) {
        return res.status(404).send({
          message: `Store not found with id ${id}`,
        });
      }
      res.send(store);
    })
    .catch((error) => {
      res.status(500).send({
        message: error.message || `Error retrieving store with id ${id}`,
      });
    });
};



// Update a store by ID
exports.update = async (req, res) => {
  const id = req.params.id;  // ดึง storeId จาก URL
  const userId = req.userId;
 


  try {
    // ค้นหาว่าร้านที่ต้องการแก้ไขเป็นของผู้ใช้ที่ล็อกอินอยู่หรือไม่
    const store = await Store.findOne({ where: { id: id, userId: userId} });
    if (!store) {
      return res.status(404).send({
        message: `Store not found or you don't have permission to update this store.`,
      });
    }

    // ตรวจสอบว่ามีชื่อร้านที่ซ้ำกับร้านอื่นหรือไม่ (ไม่รวมร้านปัจจุบัน)
    const storeWithSameName = await Store.findOne({
      where: {
        storeName: req.body.storeName,
        id: { [Op.ne]: id }, // เช็คชื่อร้านที่ไม่ใช่ร้านนี้
      },
    });

    if (storeWithSameName) {
      return res.status(400).send({
        message: "Store name already exists. Please choose a different name.",
      });
    }

    // อัปเดตร้านค้าด้วยข้อมูลที่ส่งมา
    const updated = await Store.update(req.body, { where: { id: id } });

    if (updated[0] === 1) {
      const updatedStore = await Store.findByPk(id);
      res.send(updatedStore); // ส่งข้อมูลร้านที่อัปเดตแล้วกลับไป
    } else {
      res.status(404).send({
        message: `Store not found with id ${id}`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || `Error updating store with id ${id}`,
    });
  }
};


// Delete a store by ID
exports.delete = (req, res) => {
  const id = req.params.id;
  const userId = req.userId;

  Store.destroy({
    where: { id: id, userId: userId, },
  })
    .then((deleted) => {
      if (deleted) {
        return res.send({
          message: "Store was deleted successfully!",
        });
      }
      res.status(404).send({
        message: `Store not found with id ${id}`,
      });
    })
    .catch((error) => {
      res.status(500).send({
        message: error.message || `Could not delete store with id ${id}`,
      });
    });
};
