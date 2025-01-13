import { useState, useEffect } from "react";
import { getSingleProduct } from "../services/index";
import { Product } from "../interfaces/data";

const useFetchSingleProduct = (productId: number) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSingleProduct = async () => {
    try {
      setLoading(true);
      const response = await getSingleProduct(productId);
      setProduct(response.data);
    } catch (error) {
      setError("Error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSingleProduct();
  }, [productId]);

  return { product, loading, error, fetchSingleProduct };
};

export default useFetchSingleProduct;
