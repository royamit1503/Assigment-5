import { useEffect, useState } from 'react'

export default function Product() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchProducts = async () => {
    try {
      setLoading(true)
      setError(null)

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // ✅ Simulate network failure (Uncomment to test error state)
      // throw new Error('Cannot reach server. Please check your internet connection.')

      // ✅ Simulated product data
      const data = [
        {
          id: 1,
          name: 'Earthen Bottle',
          href: '#',
          price: '48R',
          imageSrc:
            'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-01.jpg',
          imageAlt: 'Porcelain bottle',
        },
        {
          id: 2,
          name: 'Nomad Tumbler',
          href: '#',
          price: '35R',
          imageSrc:
            'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-02.jpg',
          imageAlt: 'Green insulated bottle',
        },
        {
          id: 3,
          name: 'Focus Paper Refill',
          href: '#',
          price: '89R',
          imageSrc:
            'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-03.jpg',
          imageAlt: 'Paper card',
        },
        {
          id: 4,
          name: 'Machined Mechanical Pencil',
          href: '#',
          price: '35R',
          imageSrc:
            'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-04.jpg',
          imageAlt: 'Mechanical pencil',
        },
        {
          id: 5,
          name: 'Focus Card Tray',
          href: '#',
          price: '64R',
          imageSrc:
            'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-05.jpg',
          imageAlt: 'Card holder tray',
        },
        {
          id: 6,
          name: 'Focus Multi-Pack',
          href: '#',
          price: '39R',
          imageSrc:
            'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-06.jpg',
          imageAlt: 'Pack of refills',
        },
        {
          id: 7,
          name: 'Brass Scissors',
          href: '#',
          price: '50R',
          imageSrc:
            'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-07.jpg',
          imageAlt: 'Stylish scissors',
        },
        {
          id: 8,
          name: 'Focus Carry Pouch',
          href: '#',
          price: '32R',
          imageSrc:
            'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-08.jpg',
          imageAlt: 'Felt pouch',
        },
      ]

      setProducts(data)
    } catch (err) {
      setError('⚠️ Cannot reach server. Please check your internet connection.')
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-10">Our Products</h2>

        {loading ? (
          <p className="text-center text-xl text-gray-500">Loading...</p>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-16">
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
    </div>
  )
}
