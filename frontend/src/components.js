import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

// Mock data for products
const mockProducts = [
  {
    id: 1,
    title: "Apple iPhone 15 Pro Max",
    price: 1199.99,
    originalPrice: 1299.99,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
    rating: 4.5,
    reviewCount: 12567,
    category: "Electronics",
    description: "The most advanced iPhone ever with A17 Pro chip, titanium design, and the most powerful iPhone camera system.",
    features: ["A17 Pro chip", "Titanium design", "48MP camera system", "5G connectivity"]
  },
  {
    id: 2,
    title: "Nike Air Max 270",
    price: 89.99,
    originalPrice: 150.00,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    rating: 4.3,
    reviewCount: 8945,
    category: "Fashion",
    description: "Classic Nike Air Max 270 with innovative Air Max technology for all-day comfort.",
    features: ["Air Max technology", "Lightweight design", "Durable construction", "Comfortable fit"]
  },
  {
    id: 3,
    title: "Samsung 65\" QLED 4K TV",
    price: 899.99,
    originalPrice: 1199.99,
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    rating: 4.7,
    reviewCount: 5432,
    category: "Electronics",
    description: "Experience brilliant colors and sharp contrast with Samsung QLED technology.",
    features: ["QLED technology", "4K resolution", "Smart TV platform", "HDR support"]
  },
  {
    id: 4,
    title: "Bestselling Mystery Novel",
    price: 14.99,
    originalPrice: 24.99,
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    rating: 4.2,
    reviewCount: 2103,
    category: "Books",
    description: "A gripping mystery novel that will keep you on the edge of your seat.",
    features: ["Bestseller", "Mystery genre", "Paperback", "342 pages"]
  },
  {
    id: 5,
    title: "Elegant Table Lamp",
    price: 45.99,
    originalPrice: 79.99,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    rating: 4.4,
    reviewCount: 876,
    category: "Home & Garden",
    description: "Modern table lamp with adjustable brightness and sleek design.",
    features: ["LED lighting", "Adjustable brightness", "Modern design", "Energy efficient"]
  },
  {
    id: 6,
    title: "Wireless Bluetooth Headphones",
    price: 129.99,
    originalPrice: 199.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    rating: 4.6,
    reviewCount: 15678,
    category: "Electronics",
    description: "Premium wireless headphones with active noise cancellation and 30-hour battery life.",
    features: ["Active noise cancellation", "30-hour battery", "Bluetooth 5.0", "Premium sound quality"]
  },
  {
    id: 7,
    title: "Designer Handbag",
    price: 299.99,
    originalPrice: 450.00,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    rating: 4.8,
    reviewCount: 3456,
    category: "Fashion",
    description: "Luxury designer handbag made from premium leather with elegant craftsmanship.",
    features: ["Premium leather", "Designer brand", "Multiple compartments", "Elegant design"]
  },
  {
    id: 8,
    title: "Gaming Mechanical Keyboard",
    price: 159.99,
    originalPrice: 229.99,
    image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    rating: 4.5,
    reviewCount: 7890,
    category: "Electronics",
    description: "High-performance mechanical gaming keyboard with RGB lighting and tactile switches.",
    features: ["Mechanical switches", "RGB lighting", "Gaming optimized", "Durable construction"]
  }
];

const categories = [
  { name: "Electronics", icon: "📱" },
  { name: "Fashion", icon: "👕" },
  { name: "Home & Garden", icon: "🏠" },
  { name: "Books", icon: "📚" },
  { name: "Sports", icon: "⚽" },
  { name: "Beauty", icon: "💄" },
  { name: "Automotive", icon: "🚗" },
  { name: "Grocery", icon: "🛒" }
];

