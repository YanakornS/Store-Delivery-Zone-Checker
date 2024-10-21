
import React from "react";

const TestimonialSection = () => {
  return (
    <section className="testimonials py-16">
      <div className="container mx-auto">
        <h2 className="text-3xl text-center font-bold mb-8">สิ่งที่ผู้ใช้ของเราพูดถึง</h2>
        <div className="flex flex-wrap justify-center">
          <div className="testimonial-item p-4">
            <p>
              "แพลตฟอร์มนี้ช่วยให้ฉันจัดการธุรกิจได้ง่ายขึ้นมาก แนะนำอย่างยิ่ง!"
            </p>
            <p>- จอห์น โด, เจ้าของร้าน</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
