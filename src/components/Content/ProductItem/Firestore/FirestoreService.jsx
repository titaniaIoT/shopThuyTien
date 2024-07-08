import { doc, getDoc, updateDoc } from 'firebase/firestore';
import db from '../../../../../FirebaseConfig';

const UpdateProductQuantity = async (CollectionName, IDDoc, ProductType, Quantity, CustomerName, Notes) => {
  const ProductRef = doc(db, CollectionName, IDDoc);
  const ProductSnap = await getDoc(ProductRef);

  if (ProductSnap.exists()) {
    const CurrentQuantity = ProductSnap.data()[ProductType] || 0;
    await updateDoc(ProductRef, {
      [ProductType]: CurrentQuantity + Quantity
    });
    console.log('Cập nhật đơn hàng thành công!');
  } else {
    console.log('Lỗi không tìm thấy collection hoặc document tương ứng!');
  }
  try {
    const DetailString = `${Quantity} ${ProductType} ${Notes}`;
    const DataRef = doc(db, "DetailData", "SNGgldvvjQNgkhXoQj86"); 
    await updateDoc(DataRef, { [CustomerName]: DetailString }); 
    console.log('Cập nhật chi tiết đơn hàng thành công!');
  } catch (error) {
    console.error('Lỗi khi cập nhật DetailData:', error);
  }
};

export { UpdateProductQuantity };