// Header Component
export const Header = ({ user, cartItemCount, searchQuery, setSearchQuery }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="bg-gray-900 text-white">
      {/* Top header */}
      <div className="bg-gray-800 py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <span>📍 Deliver to New York 10001</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/signin" className="hover:text-orange-400">
              {user ? `Hello, ${user.name}` : "Hello, Sign in"}
            </Link>
            <Link to="/account" className="hover:text-orange-400">Account & Lists</Link>
            <Link to="/orders" className="hover:text-orange-400">Returns & Orders</Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="py-2">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold">amazon</span>
            <span className="text-orange-400 ml-1">.com</span>
          </Link>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-3xl mx-8">
            <div className="flex">
              <select className="bg-gray-200 text-gray-800 px-3 py-2 rounded-l-md border-r border-gray-300">
                <option>All</option>
                <option>Electronics</option>
                <option>Fashion</option>
                <option>Home & Garden</option>
                <option>Books</option>
              </select>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Amazon"
                className="flex-1 px-4 py-2 text-gray-800 focus:outline-none"
              />
              <button type="submit" className="bg-orange-400 px-4 py-2 rounded-r-md hover:bg-orange-500">
                🔍
              </button>
            </div>
          </form>

          {/* Right side */}
          <div className="flex items-center space-x-6">
            <div className="text-sm">
              <div>EN</div>
              <div className="font-bold">🇺🇸</div>
            </div>
            <Link to="/cart" className="flex items-center relative">
              <div className="text-2xl">🛒</div>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-400 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItemCount}
                </span>
              )}
              <span className="ml-1 font-bold">Cart</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation bar */}
      <nav className="bg-gray-800 py-2">
        <div className="max-w-7xl mx-auto px-4 flex items-center space-x-6">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center space-x-1 hover:text-orange-400"
          >
            <span>☰</span>
            <span>All</span>
          </button>
          <Link to="/category/electronics" className="hover:text-orange-400">Electronics</Link>
          <Link to="/category/fashion" className="hover:text-orange-400">Fashion</Link>
          <Link to="/category/home" className="hover:text-orange-400">Home & Garden</Link>
          <Link to="/category/books" className="hover:text-orange-400">Books</Link>
          <Link to="/deals" className="hover:text-orange-400">Today's Deals</Link>
          <Link to="/prime" className="hover:text-orange-400">Prime</Link>
          <Link to="/customer-service" className="hover:text-orange-400">Customer Service</Link>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="bg-gray-800 py-4">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 gap-4">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/category/${category.name.toLowerCase()}`}
                className="flex items-center space-x-2 hover:text-orange-400"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

