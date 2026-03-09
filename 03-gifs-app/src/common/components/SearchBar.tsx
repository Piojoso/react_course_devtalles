import { useEffect, useState } from "react";

interface Props {
  placeholder?: string;

  onSearch: (query: string) => void;
}

export const SearchBar = ({ placeholder = "Buscar", onSearch }: Props) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearch(query);
    }, 700);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [query]);

  const handleSearch = () => {
    onSearch(query);
    setQuery("");
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") handleSearch();
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSearch}>Buscar</button>
    </div>
  );
};
