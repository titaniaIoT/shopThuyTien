import React, { useState } from 'react';
import './Popup.css';

const Popup = ({ OnClose, OnConfirm, ProductType }) => {
  const [Quantity, SetQuantity] = useState(1);
  const [Notes, SetNotes] = useState('');
  const [CustomerName, SetCustomerName] = useState('');

  const HandleChangeQuantity = (event) => {
    SetQuantity(parseInt(event.target.value, 10));
  };

  const HandleChangeNotes = (event) => {
    SetNotes(event.target.value);
  };

  const HandleChangeCustomerName = (event) => {
    SetCustomerName(event.target.value);
  };

  const HandleConfirm = () => {
    OnConfirm(Quantity, Notes, CustomerName, ProductType);
    OnClose();
  };

  return (
    <div className="Popup">
      <div className="PopupInner">
        <h2>Nhập số lượng:</h2>
        <input type="number" value={Quantity} onChange={HandleChangeQuantity} />

        <h2>Ghi chú:</h2>
        <input
          type="text"
          value={Notes}
          onChange={HandleChangeNotes}
          placeholder="Ghi chú: ít đá, ít đường,..."
        />

        <h2>Tên khách:</h2>
        <input
          type="text"
          value={CustomerName}
          onChange={HandleChangeCustomerName}
          placeholder="Tên khách hàng"
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
