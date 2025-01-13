import { Link } from "react-router-dom";
import { activeLink } from "../../utils/ActiveLink";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTER } from "../../constant/Router";
import { FaShopify } from "react-icons/fa";
import { useSelector } from "react-redux";
import { getTotalAmount } from "../../features/slices/productSlice";
import { useGlobalContext } from "../../context/GlobalContext";
import { GlobalProps } from "../../interfaces/data";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const NavBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { loggedInUser } = useGlobalContext() as GlobalProps;
  const totalAmount = useSelector(getTotalAmount);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    setLoading(true);
    localStorage.removeItem("loggedInUser");
    setShowLogoutModal(false);
    setTimeout(() => {
      setLoading(false);
    }, 900);
    setTimeout(() => {
      navigate(ROUTER.Register);
    }, 1000);
  };

  const closeLogoutModal = () => {
    setShowLogoutModal(false);
  };

  return (
    <div className="py-5 bg-gray-700 text-gray-200 text-xl font-poppins capitalize">
      <div className="flex justify-center items-center">
        {/* Hamburger Menu */}
        {loggedInUser && (
          <div className="lg:hidden">
            <FaBars
              size={40}
              onClick={toggleMenu}
              className="text-sky-500 hover:opacity-80 transition-all duration-500 text-3xl cursor-pointer"
            />
          </div>
        )}

        {/* Sidebar Menu */}
        {isMenuOpen && (
          <div className="lg:hidden fixed inset-0  bg-black bg-opacity-75 z-50">
            <div className="flex justify-end p-4">
              <FaTimes
                onClick={toggleMenu}
                className="text-blue-500  dark:text-blue-100 text-3xl cursor-pointer"
              />
            </div>
            <div className="flex flex-col items-center space-y-5">
              {loggedInUser ? (
                <>
                  <span className="  hover:text-blue-400 transition duration-500 text-3xl">
                    <Link
                      to={ROUTER.Home}
                      className={
                        activeLink(ROUTER.Home, pathname)
                          ? "text-gega-red hover:text-sky-600    dark:text-green-300 dark:hover:text-sky-200 transition duration-500"
                          : "text-sky-600 hover:text-gega-red   dark:text-sky-200   dark:hover:text-green-200 transition duration-500"
                      }
                    >
                      Table
                    </Link>
                  </span>
                  <span className=" hover:text-blue-400 transition duration-500 text-3xl mx-4">
                    <Link
                      to={ROUTER.AddItem}
                      className={
                        activeLink(ROUTER.AddItem, pathname)
                          ? "text-gega-red hover:text-sky-600    dark:text-green-300 dark:hover:text-sky-200 transition duration-500"
                          : "text-sky-600 hover:text-gega-red   dark:text-sky-200   dark:hover:text-green-200 transition duration-500"
                      }
                    >
                      Add
                    </Link>
                  </span>
                  <span className=" hover:text-blue-400 transition duration-500 text-3xl">
                    <Link
                      to={ROUTER.Product}
                      className={
                        activeLink(ROUTER.Product, pathname)
                          ? "text-gega-red hover:text-sky-600    dark:text-green-300 dark:hover:text-sky-200 transition duration-500"
                          : "text-sky-600 hover:text-gega-red   dark:text-sky-200   dark:hover:text-green-200 transition duration-500"
                      }
                    >
                      Products
                    </Link>
                  </span>
                  <span className=" hover:text-blue-400 transition duration-500 text-3xl ms-4">
                    <Link
                      to={ROUTER.Basket}
                      className={
                        activeLink(ROUTER.Basket, pathname)
                          ? "text-gega-red hover:text-sky-600    dark:text-green-300 dark:hover:text-sky-200 transition duration-500"
                          : "text-sky-600 hover:text-gega-red   dark:text-sky-200   dark:hover:text-green-200 transition duration-500"
                      }
                    >
                      <div className="flex">
                        <span>
                          <FaShopify size={40} />
                        </span>
                        <span className="bg-gega-red h-6 w-6 text-xl rounded-full flex justify-center items-center">
                          <span> {totalAmount}</span>
                        </span>
                      </div>
                    </Link>
                  </span>
                  <span className=" hover:text-blue-400 transition duration-500 text-3xl">
                    <Link to={ROUTER.User}>
                      <div className="flex items-center text-stone-300 text-center text-lg">
                        <img
                          className="w-[75px] h-[75px] object-cover rounded-full mx-3"
                          src={loggedInUser?.image}
                          alt={loggedInUser?.name}
                        />
                      </div>
                    </Link>
                  </span>
                  <p className="font-semibold">{loggedInUser?.name}</p>
                  <span className=" hover:text-blue-400 transition duration-500 text-2xl">
                    <button
                      onClick={() => setShowLogoutModal(true)}
                      className="mx-4  text-sky-600 hover:text-gega-red   dark:text-sky-200   dark:hover:text-green-200 transition duration-500"
                    >
                      LogOut
                    </button>
                  </span>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        )}

        {loggedInUser && (
          <>
            <div className="hidden md:flex items-center">
              <span className="  hover:text-blue-400 transition duration-500 text-3xl">
                <Link
                  to={ROUTER.Home}
                  className={
                    activeLink(ROUTER.Home, pathname)
                      ? "text-gega-red hover:text-sky-600    dark:text-green-300 dark:hover:text-sky-200 transition duration-500"
                      : "text-sky-600 hover:text-gega-red   dark:text-sky-200   dark:hover:text-green-200 transition duration-500"
                  }
                >
                  Table
                </Link>
              </span>

              <span className=" hover:text-blue-400 transition duration-500 text-3xl mx-4">
                <Link
                  to={ROUTER.AddItem}
                  className={
                    activeLink(ROUTER.AddItem, pathname)
                      ? "text-gega-red hover:text-sky-600    dark:text-green-300 dark:hover:text-sky-200 transition duration-500"
                      : "text-sky-600 hover:text-gega-red   dark:text-sky-200   dark:hover:text-green-200 transition duration-500"
                  }
                >
                  Add
                </Link>
              </span>
              <span className=" hover:text-blue-400 transition duration-500 text-3xl">
                <Link
                  to={ROUTER.Product}
                  className={
                    activeLink(ROUTER.Product, pathname)
                      ? "text-gega-red hover:text-sky-600    dark:text-green-300 dark:hover:text-sky-200 transition duration-500"
                      : "text-sky-600 hover:text-gega-red   dark:text-sky-200   dark:hover:text-green-200 transition duration-500"
                  }
                >
                  Products
                </Link>
              </span>

              <span className=" hover:text-blue-400 transition duration-500 text-3xl ms-4">
                <Link
                  to={ROUTER.Basket}
                  className={
                    activeLink(ROUTER.Basket, pathname)
                      ? "text-gega-red hover:text-sky-600    dark:text-green-300 dark:hover:text-sky-200 transition duration-500"
                      : "text-sky-600 hover:text-gega-red   dark:text-sky-200   dark:hover:text-green-200 transition duration-500"
                  }
                >
                  <div className="flex">
                    <span>
                      <FaShopify size={40} />
                    </span>
                    <span className="bg-gega-red h-6 w-6 text-xl rounded-full flex justify-center items-center">
                      <span> {totalAmount}</span>
                    </span>
                  </div>
                </Link>
              </span>
              <span className=" hover:text-blue-400 transition duration-500 text-3xl">
                <Link to={ROUTER.User}>
                  <div className="flex items-center text-stone-300 text-center text-lg relative">
                    <div className="relative group">
                      <img
                        className="w-[50px] h-[50px] object-cover rounded-full mx-3"
                        src={loggedInUser.image}
                        alt={loggedInUser.name}
                      />
                      <div className="absolute z-40 top-full left-1/2  transform -translate-x-1/2 mt-2 text-sm font-poppins font-semibold  bg-slate-400 text-black py-1 px-3 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {loggedInUser.name}
                      </div>
                    </div>
                  </div>
                </Link>
              </span>

              <span className=" hover:text-blue-400 transition duration-500 text-2xl">
                <button
                  onClick={() => setShowLogoutModal(true)}
                  className="mx-4  text-sky-600 hover:text-gega-red   dark:text-sky-200   dark:hover:text-green-200 transition duration-500"
                >
                  LogOut
                </button>
              </span>
            </div>
          </>
        )}

        {!loggedInUser && (
          <div>
            <span className=" hover:text-blue-400 transition duration-500 text-2xl md:text-3xl mr-4">
              <Link
                to={ROUTER.Welcome}
                className={
                  activeLink(ROUTER.Welcome, pathname)
                    ? "text-gega-red hover:text-sky-600    dark:text-green-300 dark:hover:text-sky-200 transition duration-500"
                    : "text-sky-600 hover:text-gega-red   dark:text-sky-200   dark:hover:text-green-200 transition duration-500"
                }
              >
                Home
              </Link>
            </span>
            <span className=" hover:text-blue-400 transition duration-500 text-2xl md:text-3xl ms-2">
              <Link
                to={ROUTER.Register}
                className={
                  activeLink(ROUTER.Register, pathname)
                    ? "text-gega-red hover:text-sky-600  mx-3  dark:text-green-300 dark:hover:text-sky-200 transition duration-500"
                    : "text-sky-600 hover:text-gega-red  mx-3 dark:text-sky-200   dark:hover:text-green-200 transition duration-500"
                }
              >
                Register
              </Link>
            </span>
          </div>
        )}
      </div>

      <Transition appear show={showLogoutModal} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={closeLogoutModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            </Transition.Child>

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-md">
                <h1 className="text-lg font-medium leading-6 text-gray-900">
                  <p className="text-xl text-black font-bold text-center">
                    Confirm Logout
                  </p>
                </h1>
                <div className="mt-2 py-2 text-gray-600 text-center">
                  <p>
                    Are you sure you want to logout,{" "}
                    <strong>{loggedInUser?.name}</strong>?
                  </p>
                </div>

                <div className="flex flex-col">
                  <button
                    onClick={handleLogout}
                    className="inline-flex justify-center px-4 py-2 mt-5 text-sm font-medium text-white bg-red-500 border border-transparent rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-500"
                  >
                    {loading ? "Loading..." : "Logout"}
                  </button>

                  <button
                    onClick={closeLogoutModal}
                    className="inline-flex justify-center px-4 py-2 mt-4 text-sm font-medium text-gray-700 bg-gray-100 border-2 border-gray-400 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-500"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default NavBar;
