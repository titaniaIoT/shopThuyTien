import React from 'react';
import './OrderPopup.css';

const OrderPopup = ({ OrderData, onClose }) => {
  const FormattedOrderData = [];
  OrderData.forEach(Order => {
    Object.entries(Order.data).forEach(([CustomerName, Products]) => {
      Object.entries(Products).forEach(([ProductName, Quantity]) => {
        if (ProductName !== 'Ghi chú') {
          FormattedOrderData.push({
            CustomerName,
            ProductName,
            Quantity,
            Notes: Products['Ghi chú']
          });
        }
      });
    });
  });

  const HandleCopyOrder = () => {
    const OrderText = FormattedOrderData.map(item => `${item.Quantity} ${item.ProductName} ${item.Notes || ''}`).join('\n');
    navigator.clipboard.writeText(OrderText).then(() => {
      alert('Đơn hàng đã được sao chép!');
    }).catch(err => {
      console.error('Lỗi khi sao chép đơn hàng:', err);
    });
  };

  return (
    <div className="OrderPopupOverlay" onClick={onClose}>
      <div className="OrderPopup" onClick={e => e.stopPropagation()}>
        <h2>Tổng kết đơn hàng</h2>
        <div className="OrderItems">
          {FormattedOrderData.map((item, index) => (
            <div key={index} className="OrderItem">
              <p>{item.Quantity} {item.ProductName} {item.Notes}</p>
            </div>
          ))}
        </div>
        <div className="OrderPopupButtons">
          <button onClick={HandleCopyOrder}>Copy đơn hàng</button>
          <button onClick={onClose}>Đóng</button>
        </div>
      </div>
    </div>
  );
};

export default OrderPopup;
