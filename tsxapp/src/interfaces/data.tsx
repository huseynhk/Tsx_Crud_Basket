import { ReactNode } from "react";
import { AxiosPromise } from "axios";

export interface ChildrenNode {
  children: ReactNode;
}
export interface GlobalProps {
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
  confirmPassword: string;
  setConfirmPassword: (value: string) => void;
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  loggedInUser: User | null;
  showDelete: boolean;
  setshowDelete: (value: boolean) => void;
  deletedUser: User | null;
  closeDeleteModal: () => void;
  openDeleteModal: (userId: any) => void;
}

export interface User {
  id?: any;
  name?: string;
  email: string;
  password: string;
  address?: string;
  image?: string;
  phone: string;
  type?:string;
}

export interface Product {
  id?: any;
  title?: string;
  description?: string;
  price?: number;
  discountPrice?: number;
  rating?: number;
  stock?: number;
  category?: string;
  image?: string;
  create_at?: number;
  color?: any;
  type?:string;

}

export interface InitialStateType extends Omit<Product, "id"> {}

interface PriceDetails {
  amount: number;
  totalAmount: number;
  totalPrice: number;
  totalDiscountPrice: number;
}

export interface BasketType extends Omit<Product, "create_at">, PriceDetails {}

export interface ProductState extends PriceDetails {
  basket: BasketType[];
}

export interface LayoutProps {
  children: ReactNode;
}
interface ProductParams {
  price: number;
  discountPrice: number;
}

export interface RouterTypes {
  Home: string;
  AddItem: string;
  UpdateItem: string;
  Detail: string;
  Product: string;
  Basket: string;
  Register: string;
  Login: string;
  ProductDetail: string;
  Welcome: string;
  User: string;
  UserEdit: string;
}

export interface GetProducts {
  (params?: Required<ProductParams> | undefined): AxiosPromise<Product[]>;
}

export interface GetSingleProduct {
  (productId: number): AxiosPromise<Product>;
}

export interface AddProduct {
  (newProduct: InitialStateType): AxiosPromise<Product>;
}

export interface DeleteProduct {
  (productId: number): AxiosPromise<void>;
}

export interface EditProduct {
  (
    productId: number,
    updatedProduct: Partial<InitialStateType>
  ): AxiosPromise<Product>;
}
