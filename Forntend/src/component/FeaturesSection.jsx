import React from "react";

const FeaturesSection = () => {
  return (
    <section id="features" className="features py-16 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-3xl text-center font-bold mb-8">คุณสมบัติ</h2>
        <div className="flex flex-wrap justify-center">
          {/* Feature Item 1 */}
          <div className="feature-item p-4 w-full sm:w-1/2 lg:w-1/3">
            <img
              src="https://png.pngtree.com/png-vector/20190130/ourmid/pngtree-simple-style-supermarket-store-elements-store-png-image_595808.jpg"
              alt="การจัดการหาร้านค้าใกล้เคียง"
              className="w-full h-48 object-cover mb-4"
            />
            <h3 className="text-xl font-bold">การหาร้านค้าที่ใกล้เคียงอย่างง่ายดาย</h3>
            <p>ติดตามและจัดการสินค้าคุณแบบเรียลไทม์</p>
          </div>
          {/* Feature Item 2 */}
          <div className="feature-item p-4 w-full sm:w-1/2 lg:w-1/3">
            <img
              src="https://www.sapogo.com/Upload/FileImage/2021/3/1500a66ef9eeab1c38768a0aa89aeee7.jpg"
              alt="การติดตามการขาย"
              className="w-full h-48 object-cover mb-4"
            />
            <h3 className="text-xl font-bold">การติดตามการขาย</h3>
            <p>ตรวจสอบยอดขายและวิเคราะห์ประสิทธิภาพ</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
