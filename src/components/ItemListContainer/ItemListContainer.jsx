import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import ItemList from "../ItemList/ItemList";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const ItemListContainer = () => {
  const { categoriaId } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        let productsArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

      
        if (categoriaId && typeof categoriaId === "string") {
          const safeCategoriaId = categoriaId.toLowerCase();
          productsArray = productsArray.filter(
            (p) =>
              p.category &&
              typeof p.category === "string" &&
              p.category.toLowerCase().replace(/\s+/g, "-") === safeCategoriaId
          );
        }

        setItems(productsArray);
      } catch (error) {
        console.error("Error al cargar productos:", error);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoriaId]);

  return (
    <div className="container mt-4">
      <h2>
        {categoriaId
          ? `Categoría: ${categoriaId}`
          : "Todos los productos"}
      </h2>

      {loading ? <p>Cargando productos...</p> : <ItemList items={items} />}

      {!loading && items.length === 0 && (
        <p className="text-center text-muted mt-4">
          No hay productos para esta categoría.
        </p>
      )}
    </div>
  );
};

export default ItemListContainer;
