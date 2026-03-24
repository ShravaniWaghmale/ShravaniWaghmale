import { FormEvent } from 'react';

interface SearchFormProps {
  from: string;
  to: string;
  date: string;
  onChange: (field: 'from' | 'to' | 'date', value: string) => void;
  onSearch: () => void;
  onReset: () => void;
}

const SearchForm = ({ from, to, date, onChange, onSearch, onReset }: SearchFormProps) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch();
  };

  return (
    <form className="card search-form" onSubmit={handleSubmit}>
      <h2>Search Buses</h2>
      <div className="grid-3">
        <label>
          From
          <input
            type="text"
            placeholder="e.g. Pune"
            value={from}
            onChange={(event) => onChange('from', event.target.value)}
          />
        </label>

        <label>
          To
          <input
            type="text"
            placeholder="e.g. Mumbai"
            value={to}
            onChange={(event) => onChange('to', event.target.value)}
          />
        </label>

        <label>
          Travel Date
          <input
            type="date"
            value={date}
            onChange={(event) => onChange('date', event.target.value)}
          />
        </label>
      </div>

      <div className="actions">
        <button type="submit">Search</button>
        <button type="button" className="secondary" onClick={onReset}>
          Reset
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
