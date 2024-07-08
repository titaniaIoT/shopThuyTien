import React, { useState } from 'react';
import './ProductItem.css';
import Popup from './Popup/Popup';
import { UpdateProductQuantity } from './Firestore/firestoreService';

function ProductItem({ Product, CollectionName, IDDoc }) {
  const { name, image, price } = Product;
  const [ShowPopup, SetShowPopup] = useState(false);

  const HandleBuyClick = () => {
    SetShowPopup(true);
  };

  const HandleClosePopup = () => {
    SetShowPopup(false);
  };

  const HandleConfirmPopup = (Quantity, Notes, CustomerName) => {
    console.log(`${CustomerName} mua ${Quantity} ${name} ${Notes}`);
    UpdateProductQuantity(CollectionName, IDDoc, name, Quantity,CustomerName,Notes);
    SetShowPopup(false);
  };

  return (
    <li className="ProductItem">
      <img src={image} alt="" />
      <div className="ProductInfo">
        <h3>{name}</h3>
        <p>{price}</p>
        <button onClick={HandleBuyClick}>Mua</button>
      </div>
      {ShowPopup && (
        <Popup OnClose={HandleClosePopup} OnConfirm={HandleConfirmPopup} />
      )}
    </li>
  );
}

export default ProductItem;
