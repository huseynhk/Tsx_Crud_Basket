import NavBar from "./NavBar";
import { LayoutProps } from "../../interfaces/data";

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <NavBar />
      <div className="font-poppins">{children}</div>
    </>
  );
};

export default Layout;
