import { useState, useEffect, useRef, useCallback } from 'react';
import { Search, X } from 'lucide-react';
import { useDebounce } from '../hooks/useDebounce';

export default function SearchBar({ onSelectUser }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const debouncedQuery = useDebounce(query, 400);

  // Fetch suggestions when debounced query changes
  useEffect(() => {
    if (!debouncedQuery.trim() || debouncedQuery.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    let cancelled = false;
    setIsLoadingSuggestions(true);

    fetch(`https://api.github.com/search/users?q=${encodeURIComponent(debouncedQuery)}&per_page=5`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then((data) => {
        if (!cancelled) {
          setSuggestions(data.items || []);
          setIsLoadingSuggestions(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setSuggestions([]);
          setIsLoadingSuggestions(false);
        }
      });

    return () => { cancelled = true; };
  }, [debouncedQuery]);

  // Click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        !inputRef.current?.contains(e.target)
      ) {
        setSuggestions([]);
        setIsFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = useCallback((username) => {
    setQuery(username);
    setSuggestions([]);
    onSelectUser(username);
    inputRef.current?.blur();
  }, [onSelectUser]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (query.trim()) {
      setSuggestions([]);
      onSelectUser(query.trim());
      inputRef.current?.blur();
    }
  }, [query, onSelectUser]);

  const handleClear = useCallback(() => {
    setQuery('');
    setSuggestions([]);
    inputRef.current?.focus();
  }, []);

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div
          className={`
            relative flex items-center w-full
            transition-all duration-300 ease-in-out
            ${isFocused ? 'shadow-xl shadow-indigo-500/10' : 'shadow-md'}
          `}
        >
          <Search className="absolute left-4 w-5 h-5 text-zinc-400 pointer-events-none" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            placeholder="Search GitHub explorer..."
            className={`
              w-full py-3.5 pl-12 pr-12
              bg-white rounded-xl border-2
              text-zinc-900 placeholder-zinc-400
              outline-none
              transition-all duration-300 ease-in-out
              ${isFocused
                ? 'border-indigo-500 ring-4 ring-indigo-500/10'
                : 'border-zinc-200 hover:border-zinc-300'
              }
            `}
          />
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-4 p-1 rounded-full hover:bg-zinc-100 transition-colors duration-200"
            >
              <X className="w-4 h-4 text-zinc-400" />
            </button>
          )}
        </div>
      </form>

      {/* Suggestions Dropdown */}
      {(suggestions.length > 0 || isLoadingSuggestions) && isFocused && (
        <div
          ref={dropdownRef}
          className="absolute z-50 w-full mt-2 bg-white rounded-xl border border-zinc-200 shadow-2xl shadow-zinc-900/10 overflow-hidden transition-all duration-200"
        >
          {isLoadingSuggestions ? (
            <div className="p-4 space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full skeleton-shimmer" />
                  <div className="h-4 w-32 skeleton-shimmer rounded" />
                </div>
              ))}
            </div>
          ) : (
            <div className="suggestions-scroll max-h-72 overflow-y-auto">
              {suggestions.map((user) => (
                <button
                  key={user.id}
                  onClick={() => handleSelect(user.login)}
                  className="flex items-center gap-3 w-full px-4 py-3 hover:bg-indigo-50 transition-colors duration-150 text-left"
                >
                  <img
                    src={user.avatar_url}
                    alt={user.login}
                    className="w-10 h-10 rounded-full ring-2 ring-zinc-100"
                  />
                  <div>
                    <p className="font-medium text-zinc-800">{user.login}</p>
                    <p className="text-sm text-zinc-400">View profile</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}