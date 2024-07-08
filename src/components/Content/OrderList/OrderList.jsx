import React, { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc, deleteField } from 'firebase/firestore';
import db from '../../../../FirebaseConfig';
import ConfirmModel from './ModelConfirm/ModelConfirm';
import OrderPopup from './OrderPopup/OrderPopup';
import DetailPopup from './DetailPopup/DetailPopup';
import './OrderList.css';

function OrderList() {
  const [DrinksOrders, SetDrinksOrders] = useState({});
  const [FoodOrders, SetFoodOrders] = useState({});
  const [IsLoading, SetLoading] = useState(true);
  const [ShowModel, SetShowModel] = useState(false);
  const [PendingDeletion, SetPendingDeletion] = useState({ Category: '', ProductId: '' });
  const [DetailData, SetDetailData] = useState({});
  const [ShowDetailPopup, SetShowDetailPopup] = useState(false);
  const [ShowOrderPopup, SetShowOrderPopup] = useState(false); 
  const [OrderData, SetOrderData] = useState([]); 
  const [ShowConfirmOrder, SetShowConfirmOrder] = useState(false); 

  useEffect(() => {
    const FetchOrders = async () => {
      try {
        const DrinksDocRef = doc(db, 'Drinks', 'j87KIkRo8LkfOyzUHzHx');
        const DrinksDocSnap = await getDoc(DrinksDocRef);
        if (DrinksDocSnap.exists()) {
          SetDrinksOrders(DrinksDocSnap.data());
        } else {
          console.log('Không có dữ liệu trong Drinks!');
        }

        const FoodDocRef = doc(db, 'Food', '1Z7eiC4N3V15ggqyx51i');
        const FoodDocSnap = await getDoc(FoodDocRef);
        if (FoodDocSnap.exists()) {
          SetFoodOrders(FoodDocSnap.data());
        } else {
          console.log('Không có dữ liệu trong Food!');
        }
        SetLoading(false);

      } catch (error) {
        console.error('Lỗi fetching đơn hàng:', error);
        SetLoading(false);
      }
    };
    FetchOrders();
  }, []);

  const HandleUpdateQuantity = async (Category, ProductId, NewQuantity) => {
    try {
      const DocRef = doc(db, Category, Category === 'Drinks' ? 'j87KIkRo8LkfOyzUHzHx' : '1Z7eiC4N3V15ggqyx51i');
      const DocSnap = await getDoc(DocRef);

      if (DocSnap.exists()) {
        const FieldToUpdate = {};
        if (NewQuantity > 0) {
          FieldToUpdate[ProductId] = NewQuantity;
        } else {
          FieldToUpdate[ProductId] = deleteField();
        }
        await updateDoc(DocRef, FieldToUpdate);
        console.log(`Đã cập nhật số lượng của ${ProductId} thành ${NewQuantity}`);

        if (Category === 'Drinks') {
          SetDrinksOrders(PrevState => {
            const NewState = { ...PrevState };
            if (NewQuantity > 0) {
              NewState[ProductId] = NewQuantity;
            } else {
              delete NewState[ProductId];
            }
            return NewState;
          });
        } else if (Category === 'Food') {
          SetFoodOrders(PrevState => {
            const NewState = { ...PrevState };
            if (NewQuantity > 0) {
              NewState[ProductId] = NewQuantity;
            } else {
              delete NewState[ProductId];
            }
            return NewState;
          });
        }
      } else {
        console.error(`Tài liệu trong ${Category} với ID ${DocRef.id} không tồn tại.`);
      }
    } catch (error) {
      console.error('Lỗi cập nhật số lượng: ', error);
    }
  };

  const HandleIncrement = (Category, ProductId) => {
    const CurrentQuantity = Category === 'Drinks' ? DrinksOrders[ProductId] : FoodOrders[ProductId];
    const NewQuantity = CurrentQuantity + 1;
    HandleUpdateQuantity(Category, ProductId, NewQuantity);
  };

  const HandleDecrement = (Category, ProductId) => {
    const CurrentQuantity = Category === 'Drinks' ? DrinksOrders[ProductId] : FoodOrders[ProductId];
    if (CurrentQuantity > 0) {
      const NewQuantity = CurrentQuantity - 1;
      if (NewQuantity === 0) {
        SetPendingDeletion({ Category, ProductId });
        SetShowModel(true);
      } else {
        HandleUpdateQuantity(Category, ProductId, NewQuantity);
      }
    }
  };

  const HandleConfirmDelete = () => {
    HandleUpdateQuantity(PendingDeletion.Category, PendingDeletion.ProductId, 0);
    SetShowModel(false);
  };

  const HandleCancelDelete = () => {
    SetShowModel(false);
  };

  const HandleDetailOrder = async () => {
    try {
      const DataDocRef = doc(db, 'DetailData', 'SNGgldvvjQNgkhXoQj86');
      const DataDocSnap = await getDoc(DataDocRef);
      if (DataDocSnap.exists()) {
        SetDetailData(DataDocSnap.data());
        SetShowDetailPopup(true);
      } else {
        console.log('Không có dữ liệu trong DetailData!');
      }
    } catch (error) {
      console.error('Lỗi fetching dữ liệu:', error);
    }
  };

  const HandleCloseDetailPopup = () => {
    SetShowDetailPopup(false);
  };

  const HandleOpenOrderPopup = () => {
    const DrinksOrderItems = Object.entries(DrinksOrders).map(([productName, quantity]) => ({
      productName,
      quantity,
    }));
    const FoodOrderItems = Object.entries(FoodOrders).map(([productName, quantity]) => ({
      productName,
      quantity,
    }));
    const OrderData = [...DrinksOrderItems, ...FoodOrderItems];

    SetOrderData(OrderData);
    SetShowOrderPopup(true);
  };

  const HandleCloseOrderPopup = () => {
    SetShowOrderPopup(false);
  };

  const HandleConfirmOrder = async () => {
    try {
      const DetailDocRef = doc(db, 'DetailData', 'SNGgldvvjQNgkhXoQj86');
      const DrinksDocRef = doc(db, 'Drinks', 'j87KIkRo8LkfOyzUHzHx');
      const FoodDocRef = doc(db, 'Food', '1Z7eiC4N3V15ggqyx51i');

      await updateDoc(DetailDocRef, { ...Object.keys(DetailData).reduce((acc, key) => ({ ...acc, [key]: deleteField() }), {}) });
      await updateDoc(DrinksDocRef, { ...Object.keys(DrinksOrders).reduce((acc, key) => ({ ...acc, [key]: deleteField() }), {}) });
      await updateDoc(FoodDocRef, { ...Object.keys(FoodOrders).reduce((acc, key) => ({ ...acc, [key]: deleteField() }), {}) });

      SetDrinksOrders({});
      SetFoodOrders({});
      SetOrderData({});
      SetShowConfirmOrder(false);
    } catch (error) {
      console.error('Error confirming order:', error);
    }
  };

  const HandleCancelConfirmOrder = () => {
    SetShowConfirmOrder(false);
  };

  if (IsLoading) {
    return <p className='Loading'>Loading...</p>;
  }

  return (
    <div className="OrderList">
      <h2>Danh sách đơn hàng</h2>
      <div className="TableOrder">
        <table>
          <thead>
            <tr>
              <th>Tên sản phẩm</th>
              <th>Số lượng</th>
            </tr>
          </thead>
          <tbody>

            {Object.entries(DrinksOrders).map(([key, value]) => (
              <tr key={key}>
                <td>{key}</td>
                <td>
                  <button onClick={() => HandleDecrement('Drinks', key)}>-</button>
                  <span>{value}</span>
                  <button onClick={() => HandleIncrement('Drinks', key)}>+</button>
                </td>
              </tr>
            ))}

            {Object.entries(FoodOrders).map(([key, value]) => (
              <tr key={key}>
                <td>{key}</td>
                <td>
                  <button onClick={() => HandleDecrement('Food', key)}>-</button>
                  <span>{value}</span>
                  <button onClick={() => HandleIncrement('Food', key)}>+</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="ButtonOrder">
        <button onClick={HandleDetailOrder}>Chi tiết đơn hàng</button>
        <button onClick={HandleOpenOrderPopup}>In đơn hàng</button>
        <button onClick={() => SetShowConfirmOrder(true)}>Xác nhận đơn hàng</button>
      </div>
      {ShowModel && (
        <ConfirmModel
          Message="Bạn có chắc chắn muốn xóa sản phẩm này?"
          OnDeleteConfirm={HandleConfirmDelete}
          OnCancelDelete={HandleCancelDelete}
        />
      )}
      {ShowDetailPopup && (
        <DetailPopup
          DetailData={DetailData}
          OnClose={HandleCloseDetailPopup}
        />
      )}
      {ShowOrderPopup && (
        <>
          <OrderPopup
            OrderData={OrderData}
            onClose={HandleCloseOrderPopup}
          />
        </>
      )}
      {ShowConfirmOrder && (
        <ConfirmModel
          Message="Bạn có chắc chắn muốn xác nhận đơn hàng?"
          OnDeleteConfirm={HandleConfirmOrder}
          OnCancelDelete={HandleCancelConfirmOrder}
        />
      )}
    </div>
  );
}
export default OrderList;
