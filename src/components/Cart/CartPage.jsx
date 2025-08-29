import React, { useState } from "react";
import { useCart } from "./CartContext";
import CheckoutForm from "../CheckoutForm/CheckoutForm";

const CartPage = () => {
  const { cart, removeFromCart, clearCart, totalPrice } = useCart();
  const [checkout, setCheckout] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Tu carrito está vacío 😢</h2>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Carrito de compras</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">Producto</th>
            <th className="p-2">Precio</th>
            <th className="p-2">Cantidad</th>
            <th className="p-2">Subtotal</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.id} className="border-b">
              <td className="p-2 flex items-center gap-2">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 object-cover"
                />
                {item.name}
              </td>
              <td className="p-2">${item.price}</td>
              <td className="p-2">{item.quantity}</td>
              <td className="p-2">${item.price * item.quantity}</td>
              <td className="p-2">
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-6 flex justify-between items-center">
        <button
          onClick={clearCart}
          className="bg-gray-700 text-white px-4 py-2 rounded"
        >
          Vaciar carrito
        </button>
        <h3 className="text-xl font-bold">Total: ${totalPrice()}</h3>
      </div>

      {}
      <div className="mt-6 text-right">
        {!checkout ? (
          <button
            onClick={() => setCheckout(true)}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Pagar
          </button>
        ) : (
          <CheckoutForm />
        )}
      </div>
    </div>
  );
};

export default CartPage;
