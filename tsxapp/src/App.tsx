import { Routes, Route } from "react-router-dom";
import { ROUTER } from "./constant/Router";
import Home from "./components/admin/Home";
import AddItem from "./components/admin/AddItem";
import Detail from "./components/admin/Detail";
import UpdateItem from "./components/admin/UpdateItem";
import Products from "./components/pages/Products";
import Basket from "./components/pages/Basket";
import ProductDetail from "./components/pages/ProductDetail";
import NotFound from "./components/pages/NotFound";
import Register from "./components/pages/auth/Register";
import Login from "./components/pages/auth/Login";
import Welcome from "./components/pages/Welcome";
import User from "./components/pages/User";
import UserEdit from "./components/pages/UserEdit";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App(): JSX.Element {
  return (
    <>
      <Routes>
        <Route path={ROUTER.Home} element={<Home />} />
        <Route path={ROUTER.Welcome} element={<Welcome />} />
        <Route path={ROUTER.AddItem} element={<AddItem />} />
        <Route path={ROUTER.User} element={<User />} />
        <Route path={ROUTER.Product} element={<Products />} />
        <Route path={ROUTER.Basket} element={<Basket />} />
        <Route path={ROUTER.Register} element={<Register />} />
        <Route path={ROUTER.Login} element={<Login />} />
        <Route path={ROUTER.UserEdit + "/:id"} element={<UserEdit />} />
        <Route path={ROUTER.Detail + "/:id"} element={<Detail />} />
        <Route path={ROUTER.UpdateItem + "/:id"} element={<UpdateItem />} />
        <Route
          path={ROUTER.ProductDetail + "/:id"}
          element={<ProductDetail />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <ToastContainer />
    </>
  );
}

export default App;
