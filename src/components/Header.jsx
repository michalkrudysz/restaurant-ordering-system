import Button from "./UI/Button";
import logoImg from "../assets/logo.jpg";
import { useContext } from "react";
import CartContext from "../store/CartContext";

export default function Header() {
  const cartCtx = useContext(CartContext);

  const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);

  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="Logo restauracji" />
        <h1></h1>
      </div>
      <nav>
        <Button textOnly={true}>Cart ({totalCartItems})</Button>
      </nav>
    </header>
  );
}
