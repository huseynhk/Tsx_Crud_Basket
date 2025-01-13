import React, { useState } from "react";
import { addProduct } from "../../services/index";
import { InitialStateType } from "../../interfaces/data";
import moment from "moment";
import { toast } from "react-toastify";
import { ROUTER } from "../../constant/Router";
import { useNavigate } from "react-router-dom";
import { ColorResult, SketchPicker } from "react-color";
import Layout from "../layout/Layout";

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
  type: "PRODUCT",
};

const AddItem: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [newProduct, setNewProduct] = useState<InitialStateType>(initialState);
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const numericValue = isNaN(Number(value)) ? value : Number(value);
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: numericValue,
    }));
  };
  const isEmpty: boolean = Object.values(newProduct).some(
    (value) => value === "" || value === 0
  );

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (isEmpty) {
      toast.error("Please fill in all fields", {
        autoClose: 1000,
      });
      return;
    }
    try {
      setLoading(true);
      await addProduct(newProduct);
      toast.success("Product added successfully!", {
        autoClose: 1000,
      });
      setNewProduct(initialState);
      setTimeout(() => {
        navigate(ROUTER.Home);
      }, 1500);
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Error adding Product", {
        autoClose: 1000,
      });
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <>
      <Layout>
        <div className="py-12">
          <form className=" flex justify-center" onSubmit={handleFormSubmit}>
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
                  className="\ absolute text-xl text-gray-900 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
                className="text-white transition-all duration-300  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xl w-full sm:w-auto   text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 px-16 py-2"
              >
                {loading ? "Adding" : "Add"}
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
          </form>
        </div>
      </Layout>
    </>
  );
};

export default AddItem;
