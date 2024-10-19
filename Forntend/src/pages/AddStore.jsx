import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AuthService from "../services/Store.services"; // เปลี่ยนให้ตรงกับบริการ API ของคุณ

const AddStore = () => {
  const [store, setStore] = useState({
    userId: "", // สมมติว่าคุณมีการระบุ userId
    storeName: "",
    address: "",
    lat: "",
    lng: "",
    deliveryRadius: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setStore({ ...store, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // ป้องกันการรีเฟรชหน้า
    try {
      const response = await AuthService.createStore(store); // เรียกใช้บริการเพิ่มร้านค้า
      console.log("API response:", response); // ตรวจสอบข้อมูลที่ตอบกลับ
      console.log("Status:", response.status); // ตรวจสอบสถานะการตอบกลับ

      if (response.status === 200 || response.status === 201) {
        Swal.fire({
          title: "Store Added",
          text: "Your store has been added successfully!",
          icon: "success",
        });
        navigate("/Home"); // นำทางไปยังหน้าที่แสดงร้านค้าหรือหน้าที่ต้องการ
      }
    } catch (error) {
      console.log("Error:", error); // ตรวจสอบข้อผิดพลาด
      Swal.fire({
        title: "Error",
        text: error.response?.data?.message || "Error adding store",
        icon: "error",
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#E8F7E9] to-[#C2EBC3]">
      <div className="card bg-white shadow-xl rounded-lg w-full max-w-md p-6">
        <div className="card-body">
          <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
            Add Store
          </h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <label className="block text-gray-700 font-semibold">
              Store Name
              <input
                type="text"
                className="block w-full mt-1 px-4 py-2 border border-gray-300 rounded-md bg-[#F0FAF2] focus:outline-none focus:ring-2 focus:ring-[#86D293]"
                placeholder="Enter store name"
                name="storeName"
                value={store.storeName}
                onChange={handleChange}
                required
              />
            </label>

            <label className="block text-gray-700 font-semibold">
              Address
              <input
                type="text"
                className="block w-full mt-1 px-4 py-2 border border-gray-300 rounded-md bg-[#F0FAF2] focus:outline-none focus:ring-2 focus:ring-[#86D293]"
                placeholder="Enter address"
                name="address"
                value={store.address}
                onChange={handleChange}
                required
              />
            </label>

            <label className="block text-gray-700 font-semibold">
              Latitude
              <input
                type="number"
                className="block w-full mt-1 px-4 py-2 border border-gray-300 rounded-md bg-[#F0FAF2] focus:outline-none focus:ring-2 focus:ring-[#86D293]"
                placeholder="Enter latitude"
                name="lat"
                value={store.lat}
                onChange={handleChange}
                required
              />
            </label>

            <label className="block text-gray-700 font-semibold">
              Longitude
              <input
                type="number"
                className="block w-full mt-1 px-4 py-2 border border-gray-300 rounded-md bg-[#F0FAF2] focus:outline-none focus:ring-2 focus:ring-[#86D293]"
                placeholder="Enter longitude"
                name="lng"
                value={store.lng}
                onChange={handleChange}
                required
              />
            </label>

            <label className="block text-gray-700 font-semibold">
              Delivery Radius (in km)
              <input
                type="number"
                className="block w-full mt-1 px-4 py-2 border border-gray-300 rounded-md bg-[#F0FAF2] focus:outline-none focus:ring-2 focus:ring-[#86D293]"
                placeholder="Enter delivery radius"
                name="deliveryRadius"
                value={store.deliveryRadius}
                onChange={handleChange}
                required
              />
            </label>

            <div className="text-center space-x-4 mt-6">
              <button
                type="submit"
                className="btn bg-[#86D293] text-white px-4 py-2 rounded-md hover:bg-[#79B783] transition"
              >
                Add Store
              </button>
              <button
                type="button"
                className="btn bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                onClick={() => navigate("/Home")}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddStore;
