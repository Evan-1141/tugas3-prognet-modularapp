import { useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import BrandFilter from './components/BrandFilter';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import './App.css';

const SHOES_DATA = [
  {
    id: 1,
    name: 'Nike Air Jordan 1',
    brand: 'Nike',
    price: 2499000,
    category: 'Basketball',
  },
  {
    id: 2,
    name: 'Adidas Samba OG',
    brand: 'Adidas',
    price: 2200000,
    category: 'Lifestyle',
  },
  {
    id: 3,
    name: 'Puma Suede Classic',
    brand: 'Puma',
    price: 1299000,
    category: 'Lifestyle',
  },
  {
    id: 4,
    name: 'Nike Air Force 1',
    brand: 'Nike',
    price: 1799000,
    category: 'Lifestyle',
  },
  {
    id: 5,
    name: 'Adidas Ultraboost 5',
    brand: 'Adidas',
    price: 3100000,
    category: 'Running',
  },
  {
    id: 6,
    name: 'Puma MB.04',
    brand: 'Puma',
    price: 2399000,
    category: 'Basketball',
  },
];

function App() {
  // State pencarian
  const [search, setSearch] = useState('');

  // State filter brand
  const [selectedBrand, setSelectedBrand] = useState('ALL');

  // State keranjang
  const [cart, setCart] = useState([]);

  // Filter produk berdasarkan search dan brand
  const filteredShoes = SHOES_DATA.filter((shoe) => {
    const matchSearch = shoe.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchBrand =
      selectedBrand === 'ALL' ||
      shoe.brand === selectedBrand;

    return matchSearch && matchBrand;
  });

  // Menambahkan produk ke keranjang
const handleAddToCart = (shoe) => {
  setCart((currentCart) => {
    const existingItem = currentCart.find(
      (item) => item.id === shoe.id
    );

    if (existingItem) {
      return currentCart.map((item) =>
        item.id === shoe.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }

    return [
      ...currentCart,
      {
        ...shoe,
        quantity: 1,
      },
    ];
  });
};
  // Menghapus produk dari keranjang
  const handleRemoveFromCart = (id) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== id)
    );
  };

  const handleIncreaseQuantity = (id) => {
  setCart((currentCart) =>
    currentCart.map((item) =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    )
  );
};

const handleDecreaseQuantity = (id) => {
  setCart((currentCart) =>
    currentCart
      .map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0)
  );
};

  return (
    <div className="app-shell">
    <Header cartCount={cart.reduce((total, item) => total + item.quantity, 0)} />

    <main className="store-main">
      <section className="catalog-section">
        <div className="catalog-heading">
          <div>
            <span className="eyebrow">Fresh drop</span>
            <h2>Step into your next favorite pair.</h2>
          </div>
          <p>{filteredShoes.length} sneakers tersedia</p>
        </div>

        <SearchBar search={search} onSearch={setSearch} />
        <BrandFilter selectedBrand={selectedBrand} onBrandChange={setSelectedBrand} />
        <ProductList shoes={filteredShoes} onAddToCart={handleAddToCart} />
      </section>

      <Cart
        cart={cart}
        onRemove={handleRemoveFromCart}
        onIncrease={handleIncreaseQuantity}
        onDecrease={handleDecreaseQuantity}
      />
    </main>
    </div>
  );
}

export default App;
