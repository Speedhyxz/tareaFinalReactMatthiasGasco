import React, { useState } from "react";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  writeBatch,
  getDoc,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useCart } from "../Cart/CartContext";

const CheckoutForm = () => {
  const { cart, totalPrice, clearCart } = useCart();

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
  });

  const [orderId, setOrderId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    if (!formData.nombre || !formData.email || !formData.telefono) {
      setErrorMsg("Por favor completa todos los campos");
      setLoading(false);
      return;
    }

    try {
 
      const order = {
        buyer: formData,
        items: cart,
        total: totalPrice(),
        date: serverTimestamp(),
      };

      const ordersRef = collection(db, "orders");
      const docRef = await addDoc(ordersRef, order);


      const batch = writeBatch(db);

      for (let item of cart) {
        const productRef = doc(db, "products", item.id); 
        const productSnap = await getDoc(productRef);

        if (!productSnap.exists()) {
          throw new Error(`El producto con ID ${item.id} no existe en Firestore`);
        }

        const currentStock = productSnap.data().stock;

        if (currentStock >= item.quantity) {
          batch.update(productRef, { stock: currentStock - item.quantity });
        } else {
          throw new Error(`No hay suficiente stock de ${item.name}`);
        }
      }

      await batch.commit();

      setOrderId(docRef.id);
      clearCart(); 
    } catch (error) {
      console.error("Error al generar la orden:", error);
      setErrorMsg(error.message || "Error al procesar la compra");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-form">
      {orderId ? (
        <h2>
          ✅ ¡Gracias por tu compra!  
          Tu número de orden es: <b>{orderId}</b>
        </h2>
      ) : (
        <form onSubmit={handleSubmit}>
          <h2>Finalizar compra</h2>

          {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}

          <input
            type="text"
            name="nombre"
            placeholder="Nombre completo"
            value={formData.nombre}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="text"
            name="telefono"
            placeholder="Teléfono"
            value={formData.telefono}
            onChange={handleChange}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Procesando..." : "Comprar"}
          </button>
        </form>
      )}
    </div>
  );
};

export default CheckoutForm;
