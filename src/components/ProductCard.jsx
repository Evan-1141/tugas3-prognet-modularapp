function ProductCard({ shoe, onAddToCart }) {
  return (
    <article className="product-card">
      <div className={'product-image ' + shoe.brand.toLowerCase()}>
        <span>{shoe.brand}</span>
        <svg viewBox="0 0 600 400" role="img" aria-label={shoe.name}>
          <ellipse cx="310" cy="325" rx="220" ry="24" fill="#18212f" opacity=".13" />
          <g transform="rotate(-9 300 200)">
            <path fill="currentColor" d="M58 260c48-8 94-48 145-106 21-24 48-38 80-38h70c39 0 74 17 103 49l78 85c21 23 50 37 84 41l18 2c16 2 28 16 28 32 0 19-15 33-34 33H100c-25 0-45-20-45-45 0-25 14-47 35-53H58Z" />
            <path fill="white" d="M61 292h492c28 0 48 17 48 37 0 18-19 32-44 32H103c-27 0-48-14-48-32 0-15 2-26 6-37Z" />
            <path d="M190 202h170m-180 27h180m-190 27h180" stroke="white" strokeWidth="13" strokeLinecap="round" />
          </g>
        </svg>
      </div>
      <div className="product-details">
        <p className="category">{shoe.category}</p>
        <h3>{shoe.name}</h3>
        <div className="product-footer">
          <strong>Rp {shoe.price.toLocaleString('id-ID')}</strong>
          <button type="button" onClick={() => onAddToCart(shoe)}>+ Tambah</button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
