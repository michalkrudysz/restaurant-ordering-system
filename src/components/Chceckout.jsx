import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";
import { currencyFormatter } from "../utils/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const cartTotal = cartCtx.items.reduce((totalPrice, item) => {
    return totalPrice + item.price * item.quantity;
  }, 0);

  function handleClose() {
    userProgressCtx.hideCheckout();
  }

  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());

    fetch("http://localhost:3000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      }),
    });
  }

  return (
    <Modal open={userProgressCtx.progress === "checkout"} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <h2>Kasa</h2>
        <p>Całkowita kwota:{currencyFormatter.format(cartTotal)}</p>
        <Input label="Pełne imię" type="text" id="name" />
        <Input label="Adres e-mail" type="email" id="email" />
        <Input label="Ulica" type="text" id="street" />
        <div className="control-row">
          <Input label="Kod pocztowy" type="text" id="postal-code" />
          <Input label="Miasto" type="text" id="city" />
        </div>
        <p className="modal-actions">
          <Button type="button" textOnly onClick={handleClose}>
            Zamknij
          </Button>
          <Button>Wyślij zamówienie</Button>
        </p>
      </form>
    </Modal>
  );
}
