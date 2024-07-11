import { doc, setDoc } from 'firebase/firestore';
import db from '../../../../../FirebaseConfig';

const UpdateProductQuantity = async (ProductType, Quantity, CustomerName, Notes) => {
  const OrderRef = doc(db, "Order", "hRZcMkkijPa1fw56o96l");

  try {
    const orderData = {
      [CustomerName]: {
        [ProductType]: Quantity,
        "Ghi chú": Notes
      }
    };

    await setDoc(OrderRef, orderData, { merge: true });
    console.log('Cập nhật đơn hàng thành công!');
  } catch (error) {
    console.error('Lỗi khi cập nhật đơn hàng:', error);
  }
};

export { UpdateProductQuantity };
