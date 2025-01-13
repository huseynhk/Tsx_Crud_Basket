import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  increament,
  decrement,
  clearBasket,
} from "../../features/slices/productSlice";
import { FaTrashCan, FaSquarePlus, FaSquareMinus } from "react-icons/fa6";
import {
  getBasket,
  getTotalPrice,
  getTotalDiscount,
} from "../../features/slices/productSlice";
import { copyColorCode } from "../../utils/CopyColor";
import Layout from "../layout/Layout";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { Product } from "../../interfaces/data";
import { GiDiscGolfBasket } from "react-icons/gi";

const Basket: React.FC<Product> = () => {
  const basket = useSelector(getBasket);
  const totalPrice = useSelector(getTotalPrice);
  const totalDiscount = useSelector(getTotalDiscount);
  const dispatch = useDispatch();
  const [showDelete, setShowDelete] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [deletedProduct, setDeletedProduct] = useState<Product | null>(null);

  const openDeleteModal = (product: any) => {
    setDeletedProduct(product);
    setShowDelete(true);
  };

  const closeDeleteModal = () => {
    setShowDelete(false);
    setDeletedProduct(null);
  };

  const openClearConfirmModal = () => {
    setShowClearConfirm(true);
  };

  const closeClearConfirmModal = () => {
    setShowClearConfirm(false);
  };

  const confirmClearBasket = () => {
    dispatch(clearBasket());
    closeClearConfirmModal();
  };

  const removeProduct = (id: any) => {
    dispatch(removeFromCart(id));
    closeDeleteModal();
  };
  console.log("deletedProduct", deletedProduct);
  return (
    <>
      <Layout>
        <header className="w-full  font-extrabold text-lg flex justify-center items-center bg-slate-700 p-2">
          <div>
            <p className="text-cyan-100">TotalPrice: {totalPrice}</p>
            <p className="text-cyan-100 my-2">TotalDiscount: {totalDiscount}</p>
          </div>
          <div className="ms-8">
            <p className="text-cyan-100">Sum: {totalPrice - totalDiscount}</p>
            <button
              className="text-sky-100 mt-1 bg-gega-red px-6 py-1 rounded-sm  hover:opacity-70 transition-all duration-500"
              onClick={openClearConfirmModal}
            >
              Clear All
            </button>
          </div>
        </header>

        {basket && basket.length > 0 ? (
          <div className="container grid gap-12 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 p-14">
            {basket.map((product) => {
              const result =
                (product?.price ?? 0) - (product?.discountPrice ?? 0);

              return (
                <div
                  className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                  key={product.id}
                >
                  <img
                    className="w-full h-60 object-cover rounded-t-lg"
                    src={product.image}
                    alt={product.title}
                  />

                  <div className="px-5 py-5 flex justify-between items-center">
                    <div>
                      <h3 className="text-cyan-300">{product.title}</h3>
                      <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                        {product.description}
                      </h5>
                      <div className="flex items-center mt-2 mb-5">
                        <div className="flex items-center space-x-1 rtl:space-x-reverse text-cyan-300">
                          {product.category}
                        </div>
                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
                          {product.rating}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="flex flex-col items-center justify-between">
                          <span className="text-lg font-bold text-gray-900 dark:text-white">
                            Price: ${product.price}
                          </span>
                          <span className="text-lg font-bold text-gray-900 dark:text-white">
                            Now: ${result}
                          </span>
                          <span className="text-lg font-semibold text-gray-900 dark:text-sky-200">
                            ${(result * product.amount).toFixed(2)}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-center cursor-pointer">
                      <div
                        className="h-8 w-20 rounded"
                        style={{ backgroundColor: product.color }}
                        onClick={() => copyColorCode(product.color)}
                      ></div>

                      <div className="my-4 flex items-center">
                        <button
                          className="text-red-300"
                          onClick={() => dispatch(decrement(product))}
                        >
                          <FaSquareMinus size={30} />
                        </button>
                        <p className="text-cyan-300 font-extrabold text-xl mx-2">
                          {product.amount}
                        </p>

                        <button
                          className="text-green-300"
                          onClick={() => dispatch(increament(product))}
                        >
                          <FaSquarePlus size={30} />
                        </button>
                      </div>

                      <button
                        className="px-7 py-1 bg-red-700 rounded-md hover:opacity-70 transition-all duration-500"
                        onClick={() => openDeleteModal(product)}
                      >
                        <FaTrashCan size={25} color="white" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex justify-center items-center w-full h-full">
            <GiDiscGolfBasket className="text-[250px] text-red-300 mt-16" />
          </div>
        )}

        {/* Delete Modal */}
        <Transition appear show={showDelete} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-10 overflow-y-auto"
            onClose={closeDeleteModal}
          >
            <div className="min-h-screen px-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-1000"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-300"
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
                enter="ease-out duration-1000"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-300"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="inline-block w-full max-w-md py-8 px-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-md">
                  <h1 className="text-lg font-medium leading-6 text-gray-900">
                    <p className="text-xl text-black font-bold text-center">
                      Are you sure you want to delete {deletedProduct?.title}?
                    </p>
                  </h1>
                  <div className="mt-2 py-2 text-gray-600 text-center">
                    <p>
                      Attention: Deleting {deletedProduct?.title} cannot be
                      undone.
                    </p>
                  </div>

                  <div className="flex flex-col">
                    <button
                      onClick={() => removeProduct(deletedProduct)}
                      className="inline-flex justify-center px-4 py-2 mt-5 text-sm font-medium text-white bg-red-500 border border-transparent rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-500"
                    >
                      Delete
                    </button>

                    <button
                      className="inline-flex justify-center px-4 py-2 mt-4 text-sm font-medium text-gray-700 bg-gray-100 border-2 border-gray-400 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-500"
                      onClick={closeDeleteModal}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>

        {/* Clear Basket Confirm Modal */}
        <Transition appear show={showClearConfirm} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-10 overflow-y-auto"
            onClose={closeClearConfirmModal}
          >
            <div className="min-h-screen px-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-1000"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-300"
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
                enter="ease-out duration-1000"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-300"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="inline-block w-full max-w-md py-8 px-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-md">
                  <h1 className="text-lg font-medium leading-6 text-gray-900">
                    <p className="text-xl text-black font-bold text-center">
                      Are you sure you want to clear all items in your basket?
                    </p>
                  </h1>
                  <div className="mt-2 py-2 text-gray-600 text-center">
                    <p>This action cannot be undone.</p>
                  </div>

                  <div className="flex flex-col">
                    <button
                      onClick={confirmClearBasket}
                      className="inline-flex justify-center px-4 py-2 mt-5 text-sm font-medium text-white bg-red-500 border border-transparent rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-500"
                    >
                      Clear All
                    </button>

                    <button
                      className="inline-flex justify-center px-4 py-2 mt-4 text-sm font-medium text-gray-700 bg-gray-100 border-2 border-gray-400 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-500"
                      onClick={closeClearConfirmModal}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </Layout>
    </>
  );
};

export default Basket;
