import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./ThankYou.css";

const ThankYou = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="thank-you-page">
      <div className="checkmark-container">
        <svg className="circle-svg" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" className="circle" />
        </svg>
        <div className="checkmark">
          {/* Dấu tích sẽ được hoàn thiện từ từ nhờ CSS animation */}
        </div>
      </div>
      <div className="thank-you-message">
        <h1>Cảm ơn bạn đã đặt hàng!</h1>
        <p>Đơn hàng của bạn đã được xác nhận và chúng tôi sẽ sớm giao hàng.</p>
      </div>
      
      <motion.button
        className="back-home-button"
        onClick={handleBackToHome}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.3 }}
      >
        Về trang chủ
      </motion.button>
    </div>
  );
};

export default ThankYou;
