const BRANDS = ['ALL', 'Nike', 'Adidas', 'Puma'];

function BrandFilter({ selectedBrand, onBrandChange }) {
  return (
    <div className="brand-filter">
      <p>Shop by brand</p>

      <div className="filter-options">
      {BRANDS.map((brand) => (
        <button
          key={brand}
          className={selectedBrand === brand ? 'is-active' : ''}
          type="button"
          onClick={() => onBrandChange(brand)}
        >
          {brand === 'ALL' ? 'Semua' : brand}
        </button>
      ))}
      </div>
    </div>
  );
}

export default BrandFilter;
