import React from 'react';
import './DetailPopup.css'; // File CSS để thiết kế popup

const DetailPopup = ({ DetailData, OnClose }) => {
  return (
    <div className="Detail">
      <div className="DetailContent">
        <h3>Chi tiết đơn hàng</h3>
        <table>
          <tbody>
            {Object.entries(DetailData).map(([key, value]) => (
              <tr key={key}>
                <td>{key}</td>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={OnClose}>Đóng</button>
      </div>
    </div>
  );
};

export default DetailPopup;
