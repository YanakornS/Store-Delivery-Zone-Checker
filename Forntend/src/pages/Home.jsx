// Home.jsx
import React from 'react';
import ComponentMap from '../component/ComponentMap'; // แก้ไขเส้นทางให้ถูกต้องตามโครงสร้างโฟลเดอร์ของคุณ
import Navbar from '../component/Nvabar';

const Home = () => {
  return (
    <div>
      
    {/* <Navbar/> */}
      <div className="mt-24"></div>
      <ComponentMap />
    </div>
  );
};

export default Home;
