import React from "react";
import "./Header.css";
import ShopLogo from "../../assets/shoplogo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faSearch, faUserCircle } from "@fortawesome/free-solid-svg-icons";

function Header({ ChangeMenu }) {
  const HandleClick = (Category) => { 
    ChangeMenu(Category);
  };

  return (
    <header className="AppHeader">
      <div className="LeftHeader">
        <img src={ShopLogo} alt="logo" className="Logo" />
        <h1>Titania</h1>
      </div>
      <nav className="Taskbar">
        <ul>
          <li>
            <a href="#!" onClick={() => HandleClick("Thức uống")}>ミ★ Thức uống ★彡</a>
          </li>
          <li>
            <a href="#!" onClick={() => HandleClick("Đồ ăn vặt")}>ミ★ Đồ ăn vặt ★彡</a>
          </li>
        </ul>
      </nav>
      <div className="RightHeader">
        <FontAwesomeIcon icon={faSearch} className="Icon" />
        <FontAwesomeIcon icon={faShoppingCart} className="Icon" onClick={() => HandleClick("Đơn hàng")} /> 
        <FontAwesomeIcon icon={faUserCircle} className="Icon" />
      </div>
    </header>
  );
}

export default Header;
