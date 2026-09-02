function SearchBar({ search, onSearch }) {
  return (
    <div className="search-bar">
      <label htmlFor="search">Cari sneaker</label>

      <div className="search-field">
      <span className="search-icon" aria-hidden="true">Q</span>
      <input
        id="search"
        type="text"
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Cari Nike, Samba, atau running shoes..."
      />
      </div>
    </div>
  );
}

export default SearchBar;
