function Header({ cartCount }) {
  return (
    <header className="site-header">
      <h1>👟 Sneaker Store</h1>
      <p>Temukan sneakers favoritmu</p>
      <nav aria-label="Navigasi utama">
        <a href="#collection">Koleksi</a>
        <a href="#collection">Brand</a>
        <a href="#cart">Keranjang</a>
      </nav>

      <div className="header-cart">
        🛒 Keranjang: {cartCount}
      </div>
    </header>
  );
}

export default Header;
