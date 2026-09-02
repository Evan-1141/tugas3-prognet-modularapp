import ProductCard from './ProductCard';

function ProductList({ shoes, onAddToCart }) {
  return (
    <section className="product-list" id="collection">
      <h2>Daftar Sneakers</h2>

      <div className="product-grid">
        {shoes.map((shoe) => (
          <ProductCard
            key={shoe.id}
            shoe={shoe}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>

      {shoes.length === 0 && (
        <p>Produk tidak ditemukan.</p>
      )}
    </section>
  );
}

export default ProductList;
