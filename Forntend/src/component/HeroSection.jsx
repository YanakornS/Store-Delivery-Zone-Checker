
import React from "react";

const HeroSection = () => {
  return (
    <section
      className="hero bg-cover bg-center"
      style={{ backgroundImage: 'url("/hero-image.jpg")' }}
    >
      <div className="container mx-auto text-center py-16">
        <h1 className="text-4xl font-bold text-white">
          จัดการร้านของคุณได้อย่างง่ายดาย
        </h1>
        <p className="text-lg text-white mt-4">
          แพลตฟอร์มของเราช่วยให้คุณจัดการทุกอย่างได้ในที่เดียว ตั้งแต่สต็อกสินค้าไปจนถึงการขาย
        </p>
        <a href="/Register" className="btn btn-lg btn-success mt-6">
          เริ่มต้นใช้งานฟรี
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
