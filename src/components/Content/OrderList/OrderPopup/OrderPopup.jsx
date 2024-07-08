import React from 'react';
import './OrderPopup.css';

const OrderPopup = ({ OrderData, onClose }) => {
  return (
    <div className="OrderPopupOverlay">
      <div className="OrderPopup">
        <h2>Tổng kết đơn hàng</h2>
        <div className="OrderItems">
          {OrderData.map((item, index) => (
            <div key={index} className="OrderItem">
              <p><strong>{item.productName}</strong>: {item.quantity}</p>
            </div>
          ))}
        </div>
        <div className="OrderPopupButtons">
          <button onClick={onClose}>Đóng</button>
        </div>
      </div>
    </div>
  );
};

export default OrderPopup;
