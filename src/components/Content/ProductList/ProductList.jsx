import React from "react";
import ProductItem from "../ProductItem/ProductItem";

function ProductList({ Products, CollectionName, IDDoc }) { 
  return (
    <div className="ProductList">
      <ul>
        {Products.map((Product) => (
          <ProductItem key={Product.id} Product={Product} CollectionName={CollectionName} IDDoc={IDDoc} />
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
