import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, updateDoc, deleteDoc, deleteField } from 'firebase/firestore';
import db from '../../../../FirebaseConfig';
import OrderPopup from './OrderPopup/OrderPopup';
import ConfirmModel from './ModelConfirm/ModelConfirm';
import './OrderList.css';

function OrderList() {
  const [OrderData, SetOrderData] = useState([]);
  const [Loading, SetLoading] = useState(true);
  const [ShowOrderPopup, SetShowOrderPopup] = useState(false);
  const [ShowConfirmModel, SetShowConfirmModel] = useState(false);
  const [ShowOrderConfirmModel, SetShowOrderConfirmModel] = useState(false);
  const [CustomerToDelete, SetCustomerToDelete] = useState(null);
  const [OrderIdToDelete, SetOrderIdToDelete] = useState('hRZcMkkijPa1fw56o96l');

  useEffect(() => {
    const FetchOrders = async () => {
      try {
        const OrderCollectionRef = collection(db, 'Order');
        const Ordersnapshot = await getDocs(OrderCollectionRef);
        const Orders = Ordersnapshot.docs.map(doc => ({ id: doc.id, data: doc.data() }));
        SetOrderData(Orders);
        SetLoading(false);
      } catch (error) {
        console.error('Lỗi fetching đơn hàng:', error);
        SetLoading(false);
      }
    };
    FetchOrders();
  }, []);

  const HandlePrintOrder = () => {
    SetShowOrderPopup(true);
  };

  const HandleClosePopup = () => {
    SetShowOrderPopup(false);
  };

  const HandleConfirmOrder = () => {
    SetShowOrderConfirmModel(true);
  };

  const HandleDeleteConfirm = async () => {
    if (CustomerToDelete) {
      const { CustomerName, OrderId } = CustomerToDelete;
      const OrderRef = doc(db, 'Order', OrderId);
      try {
        await updateDoc(OrderRef, {
          [CustomerName]: deleteField(),
        });
        const UpdatedOrderData = OrderData.map(order => {
          if (order.id === OrderId && order.data[CustomerName]) {
            delete order.data[CustomerName];
          }
          return order;
        });
        SetOrderData(UpdatedOrderData);
        SetCustomerToDelete(null);
        SetShowConfirmModel(false);
      } catch (error) {
        console.error('Lỗi khi xóa khách hàng:', error);
      }
    }
  };

  const HandleOrderDeleteConfirm = async () => {
    const OrderRef = doc(db, 'Order', OrderIdToDelete);
    try {
      await deleteDoc(OrderRef);
      const UpdatedOrderData = OrderData.filter(order => order.id !== OrderIdToDelete);
      SetOrderData(UpdatedOrderData);
      SetOrderIdToDelete(null);
      SetShowOrderConfirmModel(false);
    } catch (error) {
      console.error('Lỗi khi xóa đơn hàng:', error);
    }
  };

  const HandleCancelDelete = () => {
    SetCustomerToDelete(null);
    SetShowConfirmModel(false);
    SetShowOrderConfirmModel(false);
  };

  const HandleIncrement = async (CustomerName, ProductName, OrderId) => {
    const UpdatedOrderData = OrderData.map(order => {
      if (order.id === OrderId && order.data[CustomerName]) {
        if (order.data[CustomerName][ProductName]) {
          order.data[CustomerName][ProductName] += 1;
        }
      }
      return order;
    });
    SetOrderData(UpdatedOrderData);
    await updateDoc(doc(db, 'Order', OrderId), {
      [`${CustomerName}.${ProductName}`]: UpdatedOrderData.find(order => order.id === OrderId).data[CustomerName][ProductName]
    });
  };

  const HandleDecrement = (CustomerName, ProductName, OrderId) => {
    const order = OrderData.find(order => order.id === OrderId && order.data[CustomerName]);
    if (order && order.data[CustomerName][ProductName] === 1) {
      SetCustomerToDelete({ CustomerName, OrderId });
      SetShowConfirmModel(true);
    } else {
      const UpdatedOrderData = OrderData.map(order => {
        if (order.id === OrderId && order.data[CustomerName] && order.data[CustomerName][ProductName] > 1) {
          order.data[CustomerName][ProductName] -= 1;
        }
        return order;
      });
      SetOrderData(UpdatedOrderData);
      updateDoc(doc(db, 'Order', OrderId), {
        [`${CustomerName}.${ProductName}`]: UpdatedOrderData.find(order => order.id === OrderId).data[CustomerName][ProductName]
      });
    }
  };

  if (Loading) {
    return <p className='Loading'>Đang tải...</p>;
  }

  return (
    <div className="OrderList">
      <h2>Danh sách đơn hàng</h2>
      <div className="TableOrder">
        <table>
          <thead>
            <tr>
              <th>Tên khách hàng</th>
              <th>Tên sản phẩm</th>
              <th>Số lượng</th>
              <th>Ghi chú</th>
            </tr>
          </thead>
          <tbody>
            {OrderData.map((Order, OrderIndex) => (
              Object.entries(Order.data).map(([CustomerName, Products]) => (
                Object.entries(Products).filter(([key]) => key !== 'Ghi chú').map(([ProductName, Quantity], ProductIndex) => (
                  <tr key={`${CustomerName}-${ProductName}-${OrderIndex}-${ProductIndex}`}>
                    <td>{CustomerName}</td>
                    <td>{ProductName}</td>
                    <td>
                      <button onClick={() => HandleDecrement(CustomerName, ProductName, Order.id)}>-</button>
                      <span>{Quantity}</span>
                      <button onClick={() => HandleIncrement(CustomerName, ProductName, Order.id)}>+</button>
                    </td>
                    <td>{Products['Ghi chú']}</td>
                  </tr>
                ))
              ))
            ))}
          </tbody>
        </table>
      </div>
      <div className="ButtonOrder">
        <button onClick={HandlePrintOrder}>In đơn hàng</button>
        <button onClick={HandleConfirmOrder}>Xác nhận đơn hàng</button>
      </div>
      {ShowOrderPopup && <OrderPopup OrderData={OrderData} onClose={HandleClosePopup} />}
      {ShowConfirmModel && (
        <ConfirmModel
          Message="Bạn có chắc chắn muốn xóa sản phẩm này không?"
          OnDeleteConfirm={HandleDeleteConfirm}
          OnCancelDelete={HandleCancelDelete}
        />
      )}
      {ShowOrderConfirmModel && (
        <ConfirmModel
          Message="Xác nhận đơn hàng đồng nghĩa với việc xóa toàn bộ dữ liệu của đơn hàng này, bạn chắc chắn?"
          OnDeleteConfirm={HandleOrderDeleteConfirm}
          OnCancelDelete={HandleCancelDelete}
        />
      )}
    </div>
  );
}

export default OrderList;
