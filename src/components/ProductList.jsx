import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.get("http://localhost:5000/api/products", {
        timeout: 5000,
      });
      setProducts(res.data);
    } catch (err) {
      if (err.message === "Network Error") {
        setError("No internet connection or server is not reachable.");
      } else if (err.code === "ECONNABORTED") {
        setError("Request timed out. Please check your connection.");
      } else if (err.response) {
        setError(`Server error: ${err.response.status} ${err.response.statusText}`);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="px-6 py-8 min-h-[80vh] flex items-center justify-center">
      {loading ? (
        <p className="text-center text-xl text-gray-500">Loading...</p>
      ) : error ? (
        <div className="w-full max-w-md mx-auto bg-red-50 border border-red-400 p-6 rounded-xl shadow-md text-center">
          <h2 className="text-2xl font-semibold text-red-600 mb-2">Oops! Something went wrong</h2>
          <p className="text-red-700 text-base mb-4">{error}</p>
          <button
            onClick={fetchProducts}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2 rounded-lg transition duration-300"
          >
            Retry
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <a
              key={product.id}
              href={product.href}
              className="group bg-white border border-gray-300 rounded-xl p-4 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300"
            >
              <img
                alt={product.imageAlt}
                src={product.imageSrc}
                className="aspect-square w-full rounded-lg object-cover group-hover:opacity-90"
              />
              <h3 className="mt-4 text-lg font-semibold text-gray-800 tracking-wide">
                {product.name}
              </h3>
              <p className="mt-1 text-base font-bold text-black">{product.price}</p>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
