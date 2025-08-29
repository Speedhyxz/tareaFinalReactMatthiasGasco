import { useCart } from "./CartContext";
import { Link } from "react-router";

const CartWidget = () => {
  const { getTotalQuantity } = useCart(); 
  const total = getTotalQuantity();

  return (
    <Link to="/carrito" className="relative">
      <i className="fa-solid fa-cart-shopping text-2xl"></i>
      {total > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2">
          {total > 9 ? "+9" : total}
        </span>
      )}
    </Link>
  );
};

export default CartWidget;
