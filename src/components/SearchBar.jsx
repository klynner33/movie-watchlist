export function SearchBar({ value, onChange, onSearch }) {
  function handleSubmit(e) {
    e.preventDefault();
    onSearch();
  }

  return (
    <form className="search-container" onSubmit={handleSubmit} role="search">
      <input
        className="search-input"
        type="search"
        placeholder="Blade Runner"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search movies"
      />
      <button type="submit">Search</button>
    </form>
  );
}
