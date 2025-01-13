import React, { useState, useEffect } from "react";
import { editProduct } from "../../services/index";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTER } from "../../constant/Router";
import { InitialStateType } from "../../interfaces/data";
import { toast } from "react-toastify";
import { ColorResult, SketchPicker } from "react-color";
import useFetchSingleProduct from "../../hooks/GetSingle";
import moment from "moment";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const createDate = moment().valueOf();
const initialState: InitialStateType = {
  title: "",
  description: "",
  price: 0,
  discountPrice: 0,
  rating: 0,
  stock: 0,
  category: "",
  image: "",
  create_at: createDate,
  color: "#000",
};

const UpdateItem: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [newProduct, setNewProduct] = useState<InitialStateType>(initialState);
  const {
    product,
    loading: singleLoading,
    error,
  } = useFetchSingleProduct(Number(id));

  const editSingleProduct = async () => {
    try {
      setLoading(true);
      await editProduct(Number(id), newProduct);
      setNewProduct(initialState);
      toast.success("User edited successfully!", {
        autoClose: 1000,
      });
      setTimeout(() => {
        navigate(ROUTER.Home);
      }, 1500);
    } catch (error) {
      console.error("Error fetching single product:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const numericValue = isNaN(Number(value)) ? value : Number(value);
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: numericValue,
    }));
  };

  useEffect(() => {
    if (product) {
      setNewProduct(product);
    }
  }, [product]);

  if (singleLoading) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <AiOutlineLoading3Quarters className="text-[150px] text-cyan-300 animate-spin" />
      </div>
    );
  }

  if (error) {
    return <p className="m-20 text-red-300 text-xl ">Error: {error}</p>;
  }

  return (
    <>
      <div className="py-6">
        <h1 className="text-center text-3xl text-cyan-300 mb-8">
          Update Product
        </h1>
        <div className=" flex justify-center">
          <div className="w-1/4 mx-24">
            <div className="relative z-0 w-full mb-5 group ">
              <input
                type="text"
                name="title"
                value={newProduct.title}
                onChange={handleInputChange}
                className="block py-2 px-0 w-full text-xl text-gray-100 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
              <label
                htmlFor="title"
                className="peer-focus:font-medium absolute text-xl text-gray-900 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Title
              </label>
            </div>

            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="description"
                value={newProduct.description}
                onChange={handleInputChange}
                className="block py-2 px-0 w-full text-xl text-gray-100 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
              <label
                htmlFor="description"
                className="peer-focus:font-medium absolute text-xl text-gray-900 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Description
              </label>
            </div>

            <div className="relative z-0 w-full mb-5 group">
              <input
                type="number"
                name="price"
                value={newProduct.price}
                onChange={handleInputChange}
                className="block py-2 px-0 w-full text-xl text-gray-100 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
              <label
                htmlFor="price"
                className="peer-focus:font-medium absolute text-xl text-gray-100 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Price
              </label>
            </div>

            <div className="relative z-0 w-full mb-5 group">
              <input
                type="number"
                name="discountPrice"
                value={newProduct.discountPrice}
                onChange={handleInputChange}
                className="block py-2 px-0 w-full text-xl text-gray-100 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
              <label
                htmlFor="discountPrice"
                className="peer-focus:font-medium absolute text-xl text-gray-900 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                DiscountPrice
              </label>
            </div>

            <div className="relative z-0 w-full mb-5 group">
              <input
                type="number"
                name="rating"
                value={newProduct.rating}
                onChange={handleInputChange}
                className="block py-2 px-0 w-full text-xl text-gray-100 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
              <label
                htmlFor="rating"
                className="peer-focus:font-medium absolute text-xl text-gray-900 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Rating
              </label>
            </div>

            <div className="relative z-0 w-full mb-5 group">
              <input
                type="number"
                name="stock"
                value={newProduct.stock}
                onChange={handleInputChange}
                className="block py-2 px-0 w-full text-xl text-gray-100 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
              <label
                htmlFor="stock"
                className="peer-focus:font-medium absolute text-xl text-gray-900 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Stock
              </label>
            </div>

            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="category"
                value={newProduct.category}
                onChange={handleInputChange}
                className="block py-2 px-0 w-full text-xl text-gray-100 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
              <label
                htmlFor="category"
                className="peer-focus:font-medium absolute text-xl text-gray-900 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Category
              </label>
            </div>

            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="image"
                value={newProduct.image}
                onChange={handleInputChange}
                className="block py-2 px-0 w-full text-xl text-gray-100 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
              <label
                htmlFor="image"
                className="peer-focus:font-medium absolute text-xl text-gray-900 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Image
              </label>
            </div>

            <button
              type="submit"
              onClick={editSingleProduct}
              className="text-white transition-all duration-300  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xl w-full sm:w-auto   text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 px-16 py-2"
            >
              {loading ? "Editing" : "Edit"}
            </button>
          </div>
          <div className="w-1/4 ">
            <SketchPicker
              color={newProduct.color}
              onChange={(color: ColorResult) =>
                setNewProduct((prevProduct) => ({
                  ...prevProduct,
                  color: color.hex,
                }))
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateItem;
