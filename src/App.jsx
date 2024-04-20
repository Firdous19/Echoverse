import { Header, Footer, ToasterComp } from "./components";
import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <div>
      <Header />
      <ToasterComp />
      <Outlet />
      <Footer />
    </div>
  );
}
