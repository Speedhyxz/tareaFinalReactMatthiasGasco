import React from "react";
import Item from "../Item/Item";
import "./ItemList.css"; 

const ItemList = ({ items }) => {
  return (
    <div className="item-list">
      {items.map((prod) => (
        <Item
          key={prod.id}
          id={prod.id}
          name={prod.name}
          price={prod.price}
          stock={prod.stock}
          image={prod.image}
          description={prod.description}
        />
      ))}
    </div>
    
  );
};

export default ItemList;
