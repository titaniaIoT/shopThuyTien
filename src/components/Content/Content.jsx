import React from "react";
import "./Content.css";
import ProductList from "./ProductList/ProductList";

import Cafe from "../../assets/cafe.png";
import MilkCafe from "../../assets/milkcafe.png";
import PeachTea from "../../assets/peachtea.png";
import LycheeTea from "../../assets/lycheetea.png";
import FruitTea from "../../assets/fruittea.png";
import FruitPlate from "../../assets/fruitplate.png";
import Plan from "../../assets/plan.png";
import Orange from "../../assets/orange.png";
import FruitMix from "../../assets/fruitmix.png";
import Juice from "../../assets/juice.png";
import Soft from "../../assets/soft.png";
import Mia from "../../assets/mia.png";
import RauMa from "../../assets/rauma.png";
import CaDay from "../../assets/caday.png";
import CaVien from "../../assets/cavien.png";
import BoVien from "../../assets/bovien.png";
import TomVien from "../../assets/tomvien.png";
import TomONgon from "../../assets/tomongon.png";
import HotDog from "../../assets/hotdog.png";
import XucXich from "../../assets/xucxich.png";
import XucXichHoLo from "../../assets/xucxichholo.png";
import PhoMaiQue from "../../assets/phomaique.png";
import BanhTrang from "../../assets/banhtrang.png";
import RauMaDuong from "../../assets/raumaduong.png";

function Content({ Category }) {
  const Products = {
    beverages: [
      { id: 1, name: "Cà phê", image: Cafe, price: "10.000" },
      { id: 2, name: "Cà phê sữa", image: MilkCafe, price: "10.000 - 15.000" },
      { id: 3, name: "Trà đào", image: PeachTea, price: "20.000" },
      { id: 4, name: "Trà vải", image: LycheeTea, price: "20.000" },
      { id: 5, name: "Trà trái cây", image: FruitTea, price: "20.000" },
      { id: 6, name: "Trái cây dĩa", image: FruitPlate, price: "20.000" },
      { id: 7, name: "Bánh plan", image: Plan, price: "7.000" },
      { id: 8, name: "Cam ép", image: Orange, price: "15.000" },
      { id: 9, name: "Sinh tố", image: FruitMix, price: "20.000" },
      { id: 10, name: "Nước ép", image: Juice, price: "15.000 - 20.000" },
      { id: 11, name: "Nước ngọt", image: Soft, price: "10.000" },
      { id: 12, name: "Nước mía", image: Mia, price: "10.000" },
      { id: 13, name: "Rau má đậu xanh", image: RauMa, price: "15.000" },
      { id: 14, name: "Rau má đường", image: RauMaDuong, price: "10.000 - 15.000"}
    ],
    snacks: [
      { id: 15, name: "Cá dây", image: CaDay, price: "5.000" },
      { id: 16, name: "Cá viên", image: CaVien, price: "5.000" },
      { id: 17, name: "Bò viên", image: BoVien, price: "5.000" },
      { id: 18, name: "Tôm viên", image: TomVien, price: "5.000" },
      { id: 19, name: "Tôm ô ngon", image: TomONgon, price: "5.000" },
      { id: 20, name: "Hotdog", image: HotDog, price: "12.000" },
      { id: 21, name: "Xúc xích", image: XucXich, price: "10.000" },
      { id: 22, name: "Xúc xích hồ lô", image: XucXichHoLo, price: "5.000" },
      { id: 23, name: "Phô mai que", image: PhoMaiQue, price: "7.000" },
      { id: 24, name: "Bánh tráng", image: BanhTrang, price: "10.000" },
    ],
  };

  return (
    <div className="Content">
      {Category === "Thức uống" && <ProductList Category={Category} Products={Products.beverages} CollectionName="Drinks" IDDoc="j87KIkRo8LkfOyzUHzHx" />}
      {Category === "Đồ ăn vặt" && <ProductList Category={Category} Products={Products.snacks} CollectionName="Food" IDDoc="1Z7eiC4N3V15ggqyx51i" />}
    </div>
  );
}

export default Content;
