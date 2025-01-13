import { FaRegEye } from "react-icons/fa";
import { SlBasketLoaded } from "react-icons/sl";
import { FaShopify } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../features/slices/productSlice";
import { ROUTER } from "../../constant/Router";
import { useNavigate } from "react-router-dom";
import Layout from "../layout/Layout";
import useFetchProducts from "../../hooks/GetCustom";
import { getBasket } from "../../features/slices/productSlice";
import { copyColorCode } from "../../utils/CopyColor";
import { Product } from "../../interfaces/data";
import { useState } from "react";
import { GlobalProps } from "../../interfaces/data";
import { useGlobalContext } from "../../context/GlobalContext";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Products: React.FC = () => {
  const { loggedInUser } = useGlobalContext() as GlobalProps;

  const { datas, loading, error } = useFetchProducts();
  const basket = useSelector(getBasket);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [filterTitle, setFilterTitle] = useState<string>("");
  const filteredDatas = datas?.filter((product: Product) => {
    const filteredValue = filterTitle.toLowerCase();
    return (
      product.title?.toLowerCase().includes(filteredValue) ||
      product.category?.toLowerCase().includes(filteredValue)
    );
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <AiOutlineLoading3Quarters className="text-[150px] text-cyan-300 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Layout>
        <div>
          <div className="flex justify-center mt-6 -mb-6">
            <input
              type="text"
              placeholder="Filter Products"
              value={filterTitle}
              onChange={(e) => setFilterTitle(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-cyan-400"
            />
          </div>

          <div className="container grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3  py-10">
            {error && (
              <p className="m-20 text-red-300 text-2xl ">
                Fetching Data: {error}
              </p>
            )}
            {filteredDatas &&
              filteredDatas.length > 0 &&
              filteredDatas.map((product) => {
                const productExist = basket.find(
                  (exist) => exist.id === product.id
                );

                return (
                  <div
                    key={product.id}
                    className="w-full max-w-sm bg-white border  border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                  >
                    <img
                      className="w-full h-52 object-cover rounded-t-lg"
                      src={product.image}
                      alt={product.title}
                    />

                    <div className="px-5 py-5 flex justify-between items-center">
                      <div>
                        <h3 className="text-cyan-300">{product.title}</h3>
                        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                          {product.description}
                        </h5>
                        <div className="flex items-center mt-2.5 mb-5">
                          <div className="flex items-center space-x-1 rtl:space-x-reverse text-cyan-300">
                            {product.category}
                          </div>
                          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
                            {product.rating}
                          </span>
                        </div>
                        <div className="flex  items-center justify-between">
                          <p className="flex flex-col items-center justify-between">
                            <span className="text-xl font-bold  text-gray-900 dark:text-white">
                              Price: ${product.price}
                            </span>
                            <span className="text-xl font-bold text-gray-900 dark:text-white">
                              Now: $
                              {(product.price ?? 0) -
                                (product.discountPrice ?? 0)}{" "}
                              $
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col  items-center justify-center">
                        <div
                          className="h-8 w-20 rounded cursor-pointer"
                          style={{ backgroundColor: product.color }}
                          onClick={() => copyColorCode(product.color)}
                        ></div>
                        <button
                          className="px-6 py-1 bg-gray-700 rounded-md my-5 hover:opacity-70 transition-all duration-500"
                          onClick={() =>
                            navigate(`${ROUTER.ProductDetail}/${product.id}`)
                          }
                        >
                          <FaRegEye size={30} color={"white"} />
                        </button>
                        <button
                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md transition-all duration-500  px-6 py-1 text-center dark:bg-indigo-800 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          onClick={() =>
                            dispatch(
                              addToCart({
                                ...product,
                                amount: 1,
                                totalAmount: 1,
                                totalPrice: product.price ?? 0,
                                totalDiscountPrice: product.discountPrice ?? 0,
                              })
                            )
                          }
                        >
                          {productExist ? (
                            <FaShopify size={30} color={"white"} />
                          ) : (
                            <SlBasketLoaded size={30} color={"white"} />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Products;
