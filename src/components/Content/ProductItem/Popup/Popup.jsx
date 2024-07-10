import React, { useState } from 'react';
import './Popup.css';

const Popup = ({ OnClose, OnConfirm, ProductType }) => {
  const [Quantity, SetQuantity] = useState(1);
  const [Notes, SetNotes] = useState('');
  const [CustomerName, SetCustomerName] = useState('');

  const HandleChangeQuantity = (event) => {
    const value = parseInt(event.target.value, 10);
    if (value > 0) {
      SetQuantity(value);
    }
  };

  const HandleChangeNotes = (event) => {
    SetNotes(event.target.value);
  };

  const HandleChangeCustomerName = (event) => {
    SetCustomerName(event.target.value);
  };

  const HandleConfirm = () => {
    if (CustomerName.trim() === '') {
      alert('Vui lòng nhập tên khách hàng');
      return;
    }
    OnConfirm(Quantity, Notes, CustomerName);
    OnClose();
  };

  return (
    <div className="PopupOverlay" onClick={OnClose}>
      <div className="PopupInner" onClick={(e) => e.stopPropagation()}>
        <h2>Nhập số lượng:</h2>
        <input
          type="number"
          value={Quantity}
          onChange={HandleChangeQuantity}
          min="1"
        />

        <h2>Ghi chú:</h2>
        <input
          type="text"
          value={Notes}
          onChange={HandleChangeNotes}
          placeholder="Ít đá, ít đường,..."
        />

        <h2>Tên khách:</h2>
        <input
          type="text"
          value={CustomerName}
          onChange={HandleChangeCustomerName}
          placeholder="Nhập tên khách hàng"
        />

        <div className="ButtonContainer">
          <button onClick={HandleConfirm}>Xác nhận</button>
          <button onClick={OnClose}>Đóng</button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
