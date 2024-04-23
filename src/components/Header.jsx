import logoImg from "../assets/logo.jpg";
import Meals from "./Meals";

export default function Header() {
  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="Logo restauracji" />
        <h1></h1>
      </div>
      <nav>
        <button>Cart (0)</button>
      </nav>
    </header>
  );
}
