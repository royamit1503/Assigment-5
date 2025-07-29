import React, { useEffect, useState } from 'react';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null); // Clear any previous errors
    try {
      const res = await fetch('http://localhost:5000/api/products'); // <-- Your backend API
      if (!res.ok) {
        // If the server responds with an error status (e.g., 404, 500)
        const errorData = await res.json(); // Try to parse error message from server
        throw new Error(errorData.message || `Server error: ${res.status}`);
      }
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      // Catch network errors (e.g., server not running, no internet) or custom thrown errors
      if (err.message.includes('Failed to fetch')) {
        setError('Cannot connect to the server. Please ensure the backend is running and try again.');
      } else if (err.message.includes('Server error')) {
        setError(`Backend issue: ${err.message}. Please try again later.`);
      } else {
        setError(err.message || 'An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []); // Empty dependency array means this runs once on component mount

  if (loading) {
    return (
      <p className="text-center text-xl text-gray-500 mt-20">Loading products...</p>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg shadow-md max-w-md w-full text-center">
          <strong className="block text-lg font-semibold mb-2">Error Loading Products!</strong>
          <p className="mb-4">{error}</p>
          <button
            onClick={fetchProducts}
            className="mt-4 inline-block bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300 ease-in-out"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-center text-xl text-gray-500 mt-20">No products found.</p>
        <button
          onClick={fetchProducts}
          className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
        >
          Reload Products
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
  );
};

export default Products;