// Homepage Component
export const Homepage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroImages = [
    "https://images.unsplash.com/photo-1582556544229-40a11e954e71?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwzfHxkaXNjb3VudHxlbnwwfHx8YmxhY2tfYW5kX3doaXRlfDE3NTI4MjgwMTJ8MA&ixlib=rb-4.1.0&q=85",
    "https://images.unsplash.com/photo-1557821552-17105176677c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwxfHxzaG9wcGluZ3xlbnwwfHx8YmxhY2tfYW5kX3doaXRlfDE3NTI4MTk4Njd8MA&ixlib=rb-4.1.0&q=85",
    "https://images.pexels.com/photos/953864/pexels-photo-953864.jpeg"
  ];

  const featuredProducts = mockProducts.slice(0, 4);
  const dealsOfTheDay = mockProducts.slice(4, 8);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {heroImages.map((image, index) => (
            <div key={index} className="w-full flex-shrink-0 relative">
              <img 
                src={image} 
                alt={`Hero ${index + 1}`}
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div className="text-center text-white">
                  <h1 className="text-4xl font-bold mb-4">Great Deals on Everything</h1>
                  <p className="text-xl mb-6">Shop millions of products at unbeatable prices</p>
                  <button className="bg-orange-400 text-white px-8 py-3 rounded-lg hover:bg-orange-500 transition">
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Slide indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentSlide ? 'bg-orange-400' : 'bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Featured Products */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Category Grid */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/category/${category.name.toLowerCase()}`}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition text-center"
              >
                <div className="text-4xl mb-2">{category.icon}</div>
                <h3 className="font-semibold text-gray-800">{category.name}</h3>
              </Link>
            ))}
          </div>
        </section>

        {/* Deals of the Day */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Today's Deals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dealsOfTheDay.map((product) => (
              <ProductCard key={product.id} product={product} showDiscount={true} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

// Product Card Component
const ProductCard = ({ product, showDiscount = false }) => {
  const discount = showDiscount ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  return (
    <Link to={`/product/${product.id}`} className="group">
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden">
        <div className="relative">
          <img 
            src={product.image} 
            alt={product.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition duration-300"
          />
          {showDiscount && discount > 0 && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm">
              {discount}% OFF
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-orange-600 transition">
            {product.title}
          </h3>
          <div className="flex items-center mb-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < Math.floor(product.rating) ? "★" : "☆"}>
                  ★
                </span>
              ))}
            </div>
            <span className="text-gray-600 text-sm ml-2">({product.reviewCount})</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-lg font-bold text-gray-800">${product.price}</span>
              {showDiscount && (
                <span className="text-sm text-gray-500 line-through ml-2">
                  ${product.originalPrice}
                </span>
              )}
            </div>
            <button className="bg-orange-400 text-white px-4 py-2 rounded hover:bg-orange-500 transition">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

// Product Listing Component
export const ProductListing = () => {
  const { category } = useParams();
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [selectedBrands, setSelectedBrands] = useState([]);

  const filteredProducts = mockProducts.filter(product => 
    category === "all" || product.category.toLowerCase() === category
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h3 className="text-lg font-semibold mb-4">Filters</h3>
              
              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium mb-2">Price Range</h4>
                <div className="flex items-center space-x-2">
                  <input
                    type="range"
                    min="0"
                    max="2000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="flex-1"
                  />
                  <span className="text-sm">${priceRange[1]}</span>
                </div>
              </div>

              {/* Category */}
              <div className="mb-6">
                <h4 className="font-medium mb-2">Category</h4>
                <p className="text-sm text-gray-600 capitalize">{category}</p>
              </div>

              {/* Rating */}
              <div className="mb-6">
                <h4 className="font-medium mb-2">Customer Rating</h4>
                <div className="space-y-2">
                  {[4, 3, 2, 1].map(rating => (
                    <label key={rating} className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={i < rating ? "★" : "☆"}>★</span>
                        ))}
                      </div>
                      <span className="ml-2 text-sm">& Up</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Sort Options */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold capitalize">
                  {category} ({filteredProducts.length} results)
                </h2>
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border rounded px-3 py-1"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Customer Rating</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Product Details Component
export const ProductDetails = ({ addToCart }) => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");

  const product = mockProducts.find(p => p.id === parseInt(id));

  if (!product) {
    return <div className="text-center py-8">Product not found</div>;
  }

  const handleAddToCart = () => {
    addToCart({ ...product, selectedSize, quantity });
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Product Images */}
            <div>
              <img 
                src={product.image} 
                alt={product.title}
                className="w-full h-96 object-cover rounded-lg mb-4"
              />
              <div className="flex space-x-2">
                {[...Array(4)].map((_, i) => (
                  <img 
                    key={i}
                    src={product.image} 
                    alt={`${product.title} ${i + 1}`}
                    className={`w-16 h-16 object-cover rounded cursor-pointer ${
                      selectedImage === i ? 'ring-2 ring-orange-400' : ''
                    }`}
                    onClick={() => setSelectedImage(i)}
                  />
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-4">{product.title}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < Math.floor(product.rating) ? "★" : "☆"}>
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-gray-600 ml-2">({product.reviewCount} reviews)</span>
              </div>

              <div className="mb-6">
                <div className="flex items-center space-x-4">
                  <span className="text-3xl font-bold text-gray-800">${product.price}</span>
                  <span className="text-lg text-gray-500 line-through">${product.originalPrice}</span>
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-gray-700">{product.description}</p>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-2">Key Features:</h3>
                <ul className="list-disc list-inside text-gray-700">
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>

              {/* Size Selection (if applicable) */}
              {product.category === "Fashion" && (
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Size:</h3>
                  <div className="flex space-x-2">
                    {["XS", "S", "M", "L", "XL"].map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-3 py-1 border rounded ${
                          selectedSize === size 
                            ? 'bg-orange-400 text-white border-orange-400' 
                            : 'border-gray-300 hover:border-orange-400'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Quantity:</h3>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 border rounded hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 border rounded">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 border rounded hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button 
                  onClick={handleAddToCart}
                  className="w-full bg-orange-400 text-white py-3 rounded-lg hover:bg-orange-500 transition"
                >
                  Add to Cart
                </button>
                <button className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition">
                  Buy Now
                </button>
              </div>

              {/* Additional Info */}
              <div className="mt-6 text-sm text-gray-600">
                <p>✓ Free shipping on orders over $25</p>
                <p>✓ 30-day return policy</p>
                <p>✓ 1-year warranty included</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Search Results Component
export const SearchResults = ({ searchQuery }) => {
  const filteredProducts = mockProducts.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Search results for "{searchQuery}" ({filteredProducts.length} results)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No products found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Cart Component
export const Cart = ({ cartItems, removeFromCart, updateQuantity, getCartTotal }) => {
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="bg-gray-100 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some items to get started!</p>
            <Link to="/" className="bg-orange-400 text-white px-6 py-3 rounded-lg hover:bg-orange-500 transition">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Shopping Cart</h1>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            {cartItems.map(item => (
              <div key={item.id} className="flex items-center py-4 border-b border-gray-200 last:border-b-0">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1 ml-4">
                  <h3 className="font-semibold text-gray-800">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.category}</p>
                  <div className="flex items-center mt-2">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-2 py-1 border rounded hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="px-4 py-1 border-t border-b">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2 py-1 border rounded hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800">${(item.price * item.quantity).toFixed(2)}</p>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 text-sm mt-2"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-gray-50 px-6 py-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-2xl font-bold text-gray-800">${getCartTotal().toFixed(2)}</span>
            </div>
            <button 
              onClick={() => navigate('/checkout')}
              className="w-full bg-orange-400 text-white py-3 rounded-lg hover:bg-orange-500 transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Checkout Component
export const Checkout = ({ cartItems, getCartTotal }) => {
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    phone: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('card');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here would be payment processing logic
    alert('Order placed successfully!');
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Shipping Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={shippingInfo.firstName}
                    onChange={(e) => setShippingInfo({...shippingInfo, firstName: e.target.value})}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={shippingInfo.lastName}
                    onChange={(e) => setShippingInfo({...shippingInfo, lastName: e.target.value})}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                    required
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email"
                  value={shippingInfo.email}
                  onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                  required
                />
                <input
                  type="text"
                  placeholder="Address"
                  value={shippingInfo.address}
                  onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                  required
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="City"
                    value={shippingInfo.city}
                    onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                    required
                  />
                  <input
                    type="text"
                    placeholder="ZIP Code"
                    value={shippingInfo.zipCode}
                    onChange={(e) => setShippingInfo({...shippingInfo, zipCode: e.target.value})}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                    required
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-2"
                    />
                    💳 Credit/Debit Card
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="payment"
                      value="paypal"
                      checked={paymentMethod === 'paypal'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-2"
                    />
                    💰 PayPal
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-orange-400 text-white py-3 rounded-lg hover:bg-orange-500 transition"
              >
                Place Order
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
            <div className="space-y-3">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="border-t pt-3 mt-3">
              <div className="flex justify-between items-center mb-2">
                <span>Subtotal:</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span>Tax:</span>
                <span>${(getCartTotal() * 0.08).toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total:</span>
                <span>${(getCartTotal() * 1.08).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sign In Component
export const SignIn = ({ setUser }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock sign in/up logic
    const user = {
      id: 1,
      name: formData.name || 'John Doe',
      email: formData.email
    };
    setUser(user);
    alert(`${isSignUp ? 'Account created' : 'Signed in'} successfully!`);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              {isSignUp ? 'Create Account' : 'Sign In'}
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
              />
            )}
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
            <button
              type="submit"
              className="w-full bg-orange-400 text-white py-2 rounded hover:bg-orange-500 transition"
            >
              {isSignUp ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          <div className="text-center mt-4">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-orange-600 hover:text-orange-700"
            >
              {isSignUp ? 'Already have an account? Sign In' : 'Don\'t have an account? Create one'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Account Component
export const Account = ({ user }) => {
  const [activeTab, setActiveTab] = useState('orders');

  if (!user) {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">Please sign in to view your account</h2>
          <Link to="/signin" className="bg-orange-400 text-white px-6 py-3 rounded-lg hover:bg-orange-500 transition">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">My Account</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-orange-400 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white text-xl font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <h3 className="font-semibold">{user.name}</h3>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
              
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full text-left px-4 py-2 rounded ${
                    activeTab === 'orders' ? 'bg-orange-100 text-orange-600' : 'hover:bg-gray-100'
                  }`}
                >
                  📦 My Orders
                </button>
                <button
                  onClick={() => setActiveTab('wishlist')}
                  className={`w-full text-left px-4 py-2 rounded ${
                    activeTab === 'wishlist' ? 'bg-orange-100 text-orange-600' : 'hover:bg-gray-100'
                  }`}
                >
                  ❤️ Wishlist
                </button>
                <button
                  onClick={() => setActiveTab('addresses')}
                  className={`w-full text-left px-4 py-2 rounded ${
                    activeTab === 'addresses' ? 'bg-orange-100 text-orange-600' : 'hover:bg-gray-100'
                  }`}
                >
                  📍 Addresses
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full text-left px-4 py-2 rounded ${
                    activeTab === 'settings' ? 'bg-orange-100 text-orange-600' : 'hover:bg-gray-100'
                  }`}
                >
                  ⚙️ Settings
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md p-6">
              {activeTab === 'orders' && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">My Orders</h2>
                  <div className="space-y-4">
                    {[1, 2, 3].map(order => (
                      <div key={order} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold">Order #AMZ-{order.toString().padStart(6, '0')}</h3>
                            <p className="text-sm text-gray-600">Placed on December {order + 10}, 2024</p>
                          </div>
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                            Delivered
                          </span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <img 
                            src={mockProducts[order - 1].image} 
                            alt={mockProducts[order - 1].title}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div>
                            <p className="font-medium">{mockProducts[order - 1].title}</p>
                            <p className="text-sm text-gray-600">${mockProducts[order - 1].price}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'wishlist' && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">My Wishlist</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mockProducts.slice(0, 4).map(product => (
                      <div key={product.id} className="border rounded-lg p-4">
                        <img 
                          src={product.image} 
                          alt={product.title}
                          className="w-full h-32 object-cover rounded mb-2"
                        />
                        <h3 className="font-medium">{product.title}</h3>
                        <p className="text-gray-600">${product.price}</p>
                        <button className="w-full bg-orange-400 text-white py-2 rounded mt-2 hover:bg-orange-500 transition">
                          Add to Cart
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'addresses' && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">My Addresses</h2>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">Home</h3>
                          <p className="text-gray-600">123 Main St<br />New York, NY 10001<br />United States</p>
                        </div>
                        <button className="text-orange-600 hover:text-orange-700">Edit</button>
                      </div>
                    </div>
                    <button className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-gray-600 hover:border-orange-400 hover:text-orange-600 transition">
                      + Add New Address
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Name</label>
                      <input 
                        type="text" 
                        value={user.name} 
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <input 
                        type="email" 
                        value={user.email} 
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone</label>
                      <input 
                        type="tel" 
                        placeholder="(555) 123-4567"
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                      />
                    </div>
                    <button className="bg-orange-400 text-white px-6 py-2 rounded hover:bg-orange-500 transition">
                      Save Changes
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};