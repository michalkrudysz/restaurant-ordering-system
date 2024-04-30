import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";
import { currencyFormatter } from "../utils/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData,
  } = useHttp("http://localhost:3000/orders", requestConfig);

  const cartTotal = cartCtx.items.reduce((totalPrice, item) => {
    return totalPrice + item.price * item.quantity;
  }, 0);

  function handleClose() {
    userProgressCtx.hideCheckout();
  }

  function handleFinish() {
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const customerData = Object.fromEntries(formData.entries());

    sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      })
    );
  }

  let actions = (
    <>
      <Button type="button" textOnly onClick={handleClose}>
        Zamknij
      </Button>
      <Button type="submit">Wyślij zamówienie</Button>
    </>
  );

  if (isSending) {
    actions = <span>Wysyłanie zamówienia...</span>;
  }

  if (data && !error) {
    return (
      <Modal
        open={userProgressCtx.progress === "checkout"}
        onClose={handleFinish}
      >
        <h2>Zamówienie wysłane</h2>
        <p>Dziękujemy za złożenie zamówienia!</p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Wyjdź</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal open={userProgressCtx.progress === "checkout"} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <h2>Kasa</h2>
        <p>Całkowita kwota: {currencyFormatter.format(cartTotal)}</p>
        <Input label="Pełne imię" type="text" id="name" />
        <Input label="Adres e-mail" type="email" id="email" />
        <Input label="Ulica" type="text" id="street" />
        <div className="control-row">
          <Input label="Kod pocztowy" type="text" id="postal-code" />
          <Input label="Miasto" type="text" id="city" />
        </div>
        {error && (
          <Error title="Problem z wysłaniem zamówienia" message={error} />
        )}
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}
