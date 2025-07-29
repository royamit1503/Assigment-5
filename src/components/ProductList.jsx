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
      // Detect network error or server error
      if (err.message === "Network Error") {
        setError("No internet connection or server is not reachable.");
      } else if (err.code === "ECONNABORTED") {
        setError("Request timed out. Please check your network.");
      } else if (err.response) {
        // Server responded but not 200
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

  // UI Return
  return (
    <div className="px-6 py-8">
      {loading ? (
        <p className="text-center text-xl text-gray-500">Loading...</p>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg shadow-md max-w-md w-full text-center">
            <strong className="block text-lg font-semibold mb-2">Oops! Something went wrong.</strong>
            <span className="block">{error}</span>
            <button
              onClick={fetchProducts}
              className="mt-4 inline-block bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
            >
              Try Again
            </button>
          </div>
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
