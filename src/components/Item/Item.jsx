import { Link } from "react-router";
import React from "react";
import { useCart } from "../Cart/CartContext";
import "./Item.css";

const Item = ({ id, name, price, stock, image, description }) => {
  const { addToCart } = useCart();

  return (
    <div className="item-card">
      <img src={image} alt={name} className="item-image" />
      <h4>{name}</h4>
      <p>{description}</p>
      <p>
        <strong>${price}</strong>
      </p>
      <p>Stock: {stock}</p>

      <Link to={`/item/${id}`}>
        <button className="btn btn-primary">Ver más</button>
      </Link>

      <button
        className="btn btn-success"
        onClick={() => addToCart({ id, name, price, image }, 1)}
      >
        Agregar al carrito
      </button>
    </div>
  );
};

export default Item;
