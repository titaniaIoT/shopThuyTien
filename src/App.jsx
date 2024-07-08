import React, { useState } from "react";
import Header from "./components/Header/Header";
import Content from "./components/Content/Content";
import Footer from "./components/Footer/Footer";
import OrderList from "./components/Content/OrderList/OrderList";

function App() {
  const [SelectedCategory, SetSelectedCategory] = useState("Thức uống");

  const HandleMenuChange = (Category) => {
    SetSelectedCategory(Category);
  };

  return (
    <div className="App">
      <Header ChangeMenu={HandleMenuChange} />
      {SelectedCategory === "Đơn hàng" ? (
        <OrderList />
      ) : (
        <Content Category={SelectedCategory} />
      )}
      <Footer />
    </div>
  );
}

export default App;
