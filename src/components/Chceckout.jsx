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

  return (
    <Modal open={userProgressCtx.progress === "checkout"} onClose={handleClose}>
      <form>
        <h2>Kasa</h2>
        <p>Całkowita kwota:{currencyFormatter.format(cartTotal)}</p>
        <Input label="Pełne imię" type="text" id="full-name" />
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
