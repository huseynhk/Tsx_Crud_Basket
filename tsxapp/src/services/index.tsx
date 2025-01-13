import { ENDPOINTS } from "../constant/EndPoints";
import { instanceAxios } from "../helper/instanceAxios";
import {
  GetProducts,
  GetSingleProduct,
  AddProduct,
  EditProduct,
  DeleteProduct,
  User,
} from "../interfaces/data";

// GET All
export const getProducts: GetProducts = (params) => {
  return instanceAxios({ method: "GET", url: ENDPOINTS.POSTS, params });
};

// GET Single
export const getSingleProduct: GetSingleProduct = (productId) => {
  return instanceAxios({ method: "GET", url: ENDPOINTS.POST_ID(productId) });
};

// ADD
export const addProduct: AddProduct = (newProduct) => {
  return instanceAxios({
    method: "POST",
    url: ENDPOINTS.POSTS,
    data: newProduct,
  });
};

// EDIT
export const editProduct: EditProduct = (productId, updatedProduct) => {
  return instanceAxios({
    method: "PUT",
    url: ENDPOINTS.POST_ID(productId),
    data: updatedProduct,
  });
};

// DELETE
export const deleteProduct: DeleteProduct = (productId) => {
  return instanceAxios({ method: "DELETE", url: ENDPOINTS.POST_ID(productId) });
};

// GET_USER
export const getUsers = async () => {
  try {
    const response = await instanceAxios({
      method: "GET",
      url: ENDPOINTS.USERS,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// ADD_USER
export const addUser = (newUser: User) => {
  return instanceAxios({
    method: "POST",
    url: ENDPOINTS.USERS,
    data: newUser,
  });
};

// DELETE_USER
export const deleteUser = async (userId: number) => {
  try {
    const response = await instanceAxios({
      method: "DELETE",
      url: `${ENDPOINTS.USERS}/${userId}`,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// UPDATE_USER
export const updateUser = async (
  userId: number,
  updatedUserData: Partial<User>
) => {
  try {
    const response = await instanceAxios({
      method: "PUT",
      url: `${ENDPOINTS.USERS}/${userId}`,
      data: updatedUserData,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
