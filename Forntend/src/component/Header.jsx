import React from "react";
import deliveryman from "../assets/deliveryman.png";

const Header = () => {
  return (
    <div className="flex items-center"> {/* ใช้ Flexbox และจัดให้อยู่ตรงกลาง */}
      <img
        src={deliveryman}
        className="w-14 h-12 mr-1" // ปรับขนาดรูปภาพ และเพิ่มระยะห่างขวา
        alt="Delivery Icon"
      />
      <p className="text-3xl font-bold font-semibold ">Delivery Zone</p> {/* ข้อความใหญ่และชัดเจน */}
    </div>
  );
};

export default Header;
