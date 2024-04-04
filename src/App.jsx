import { Header, Footer } from "./components";
import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
