import { deleteProduct } from "../../services/index";
import moment from "moment";
import { FaCircleChevronRight, FaRegTrashCan, FaPen } from "react-icons/fa6";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { ROUTER } from "../../constant/Router";
import { toast } from "react-toastify";
import { copyColorCode } from "../../utils/CopyColor";
import Layout from "../layout/Layout";
import useFetchProducts from "../../hooks/GetCustom";
import { useState } from "react";
import { Product } from "../../interfaces/data";

const Home: React.FC = () => {
  const { datas, loading, error, fetchProducts } = useFetchProducts();
  const navigate = useNavigate();
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Product;
    direction: "asc" | "desc";
  }>({
    key: "price",
    direction: "asc",
  });

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const [key, direction] = event.target.value.split("-");
    setSortConfig({ key: key as keyof Product, direction: direction as "asc" | "desc" });
  };
  
  

  const sortedDatas = [...(datas ?? [])].sort((a, b) => {
    const aValue =
      a[sortConfig.key] ?? (typeof a[sortConfig.key] === "string" ? "" : 0);
    const bValue =
      b[sortConfig.key] ?? (typeof b[sortConfig.key] === "string" ? "" : 0);
    if (sortConfig.key === "title" || sortConfig.key === "category") {
      const aValueStr = typeof aValue === "string" ? aValue.toLowerCase() : "";
      const bValueStr = typeof bValue === "string" ? bValue.toLowerCase() : "";
      return sortConfig.direction === "asc"
        ? aValueStr.localeCompare(bValueStr)
        : bValueStr.localeCompare(aValueStr);
    } else {
      return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue;
    }
  });

  const removeProduct = async (productId: number) => {
    try {
      await deleteProduct(productId);
      toast.success("Product deleted successfully!", {
        autoClose: 1000,
      });
      fetchProducts();
    } catch (error) {
      console.error(`Error deleting product`);
    }
  };

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
        <div className="container py-10">
          <div>
            <select
              onChange={handleSortChange}
              className="mb-4 p-2 bg-slate-300 rounded-sm"
            >
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating-asc">Rating: Low to High</option>
              <option value="rating-desc">Rating: High to Low</option>
              <option value="discountPrice-asc">Discount: Low to High</option>
              <option value="discountPrice-desc">Discount: High to Low</option>
              <option value="stock-asc">Stock: Low to High</option>
              <option value="stock-desc">Stock: High to Low</option>
              <option value="title-asc">Title: A-Z</option>
              <option value="title-desc">Title: Z-A</option>
              <option value="category-asc">Category: A-Z</option>
              <option value="category-desc">Category: Z-A</option>
            </select>
          </div>
          <div className="relative overflow-x-auto">
            <table className=" w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-5 py-3">
                    S.No
                  </th>
                  <th scope="col" className="px-5 py-3">
                    Title
                  </th>
                  <th scope="col" className="px-5 py-3">
                    Price
                  </th>

                  <th scope="col" className="px-5 py-3">
                    Discount
                  </th>
                  <th scope="col" className="px-5 py-3">
                    Rating
                  </th>
                  <th scope="col" className="px-5 py-3">
                    Stock
                  </th>

                  <th scope="col" className="px-5 py-3">
                    Category
                  </th>

                  <th scope="col" className="px-5 py-3">
                    Color
                  </th>
                  <th scope="col" className="px-5 py-3">
                    Image
                  </th>
                  <th scope="col" className="px-5 py-3">
                    Added_Time
                  </th>
                  <th scope="col" className="px-5 py-3">
                    Wiew
                  </th>
                  <th scope="col" className="px-5 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="mt-4 w-full min-w-max table-auto text-left">
                {error && (
                  <p className="m-20 text-red-300 text-2xl ">
                    Fetching Data: {error}
                  </p>
                )}

                {datas &&
                  datas.length > 0 &&
                  sortedDatas.map((product, index) => (
                    <tr
                      key={product.id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4">{product.title}</td>
                      <td className="px-6 py-4">${product.price}</td>
                      <td className="px-6 py-4">${product.discountPrice}</td>
                      <td className="px-6 py-4">{product.rating}</td>
                      <td className="px-6 py-4">{product.stock}</td>
                      <td className="px-6 py-4">{product.category}</td>
                      <td className="px-6 py-4">
                        <div
                          className="h-10 w-10 rounded-full cursor-pointer "
                          style={{ backgroundColor: product.color }}
                          onClick={() => copyColorCode(product.color)}
                        ></div>
                      </td>
                      <td className="p-3">
                        <img
                          className="h-12 w-20 object-cover rounded-sm"
                          src={product.image}
                          alt={product.title}
                        />
                      </td>
                      <td className="px-2 py-4 ">
                        {moment(product?.create_at).fromNow()}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          className="text-cyan-700   hover:opacity-60 duration-500"
                          onClick={() =>
                            navigate(`${ROUTER.Detail}/${product.id}`)
                          }
                        >
                          <FaCircleChevronRight size={45} />
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          className="px-5 py-1 bg-blue-700 rounded-sm hover:opacity-75 transition-all duration-500"
                          onClick={() =>
                            navigate(`${ROUTER.UpdateItem}/${product.id}`)
                          }
                        >
                          <FaPen size={20} />
                        </button>
                        <button
                          className="px-5 py-1 bg-red-700 rounded-sm mt-2 hover:opacity-75 transition-all duration-500"
                          onClick={() => removeProduct(product.id)}
                        >
                          <FaRegTrashCan size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Home;
