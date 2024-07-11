import React from 'react';
import './OrderPopup.css';

const OrderPopup = ({ OrderData, onClose }) => {
  const aggregatedOrdersEmptyNotes = {};
  const aggregatedOrdersNonEmptyNotes = {};

  OrderData.forEach(Order => {
    Object.entries(Order.data).forEach(([CustomerName, Products]) => {
      let productMap = {}; 

      Object.entries(Products).forEach(([key, value]) => {
        if (key === 'Ghi chú') {
          productMap[key] = value; 
        } else {
          if (productMap[key]) {
            productMap[key] += value;
          } else {
            productMap[key] = value;
          }
        }
      });

      if (productMap['Ghi chú'] === '') {
        Object.entries(productMap).forEach(([key, value]) => {
          if (key !== 'Ghi chú') {
            const productKey = `${key}-${CustomerName}`;
            if (key in aggregatedOrdersEmptyNotes) {
              aggregatedOrdersEmptyNotes[key].Quantity += value;
            } else {
              aggregatedOrdersEmptyNotes[key] = {
                ProductName: key,
                Quantity: value,
                Notes: Products['Ghi chú'] || '',
              };
            }
          }
        });
      } else {
        Object.entries(productMap).forEach(([key, value]) => {
          if (key !== 'Ghi chú') {
            const productKey = `${key}-${CustomerName}`;
            if (aggregatedOrdersNonEmptyNotes[productKey]) {
              aggregatedOrdersNonEmptyNotes[productKey].Quantity += value;
            } else {
              aggregatedOrdersNonEmptyNotes[productKey] = {
                ProductName: key,
                Quantity: value,
                Notes: Products['Ghi chú'] || '',
              };
            }
          }
        });
      }
    });
  });

  const HandleCopyOrder = () => {
    const combinedOrders = { ...aggregatedOrdersEmptyNotes, ...aggregatedOrdersNonEmptyNotes };

    const OrderText = Object.values(combinedOrders)
      .map(item => `${item.Quantity} ${item.ProductName} ${item.Notes}`)
      .join('\n');
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
          {Object.values(aggregatedOrdersEmptyNotes).map((item, index) => (
            <div key={index} className="OrderItem">
              <p>{item.Quantity} {item.ProductName} {item.Notes}</p>
            </div>
          ))}
          {Object.values(aggregatedOrdersNonEmptyNotes).map((item, index) => (
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
