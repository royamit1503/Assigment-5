import React, { useEffect, useState } from 'react'

const Products = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchProducts = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('http://localhost:5000/api/products') // <-- Your backend API
      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`)
      }
      const data = await res.json()
      setProducts(data)
    } catch (err) {
      if (err.message === 'Failed to fetch') {
        setError('Cannot connect to server. Please check your internet or try again later.')
      } else {
        setError(err.message || 'Something went wrong.')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  if (loading) {
    return (
      <p className="text-center text-xl text-gray-500 mt-20">Loading...</p>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg shadow-md max-w-md w-full text-center">
          <strong className="block text-lg font-semibold mb-2">Oops! Something went wrong.</strong>
          <span>{error}</span>
          <button
            onClick={fetchProducts}
            className="mt-4 inline-block bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    )
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
  )
}

export default Products
